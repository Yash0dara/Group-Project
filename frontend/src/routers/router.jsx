import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Home from "../home/Home";
import Shop from "../shop/Shop";
import About from "../components/About";
import Blog from "../components/Blog";
import Workouts from "../components/Workouts";
import Reviews from "../components/Reviews";
import Bookings from "../components/Bookings";
import SingleProduct from "../shop/SingleProduct";
import DashboardLayout from "../dashboard/DashboardLayout";
import Dashboard from "../dashboard/Dashboard";
import UploadProduct from "../dashboard/UploadProduct";
import EditProduct from "../dashboard/EditProduct";
import ManageProduct from "../dashboard/ManageProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop/>,
      },
      {
        path: "/about",
        element: <About/>
      },
      {
        path: "/blog",
        element:<Blog/>        
      },
      {
        path: "/workouts",
        element:<Workouts/>
      },
      {
        path: "/reviews",
        element:<Reviews/>
      },{
        path: "/bookings",
        element: <Bookings />,
      },{
        path:"/product/:id",
        element:<SingleProduct/>,
        loader:({params})=>fetch(`http://localhost:5000/product/${params.id}`)
      }
    ],
  },{
    path:"/admin/dashboard",
    element:<DashboardLayout/>,
    children:[
      {
        path:"/admin/dashboard",
        element:<Dashboard/>
      },{
        path:"/admin/dashboard/upload",
        element:<UploadProduct/>
      },{
        path:"/admin/dashboard/manage",
        element:<ManageProduct/>
      },
      {
        path:"/admin/dashboard/edit/:id",
        element:<EditProduct/>,
        loader:({params})=>fetch(`http://localhost:5000/product/${params.id}`)
      }
      
    ]
  }
 
]);

export default router;