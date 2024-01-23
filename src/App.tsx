import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppRouter } from "./routes";

export const AppBrowserRouter = createBrowserRouter(AppRouter);

function App() {
  return <RouterProvider router={AppBrowserRouter} />;
}

export default App;
