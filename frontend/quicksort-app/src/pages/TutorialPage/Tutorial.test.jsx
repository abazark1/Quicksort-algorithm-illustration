import { fireEvent, render } from "@testing-library/react";
import { expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import Tutorial from "./Tutorial";

describe("Tutorial component", () => {
  it("renders without crashing", () => {
    render(<Tutorial />);
  });

  it("displays the initial topic content", () => {
    const { getByText } = render(<Tutorial />);
    expect( getByText("Quicksort for Arrays", { selector: "h2" })).toBeInTheDocument();
  });

  it("displays the content when a topic button is clicked", () => {
    const { getByText } = render(<Tutorial />);

    fireEvent.click(getByText("Quicksort for Linked Lists"));
    expect( getByText("Quicksort for Linked Lists", { selector: "h2" })).toBeInTheDocument();

    fireEvent.click(getByText("Quicksort for Double Linked Lists"));
    expect( getByText("Quicksort for Double Linked Lists", { selector: "h2" })).toBeInTheDocument();

    fireEvent.click(getByText("Quicksort for Arrays"));
    expect( getByText("Quicksort for Arrays", { selector: "h2" })).toBeInTheDocument();
  });
});
