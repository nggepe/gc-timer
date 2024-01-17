import App from "./App";
import { render, screen } from "@testing-library/react";

describe("App.tsx", () => {
  test("render", () => {
    render(<App></App>);
    const txt = screen.getByText("Blank page");
    expect(txt).toBeInTheDocument();
  });
});
