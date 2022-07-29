import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import fetch from "node-fetch";
import Nav from "../components/Nav";
import App from "../components/App";
import userEvent from "@testing-library/user-event";

global.fetch = fetch;

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
    expect(screen.getAllByText("About us")).toBeInTheDocument;
    expect(screen.getAllByText("Doctors")).toBeInTheDocument;
    expect(screen.getAllByText("Bookings")).toBeInTheDocument;
    expect(screen.getAllByText("My appts")).toBeInTheDocument;
    expect(screen.getAllByText("Contact")).toBeInTheDocument;
  });
});

// describe("Nav function", () => {
//   it("Allows users to navigate to different pages", async () => {
//     render(<App />);
//     fireEvent.click(screen.getAllByRole("link", { name: 'Doctors'})[1]);
    
//     await expect(screen.getByText("Zimmak")).toBeInTheDocument
//   })
// });
