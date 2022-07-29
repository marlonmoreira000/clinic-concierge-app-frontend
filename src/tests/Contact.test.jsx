import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { beforeEach } from "vitest";
import { describe, it, expect } from "vitest";
import Contact from "../components/pages/Contact";

describe("Contact", () => {
  beforeEach(() => {
    render(<Contact />);
  });

  it("Displays the Header component with the title", () => {
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Contact.");
  });

  it("Displays Details and image", () => {
    expect(screen.getByText("Details")).toBeInTheDocument;
    expect(screen.getAllByRole("img").length).toEqual(1);
  });
});
