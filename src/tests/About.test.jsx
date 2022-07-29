import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { beforeEach } from "vitest";
import { describe, it, expect } from "vitest";
import About from "../components/pages/About";

describe("About", () => {
  beforeEach(() => {
    render(<About />);
  });

  it("Displays the Header component with the title", () => {
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("About us.");
  });

  it("Displays image", () => {
    expect(screen.getAllByRole("img").length).toEqual(1);
  });
});
