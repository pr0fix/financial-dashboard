import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../app/page";

beforeEach(() => {
  render(<Page />);
});

describe("Index-page", () => {
  it("renders the welcome message", () => {
    expect(screen.getByText(/Welcome to Acme/i)).toBeInTheDocument();
  });

  it("displays dashboard welcome content", () => {
    const welcomeElement = screen.queryByText(/financial dashboard/i);
    expect(welcomeElement).toBeInTheDocument();
  });

  it("renders without crashing", () => {
    expect(document.body).toBeInTheDocument();
  });
});
