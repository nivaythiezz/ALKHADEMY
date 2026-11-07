import express from "express";
import cors from "cors";
import path from "path";
import "dotenv/config";
import { curriculum, findExercise } from "./curriculum";
import { askAlmigo, Mode } from "./almigo";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

// In-memory store (swap for Prisma once PostgreSQL is connected)
const LEVELS = ["Not started", "Practiced", "Level 1", "Level 2", "Mastered"];
const progress: Record<string, { points: number; streak: number; mastery: Record<string, number> }> = {};
const classrooms: Record<string, { name: string; teacher: string; students: string[]; assignments: any[] }> = {};
const user = (id: string) => (progress[id] ??= { points: 0, streak: 1, mastery: {} });

// ---- Curriculum ----
app.get("/api/subjects", (_req, res) => res.json(curriculum));
app.get("/api/subjects/:id", (req, res) => {
  const s = curriculum.find(x => x.id === req.params.id);
  s ? res.json(s) : res.status(404).json({ error: "Subject not found" });
});

// ---- Exercises & mastery ----
app.post("/api/exercises/:id/check", (req, res) => {
  const ex = findExercise(req.params.id);
  if (!ex) return res.status(404).json({ error: "Exercise not found" });
  const { choice, userId = "guest", hintsUsed = 0 } = req.body;
  const correct = Number(choice) === ex.answer;
  const u = user(userId);
  if (correct) {
    u.points += Math.max(10, 50 - hintsUsed * 10);
    u.mastery[ex.id] = Math.min(4, (u.mastery[ex.id] ?? 0) + (hintsUsed === 0 ? 2 : 1));
  } else {
    u.mastery[ex.id] = Math.max(1, u.mastery[ex.id] ?? 1);
  }
  res.json({ correct, points: u.points, level: LEVELS[u.mastery[ex.id]] });
});
app.get("/api/exercises/:id/hint/:n", (req, res) => {
  const ex = findExercise(req.params.id);
  const hint = ex?.hints[Number(req.params.n)];
  hint ? res.json({ hint }) : res.status(404).json({ error: "No more hints" });
});
app.get("/api/progress/:userId", (req, res) => {
  const u = user(req.params.userId);
  res.json({ ...u, levels: Object.fromEntries(Object.entries(u.mastery).map(([k, v]) => [k, LEVELS[v]])) });
});

// ---- Classrooms (teachers) ----
app.post("/api/classrooms", (req, res) => {
  const code = "BPS-" + Math.random().toString(36).slice(2, 7).toUpperCase();
  classrooms[code] = { name: req.body.name ?? "Research Class", teacher: req.body.teacher ?? "Ma'am Alday", students: [], assignments: [] };
  res.json({ code, ...classrooms[code] });
});
app.post("/api/classrooms/:code/join", (req, res) => {
  const c = classrooms[req.params.code];
  if (!c) return res.status(404).json({ error: "Invalid class code" });
  c.students.push(req.body.userId);
  res.json(c);
});
app.post("/api/classrooms/:code/assignments", (req, res) => {
  const c = classrooms[req.params.code];
  if (!c) return res.status(404).json({ error: "Invalid class code" });
  c.assignments.push({ lessonId: req.body.lessonId, due: req.body.due });
  res.json(c.assignments);
});
app.get("/api/classrooms/:code/report", (req, res) => {
  const c = classrooms[req.params.code];
  if (!c) return res.status(404).json({ error: "Invalid class code" });
  res.json(c.students.map(id => ({ student: id, ...user(id) })));
});

// ---- Parent portal ----
app.get("/api/parents/child/:userId", (req, res) => {
  const u = user(req.params.userId);
  res.json({ points: u.points, streak: u.streak, completed: Object.keys(u.mastery).length });
});

// ---- Almigo ----
app.post("/api/almigo", async (req, res) => {
  const mode: Mode = req.body.mode === "teacher" ? "teacher" : "student";
  const reply = await askAlmigo(mode, String(req.body.message ?? ""));
  res.json({ reply });
});

app.get("*", (_req, res) => res.sendFile(path.join(__dirname, "..", "public", "index.html")));

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => console.log(`ALKHADEMY running → http://localhost:${PORT}`));
