import { createBrowserRouter } from "react-router";
import { Resume } from "./pages/Resume";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Resume />,
  },
]);
