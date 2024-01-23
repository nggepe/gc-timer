import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { AppRouter } from "../routes";
import { render, screen, waitFor } from "@testing-library/react";

describe("Home.test.tsx", () => {
  it("test render", async () => {
    const router = createMemoryRouter(AppRouter, {
      initialEntries: ["/"],
      initialIndex: 1,
    });

    render(<RouterProvider router={router}></RouterProvider>);
    const el = await waitFor(() => screen.getByText("Multiple Timer"));

    expect(el).toBeInTheDocument();
  });
});
