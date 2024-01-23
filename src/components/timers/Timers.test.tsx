import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Timers from "./Timers";

describe("Timers.test.tsx", () => {
  beforeAll(() => {
    vi.spyOn(localStorage, "setItem");
    vi.spyOn(localStorage, "getItem");
    vi.spyOn(localStorage, "clear");
    vi.spyOn(localStorage, "removeItem");
  });

  afterEach(() => {
    localStorage.clear();
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  it("test create new updates and delete", async () => {
    render(<Timers />);
    const button = screen.getByLabelText("add-new-timer");
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    const tf = await waitFor(() => {
      return screen.getByLabelText("name-input-text-field-0");
    });
    expect(tf).toBeInTheDocument();
    fireEvent.change(tf, { target: { value: "My - GC Timer" } });
    fireEvent.blur(tf);
    expect(tf).not.toBeInTheDocument();
    expect(screen.getByText("My - GC Timer")).toBeInTheDocument();

    const btnEditTimer = screen.getByLabelText("button-edit-timer-0");
    fireEvent.click(btnEditTimer);
    const tfEditTimer = await waitFor(() => {
      return screen.getByLabelText("text-field-edit-timer-0");
    });
    expect(tfEditTimer).toBeInTheDocument();
    expect(btnEditTimer).not.toBeInTheDocument();
    fireEvent.change(tfEditTimer, { target: { value: "1h 1m 2s" } });
    fireEvent.keyDown(tfEditTimer, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });
    expect(tfEditTimer).not.toBeInTheDocument();
  });
});
