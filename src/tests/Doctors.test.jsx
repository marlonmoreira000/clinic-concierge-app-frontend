import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import fetch from "node-fetch";
import { beforeEach } from "vitest";
import { describe, it, expect } from "vitest";
import { waitFor } from "@testing-library/react";
import Doctors from "../components/pages/Doctors";

global.fetch = fetch;

describe("Doctors", () => {
  beforeEach(() => {
    render(<Doctors />);
  });

  it("Displays the Header component with the title 'Doctors'", () => {
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Doctors"
    );
  });

  it("Displays information for all two doctors", async () => {
    await waitFor(() => {
      expect(screen.getAllByRole("img").length).toEqual(2);
      expect(screen.getByText("Dr. John Doe")).toBeInTheDocument;
      expect(screen.getByText("Dr. Hans Zimmak")).toBeInTheDocument;
    });
  });
});
