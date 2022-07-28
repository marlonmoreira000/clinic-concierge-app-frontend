import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { beforeEach } from "vitest";
import { describe, it, expect } from "vitest";
import fetch from "node-fetch";
import Bookings from "../pages/Bookings";

global.fetch = fetch;

describe("Bookings", () => {
  beforeEach(() => {
    render(<Bookings />);
  });

  it("Displays the Header component with the title 'Bookings'", () => {
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Bookings"
    );
  });

  it("Includes a date picker", () => {
    expect(screen.getByRole("textbox", { placeholder: "Select date" }))
      .toBeInTheDocument;
  });

  it("Allows selection by doctor", async () => {
    // Confirm selection button exists
    expect(screen.getByRole("button", { name: "Choose Doctor" }))
      .toBeInTheDocument;
  });

  //   it("Allows selection by doctor", async () => {
  //   // Confirm selection button exists
  //   expect(screen.getByRole("link", { name: "Christmas Ham" }))
  //     .toBeInTheDocument;
  // });
});
