import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import Test from "./Test";

describe("test page", () => {
  it("renders the Test component", () => {
    render(<Test />);
    expect(screen.getByText("Test Page")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
    screen.debug();
  });

  it("selects options when clicked", () => {
    const { getByLabelText } = render(<Test />);
    fireEvent.click(getByLabelText("Partitioning"));
    expect(getByLabelText("Partitioning")).toBeChecked();
  });

  it("submits answers, displays modal, and closes modal"),
    async () => {
      const { getByTestId, getByText, queryByText } = render(<Test />);
      fireEvent.click(getByTestId("submit-button"));

      await waitFor(() => {
        expect(queryByText("Your score is")).toBeInTheDocument();
      });

      fireEvent.click(getByText("Close"));
      expect(screen.queryByText("Your score is")).toBeNull();
    };
});
