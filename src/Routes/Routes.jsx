import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashboard from "../Layout/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import CreateShop from "../Pages/CreateShop/CreateShop";
import ProductManagement from "../Layout/Dashboard/ProductManagement";
import Subscription from "../Layout/Dashboard/Subscription";
import UpdateProduct from "../Layout/Dashboard/UpdateProduct";
import ManageSales from "../Layout/Dashboard/ManageSales";

const Routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'register',
                element: <Register></Register>
            },
            {
                path: 'createShop',
                element: <PrivateRoute><CreateShop></CreateShop></PrivateRoute>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: 'productManagement/:email',
                element: <PrivateRoute><ProductManagement></ProductManagement></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/shops/${params.email}`)
            },
            {
                path: 'updateProduct/:id',
                element: <UpdateProduct></UpdateProduct>,
                loader: ({ params }) => fetch(`http://localhost:5000/products/${params.id}`)
            },
            {
                path: 'subscription',
                element: <Subscription></Subscription>
            },
            {
                path: 'manageSales',
                element: <ManageSales></ManageSales>,
            }
        ]
    }
])

export default Routes;