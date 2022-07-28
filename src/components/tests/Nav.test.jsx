import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import Nav from "../Nav";
import { BrowserRouter } from "react-router-dom";
import App from "../App";
import userEvent from "@testing-library/user-event";

describe("Nav", () => {
  beforeEach(() => {
    render(<Nav />, { wrapper: BrowserRouter });
  });

  it("Includes links to Login and Register", () => {
    expect(screen.getAllByText("Login")).toBeInTheDocument;
    expect(screen.getAllByText("Register")).toBeInTheDocument;
  });

  it("Contains links to navigate the app", () => {
    expect(screen.getAllByText("Home")).toBeInTheDocument;
    expect(screen.getAllByText("Doctors")).toBeInTheDocument;
  });
});

describe("Nav function", () => {
  it("Allows users to navigate to different pages", async () => {
    render(<App />);
    await userEvent.click(screen.getAllByText("Doctors")[1]);
    // Doctors.jsx should be the only page that displays three separate images, thereby proving navigation to correct page
    expect(screen.getAllByRole("img").length).toEqual(3);
  });
});
