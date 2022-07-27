import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { beforeEach } from "vitest";
import { describe, it, expect } from "vitest";
import Doctors from "../pages/Doctors";

describe("Doctors", () => {
  beforeEach(() => {
    render(<Doctors />);
  });

  it("Displays the Header component", () => {
    //   render(<Doctors />)
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Doctors"
    );
  });

  it("Displays information for all three doctors", () => {
    expect(screen.getAllByRole("heading", { level: 3 }).length).toEqual(3);
  });

  it("Displays an image for each doctor", () => {
    expect(screen.getAllByRole("img").length).toEqual(3);
  });
});
