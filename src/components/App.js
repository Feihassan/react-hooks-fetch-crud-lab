import React, { useEffect, useState } from "react";
import QuestionList from "./QuestionList";
import NewQuestionForm from "./NewQuestionForm";

function App() {
  const [questions, setQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then(setQuestions);
  }, []);

  function handleAddQuestion(newQuestion) {
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    })
      .then((r) => r.json())
      .then((savedQuestion) => {
        setQuestions([...questions, savedQuestion]);
      });
  }

  function handleDeleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => {
      setQuestions(questions.filter((q) => q.id !== id));
    });
  }

  function handleUpdateQuestion(updatedQuestion) {
    fetch(`http://localhost:4000/questions/${updatedQuestion.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: updatedQuestion.correctIndex }),
    })
      .then((r) => r.json())
      .then((savedQuestion) => {
        const updatedList = questions.map((q) =>
          q.id === savedQuestion.id ? savedQuestion : q
        );
        setQuestions(updatedList);
      });
  }

  return (
    <main>
      <h1>Quiz Admin Panel</h1>
      <button onClick={() => setShowQuestions(true)}>View Questions</button>
      {showQuestions && (
        <QuestionList
          questions={questions}
          onDelete={handleDeleteQuestion}
          onUpdate={handleUpdateQuestion}
        />
      )}
      <NewQuestionForm onAddQuestion={handleAddQuestion} />
    </main>
  );
}

export default App;
