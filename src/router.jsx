import { createBrowserRouter } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {index:true, element: <MainPage /> },
            {path: "/login", element: <LoginPage />},
        ],
    },
]);

export default router;