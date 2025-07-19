// src/QuestionForm.js
import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    if (name.startsWith("answer")) {
      const index = parseInt(name.replace("answer", ""));
      const updatedAnswers = [...formData.answers];
      updatedAnswers[index] = value;
      setFormData({ ...formData, answers: updatedAnswers });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((newQ) => {
        onAddQuestion(newQ);
        setFormData({
          prompt: "",
          answers: ["", "", "", ""],
          correctIndex: 0,
        });
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>New Question</h2>
      <input
        type="text"
        name="prompt"
        placeholder="Enter question prompt"
        value={formData.prompt}
        onChange={handleChange}
        required
      />
      {formData.answers.map((a, i) => (
        <input
          key={i}
          type="text"
          name={`answer${i}`}
          placeholder={`Answer ${i + 1}`}
          value={a}
          onChange={handleChange}
          required
        />
      ))}
      <select
        name="correctIndex"
        value={formData.correctIndex}
        onChange={handleChange}
      >
        {formData.answers.map((_, i) => (
          <option key={i} value={i}>
            Correct Answer {i + 1}
          </option>
        ))}
      </select>
      <button type="submit">Submit Question</button>
    </form>
  );
}

export default QuestionForm;
