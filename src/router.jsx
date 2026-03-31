import { createBrowserRouter } from "react-router-dom";
import MainPage from "./pages/MainPage";
import RecipeAddPage from "./pages/RecipeAddPage";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {index:true, element: <MainPage /> },
            {path: "/add", element: <RecipeAddPage />,},
            {path: "/login", element: <LoginPage />},
        ],
    },
]);

export default router;