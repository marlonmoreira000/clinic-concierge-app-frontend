import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { beforeEach } from "vitest";
import { describe, it, expect } from "vitest";
import PageNotFound from "../components/pages/PageNotFound";

describe("PageNotFound", () => {
  beforeEach(() => {
    render(<PageNotFound />);
  });

  it("Displays the Header component with the title", () => {
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "404 Page Not Found."
    );
  });
});
