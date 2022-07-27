import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Header from "../Header";

describe("Header", () => {
  it("Displays a heading", () => {
    render(<Header />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("Changes the heading depending on provided props", () => {
    render(<Header text="Hello World" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Hello World"
    );
  });
});
