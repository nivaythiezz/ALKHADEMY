export interface Exercise { id: string; prompt: string; choices: string[]; answer: number; hints: string[]; }
export interface Lesson { id: string; title: string; type: "video" | "article" | "exercise"; exercises?: Exercise[]; }
export interface Unit { id: string; title: string; lessons: Lesson[]; }
export interface Course { id: string; title: string; units: Unit[]; }
export interface Subject { id: string; title: string; tag: string; color: string; courses: Course[]; }

export const curriculum: Subject[] = [
  {
    id: "research", title: "Research Methodology", tag: "R—01", color: "#E8452C",
    courses: [{
      id: "research-design", title: "Designing a Study",
      units: [
        { id: "u1", title: "Finding the Gap", lessons: [
          { id: "l1", title: "What is a research gap?", type: "article" },
          { id: "l2", title: "Writing problem statements", type: "video" },
          { id: "l3", title: "Gap or not? Practice", type: "exercise", exercises: [{
            id: "e1",
            prompt: "Which statement is a testable hypothesis?",
            choices: ["Plants are interesting.", "Increasing light exposure increases the growth rate of mung beans.", "What makes plants grow?", "Mung beans are green."],
            answer: 1,
            hints: ["A hypothesis predicts a relationship.", "Look for an independent and a dependent variable.", "Which option says what happens to Y when X changes?"]
          }]}
        ]},
        { id: "u2", title: "Conceptual Frameworks", lessons: [
          { id: "l4", title: "IPO models and variable maps", type: "article" },
          { id: "l5", title: "Operational definitions", type: "video" }
        ]},
        { id: "u3", title: "Data & Statistics", lessons: [
          { id: "l6", title: "Survey design & Likert scales", type: "article" },
          { id: "l7", title: "Choosing t-test vs ANOVA", type: "exercise", exercises: [{
            id: "e2",
            prompt: "You compare mean scores of THREE independent groups. Which test fits?",
            choices: ["Paired t-test", "Chi-square", "One-way ANOVA", "Pearson r"],
            answer: 2,
            hints: ["How many groups are being compared?", "t-tests compare only two means.", "Analysis of Variance handles 3+ groups."]
          }]}
        ]}
      ]
    }]
  },
  {
    id: "citation", title: "Citation & Integrity", tag: "C—02", color: "#2F5D3A",
    courses: [{
      id: "citing", title: "Citing Like a Scientist",
      units: [
        { id: "u4", title: "APA 7th Edition", lessons: [
          { id: "l8", title: "Reference list anatomy", type: "article" },
          { id: "l9", title: "Spot the APA error", type: "exercise", exercises: [{
            id: "e3",
            prompt: "Correct APA 7 in-text citation for a work by 3 authors (Reyes, Cruz, Lim, 2023)?",
            choices: ["(Reyes, Cruz, & Lim, 2023)", "(Reyes et al., 2023)", "(Reyes 2023)", "[1]"],
            answer: 1,
            hints: ["APA 7 changed the rule for 3+ authors.", "You only name the first author from the start.", "Use 'et al.'"]
          }]}
        ]},
        { id: "u5", title: "IEEE & MLA", lessons: [{ id: "l10", title: "Numbered vs author-page styles", type: "video" }] },
        { id: "u6", title: "Zotero, Mendeley & Ethical AI", lessons: [
          { id: "l11", title: "Building a Zotero library", type: "video" },
          { id: "l12", title: "Using AI without plagiarizing", type: "article" }
        ]}
      ]
    }]
  },
  {
    id: "stem", title: "Advanced STEM", tag: "S—03", color: "#F2C12E",
    courses: [
      { id: "physics", title: "Physics", units: [{ id: "u7", title: "Kinematics", lessons: [{ id: "l13", title: "Motion graphs simulation", type: "article" }] }] },
      { id: "chem", title: "Chemistry", units: [{ id: "u8", title: "Stoichiometry", lessons: [{ id: "l14", title: "Mole ratios", type: "video" }] }] },
      { id: "bio", title: "Biology", units: [{ id: "u9", title: "Cell Energetics", lessons: [{ id: "l15", title: "Photosynthesis vs respiration", type: "article" }] }] },
      { id: "earth", title: "Earth & Space", units: [{ id: "u10", title: "Plate Tectonics (Taal case)", lessons: [{ id: "l16", title: "Volcanic hazards of Batangas", type: "article" }] }] },
      { id: "calc", title: "Analytical Calculus", units: [{ id: "u11", title: "Limits & Derivatives", lessons: [{ id: "l17", title: "The derivative as a rate", type: "video" }] }] },
      { id: "stats", title: "Probability & Data Science", units: [{ id: "u12", title: "Distributions", lessons: [{ id: "l18", title: "Normal curve intuition", type: "article" }] }] }
    ]
  },
  {
    id: "english", title: "Scientific English", tag: "E—04", color: "#141210",
    courses: [{ id: "manuscript", title: "Manuscript Preparation", units: [
      { id: "u13", title: "IMRaD Structure", lessons: [{ id: "l19", title: "Writing an abstract that works", type: "article" }] },
      { id: "u14", title: "Scientific Vocabulary", lessons: [{ id: "l20", title: "Hedging language", type: "video" }] }
    ]}]
  }
];

export function findExercise(id: string): Exercise | undefined {
  for (const s of curriculum) for (const c of s.courses) for (const u of c.units)
    for (const l of u.lessons) for (const e of l.exercises ?? []) if (e.id === id) return e;
  return undefined;
}
