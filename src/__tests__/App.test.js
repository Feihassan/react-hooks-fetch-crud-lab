// src/__tests__/App.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom"; // Ensure jest-dom is imported
import App from "../components/App"; // ✅ import the real App component

// ✅ Mock fetch
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            id: 1,
            prompt: "What is 2 + 2?",
            answers: ["3", "4", "5", "6"],
            correctIndex: 1,
          },
        ]),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

test("renders Quiz Admin Panel", () => {
  render(<App />);
  expect(screen.getByText("Quiz Admin Panel")).toBeInTheDocument();
});

test("loads and displays question", async () => {
  render(<App />);

  await act(async () => {
    fireEvent.click(screen.getByRole("button", { name: /view questions/i }));
  });

  await waitFor(() =>
    expect(screen.getByText("What is 2 + 2?")).toBeInTheDocument()
  );
});
