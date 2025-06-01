import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

function ExampleComponent({ title }: { title: string }) {
  return (
    <div>
      <h1>{title}</h1>
      <p>This is an example component for testing</p>
    </div>
  );
}

describe("ExampleComponent", () => {
  it("renders the title", () => {
    render(<ExampleComponent title="Test Title" />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Test Title"
    );
  });

  it("renders the description", () => {
    render(<ExampleComponent title="Test Title" />);

    expect(
      screen.getByText("This is an example component for testing")
    ).toBeInTheDocument();
  });

  it("has correct structure", () => {
    render(<ExampleComponent title="Test Title" />);

    const container = screen.getByRole("heading", { level: 1 }).parentElement;
    expect(container).toHaveTextContent("Test Title");
    expect(container).toHaveTextContent(
      "This is an example component for testing"
    );
  });
});
