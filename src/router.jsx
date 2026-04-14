import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import RegisterPage from "./pages/RegisterPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <RegisterPage /> },
    ],
  },
]);

export default router;
