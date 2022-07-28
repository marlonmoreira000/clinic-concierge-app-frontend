import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import fetch from "node-fetch";
import { BrowserRouter } from "react-router-dom";
import App from "../App";
import { waitFor } from "@testing-library/react";

global.fetch = fetch;

describe("App", () => {
  beforeEach(function () {
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
    render(<App />);
  });

  it("Redirects to login when attempting to accessing bookings before logging in", async () => {
    // Attempt to navigate to Bookings screen
    await userEvent.click(screen.getAllByText("Bookings")[1]);
    // Expect login form to be rendered
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument;
    expect(screen.getByRole("textbox", { name: "Email" })).toBeInTheDocument;
  });

  it("Allows users to log in", async () => {
    // Navigate to login screen
    await userEvent.click(screen.getAllByText("Login")[1]);

    const emailField = screen.getByRole("textbox", { name: "Email" });
    const passwordField = screen.getByLabelText("Password");

    // Input credentials to form
    fireEvent.change(emailField, {
      target: { value: "test_patient2@test.com" },
    });
    fireEvent.change(passwordField, {
      target: { value: "Test@1234" },
    });

    screen.debug();
    expect(screen.getByLabelText("Password")).toBeInTheDocument;

    // Submit form
    // fireEvent.click(screen.getByRole("button", { name: "Sign in" }));
    // expect(screen.getByRole("ham", { name: "bollocks" }));

    //User should be redirected to home screen
    // await waitFor(() => {
    //   expect(screen.getByRole("textbox", { name: "bollocks" }))
    //     .toBeInTheDocument;
    // });
  });
});

describe("Nav when logged in", () => {
  let mockStorage = {};
  let setItemSpy, getItemSpy;

  beforeAll(() => {
    // previously: global.Storage.prototype.setItem = jest.fn(...)
    setItemSpy = vi
      .spyOn(global.Storage.prototype, "setItem")
      .mockImplementation((key, value) => {
        mockStorage[key] = value;
      });
    // previously: global.Storage.prototype.getItem = jest.fn(...)
    getItemSpy = vi
      .spyOn(global.Storage.prototype, "getItem")
      .mockImplementation((key) => mockStorage[key]);
  });
  //     global.Storage.prototype.setItem = vi.fn((key, value) => {
  //       mockStorage[key] = value;
  //     });
  //     global.Storage.prototype.getItem = vi.fn((key) => mockStorage[key]);
  //   });

  beforeEach(() => {
    //     mockStorage = {};

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
    render(<App />);
  });

  afterAll(() => {
    // then, detach our spies to avoid breaking other test suites
    getItemSpy.mockRestore();
    setItemSpy.mockRestore();
  });
  //   afterAll(() => {
  //     // return our mocks to their original values
  //     global.Storage.prototype.setItem.mockReset();
  //     global.Storage.prototype.getItem.mockReset();
  //   });

  it("Allows users to log in", async () => {
    // Navigate to login screen
    await userEvent.click(screen.getAllByText("Login")[1]);

    const emailField = screen.getByRole("textbox", { name: "Email" });
    const passwordField = screen.getByLabelText("Password");

    // Input credentials to form
    fireEvent.change(emailField, {
      target: { value: "test_patient2@test.com" },
    });
    fireEvent.change(passwordField, {
      target: { value: "Test@1234" },
    });

    
    expect(screen.getByLabelText("Password")).toBeInTheDocument;

    // Submit form
    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

    await userEvent.click(screen.getAllByText("Bookings")[1]);

    screen.debug();



    // User should be redirected to home screen
    // await waitFor(() => {
    //   expect(global.Storage.prototype.getItem("token")).toHaveBeenCalled;
    // });
    // });

    // it("Includes links to log out is user logged in", () => {
    // global.Storage.prototype.setItem({
    //     json: () => ({ token: "123" }),
    //   });
    //   expect(screen.getAllByText("Log out")).toBeInTheDocument;
    // });
  })
})
