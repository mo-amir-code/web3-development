import { LoginForm } from "@/components/login-form";
import { ResetForm } from "@/components/reset-form";
import { AuthLayout, HomeLayout } from "@/layouts";
import { HomePage } from "@/pages";
import { useAuthStore } from "@/zustand/AuthStore";
import {
  GoogleAuthProvider
} from "firebase/auth";
import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Routes = () => {
  const provider = new GoogleAuthProvider();
  const { setGoogleAuthProvider } = useAuthStore();

  const route = createBrowserRouter([
    {
      path: "/",
      Component: HomeLayout,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
      ],
    },
    {
      path: "/auth",
      Component: AuthLayout,
      children: [
        {
          path: "",
          element: <LoginForm />,
        },
        {
          path: "reset",
          element: <ResetForm />,
        },
      ],
    },
  ]);

  useEffect(() => {
    if (provider) {
      setGoogleAuthProvider(provider);
    }
  }, []);

  return <RouterProvider router={route} />;
};

export default Routes;
