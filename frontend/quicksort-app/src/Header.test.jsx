import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";

describe("Header", () => {
  it("renders navigation links", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByText("Main")).toBeInTheDocument();
    expect(screen.getByText("Tutorial")).toBeInTheDocument();
    expect(screen.getByText("Test")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  it("navigates to the correct routes when links are clicked", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const mainLink = screen.getByText("Main");
    const tutorialLink = screen.getByText("Tutorial");
    const testLink = screen.getByText("Test");
    const aboutLink = screen.getByText("About");

    mainLink.click();
    expect(window.location.pathname).toBe("/");

    tutorialLink.click();
    expect(window.location.pathname).toBe("/tutorial");

    testLink.click();
    expect(window.location.pathname).toBe("/test");

    aboutLink.click();
    expect(window.location.pathname).toBe("/about");
  });
});
