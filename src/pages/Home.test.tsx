import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { AppRouter } from "../routes";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import MatchMediaMock from "vitest-matchmedia-mock";

describe("Home.test.tsx", () => {
  const matchMediaMock = new MatchMediaMock();

  afterAll(() => {
    vi.clearAllMocks();
    matchMediaMock.destroy();
  });

  it("test render", async () => {
    const router = createMemoryRouter(AppRouter, {
      initialEntries: ["/"],
      initialIndex: 1,
    });

    render(<RouterProvider router={router}></RouterProvider>);
    const el = await waitFor(() => screen.getByText("Multiple Timer"));

    expect(el).toBeInTheDocument();
  });

  it("test render mobile", async () => {
    matchMediaMock.useMediaQuery("(max-width: 600px)");
    const router = createMemoryRouter(AppRouter, {
      initialEntries: ["/"],
      initialIndex: 1,
    });

    render(<RouterProvider router={router}></RouterProvider>);
    const el = await waitFor(() => screen.getByText("Multiple Timer"));

    expect(el).toBeInTheDocument();
    const btnDrawer = screen.getByLabelText("toggle-drawer");
    expect(btnDrawer).toBeInTheDocument();
    fireEvent.click(btnDrawer);
    const github = await waitFor(() => {
      return screen.getAllByText("Github");
    });

    expect(github.length >= 1).toBeTruthy();
  });
});
