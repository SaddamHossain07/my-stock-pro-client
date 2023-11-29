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
import Checkout from "../Layout/Dashboard/Checkout";
import SalesSummary from "../Layout/Dashboard/SalesSummary";
import AllUsers from "../Layout/Dashboard/Admin/AllUsers";
import AdminRoute from "./AdminRoute";

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
                element: <PrivateRoute><ProductManagement></ProductManagement></PrivateRoute>
            },
            {
                path: 'updateProduct/:id',
                element: <UpdateProduct></UpdateProduct>,
            },
            {
                path: 'manageSales',
                element: <ManageSales></ManageSales>,
            },
            {
                path: 'checkout',
                element: <Checkout></Checkout>
            },
            {
                path: 'subscription',
                element: <Subscription></Subscription>
            },
            {
                path: 'salesSummary',
                element: <SalesSummary></SalesSummary>
            },
            {
                path: 'users',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            }
        ]
    }
])

export default Routes;