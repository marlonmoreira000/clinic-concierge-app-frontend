import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import fetch from "node-fetch";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { waitFor } from "@testing-library/react";
import MyTimeslots from "../components/pages/MyTimeslots";

global.fetch = fetch;

describe("MyTimeslots", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    global.localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmQzYTBmNTAwMzg4NjlmNGZhYTM2NjAiLCJyb2xlcyI6WyJ1c2VyIiwiZG9jdG9yIl0sImlhdCI6MTY1ODk4NDYwOCwiZXhwIjoxNjU4OTg4MjA4fQ.hXIYJ6ylsqkixU8oFr6PXo5ijJ69JNVjK3pJppZhJzI"
    );
    render(<MyTimeslots />, { wrapper: BrowserRouter });
  });

  afterEach(async () => {
    global.localStorage.removeItem("token");
    global.localStorage.removeItem("user");
  });

  it("Displays the Header component with the title 'Your Availability'", async () => {
    await waitFor(() => {
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Your Availability");
    });
  });

  it("Displays information for all availabilities", async () => {
    await waitFor(() => {
      expect(screen.getAllByRole("button", { name: "Delete" }).length).toEqual(2);

      expect(screen.getAllByRole("button", { name: "New Availability" }).length).toEqual(1);
    });
  });
});
