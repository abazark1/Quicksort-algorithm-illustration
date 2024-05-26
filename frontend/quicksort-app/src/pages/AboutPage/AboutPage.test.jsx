import { render } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import About from "./AboutPage";

describe("About component", () => {
  it("renders without crashing", () => {
    render(<About />);
  });
});
