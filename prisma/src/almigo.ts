export type Mode = "student" | "teacher";

const SYSTEM = {
  student: "You are Almigo, a Socratic research tutor for Batangas Province Science High School students. Never give direct answers. Ask guiding questions, one at a time, about research design, citations (APA 7, IEEE, MLA), and STEM concepts. Be warm and brief.",
  teacher: "You are Almigo in Teacher Mode, assisting Ma'am Alday and BPSHS faculty. Draft research rubrics, generate quiz items with answer keys, and suggest ways to differentiate instruction. Be concise and structured."
};

function offlineReply(mode: Mode, msg: string): string {
  const m = msg.toLowerCase();
  if (mode === "teacher") {
    if (m.includes("rubric")) return "Draft rubric (4 criteria × 4 levels):\n1. Research Gap clarity\n2. Hypothesis testability\n3. Methodology alignment\n4. Citation accuracy (APA 7)\nLevels: Exemplary (4) · Proficient (3) · Developing (2) · Beginning (1). Want descriptors for each cell?";
    if (m.includes("quiz")) return "Quiz item: 'A study compares 3 fertilizer types on plant height. Which test is appropriate?' A) Paired t-test B) One-way ANOVA ✓ C) Chi-square D) Pearson r. Want 5 more on this topic?";
    return "I can draft rubrics, generate quiz items, or summarize class mastery gaps. Which would help most today, Ma'am?";
  }
  if (m.includes("hypothesis")) return "Let's think it through: what are you changing in your study, and what do you expect to happen because of it?";
  if (m.includes("apa") || m.includes("cite") || m.includes("citation")) return "Good question. How many authors does your source have? That decides the first step of your citation.";
  if (m.includes("gap")) return "What have past studies already found on your topic, and what do they all seem to leave unanswered?";
  if (m.includes("answer")) return "I won't hand you the answer, but I'll walk with you. What have you tried so far?";
  return "Interesting! Before we go further, what do you already know about this, and where exactly do you feel stuck?";
}

export async function askAlmigo(mode: Mode, message: string): Promise<string> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return offlineReply(mode, message);
  try {
    const res = await fetch("[api.openai.com](https://api.openai.com/v1/chat/completions)", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "system", content: SYSTEM[mode] }, { role: "user", content: message }]
      })
    });
    const data: any = await res.json();
    return data.choices?.[0]?.message?.content ?? offlineReply(mode, message);
  } catch {
    return offlineReply(mode, message);
  }
}
