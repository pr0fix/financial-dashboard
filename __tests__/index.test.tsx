import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../app/page";

describe("Index-page", () => {
  it("renders the welcome message", () => {
    render(<Page />);

    expect(screen.getByText(/Welcome to Acme/i)).toBeInTheDocument();
  });

  it("displays dashboard welcome content", () => {
    render(<Page />);

    const welcomeElement = screen.queryByText(/financial dashboard/i);
    expect(welcomeElement).toBeInTheDocument();
  });

  it("renders without crashing", () => {
    render(<Page />);
    expect(document.body).toBeInTheDocument();
  });
});
