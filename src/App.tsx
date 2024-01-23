import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
]);

function App() {
  return <RouterProvider router={AppRouter} />;
}

export default App;
