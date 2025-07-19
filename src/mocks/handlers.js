// handlers.js
import { rest } from "msw";

let questions = [
  {
    id: 1,
    prompt: "lorem testum 1",
    answers: ["A", "B", "C", "D"],
    correctIndex: 2,
  },
  {
    id: 2,
    prompt: "lorem testum 2",
    answers: ["A", "B", "C", "D"],
    correctIndex: 1,
  },
];

export const handlers = [
  rest.get("http://localhost:4000/questions", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(questions));
  }),

  rest.post("http://localhost:4000/questions", async (req, res, ctx) => {
    const body = await req.json();
    const newQuestion = { id: Date.now(), ...body };
    questions.push(newQuestion);
    return res(ctx.status(201), ctx.json(newQuestion));
  }),

  rest.patch("http://localhost:4000/questions/:id", async (req, res, ctx) => {
    const { id } = req.params;
    const body = await req.json();
    questions = questions.map((q) =>
      q.id === Number(id) ? { ...q, ...body } : q
    );
    return res(ctx.status(200), ctx.json(questions.find((q) => q.id === Number(id))));
  }),

  rest.delete("http://localhost:4000/questions/:id", (req, res, ctx) => {
    const { id } = req.params;
    questions = questions.filter((q) => q.id !== Number(id));
    return res(ctx.status(204));
  }),
];
