import { HomeLayout } from "@/layouts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Routes = () => {
  const route = createBrowserRouter([
    {
      path: "/",
      Component: HomeLayout,
    },
  ]);

  return <RouterProvider router={route} />;
};

export default Routes;
