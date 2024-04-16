import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Home from "../home/Home";
import Shop from "../shop/Shop";
import About from "../components/About";
import Workouts from "../components/Workouts";
import Reviews from "../components/Reviews";
import Bookings from "../components/Bookings";
import Cart from "../shop/Cart";
import SingleProduct from "../shop/SingleProduct";
import DashboardLayout from "../dashboard/DashboardLayout";
import Dashboard from "../dashboard/Dashboard";
import UploadProduct from "../dashboard/UploadProduct";
import EditProduct from "../dashboard/EditProduct";
import ManageProduct from "../dashboard/ManageProduct";

import Username from "../components/Username";
import Password from "../components/Password";
import Register from "../components/Register";
import BMI from "../components/BMI";
import Admin from "../dashboard/Admin";
import Profile from "../components/Profile";
import Recovery from "../components/Recovery";
import Reset from "../components/Reset";

// import {  ProtectRoute } from './middleware/auth'



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
        path: "/workouts",
        element:<Workouts/>
      },
      {
        path: "/reviews",
        element:<Reviews/>
      },
      {
        path: "/bookings",
        element: <Bookings />,
      },
      {
        path: "/login",
        element: <Username />,
      },
      {
          path : '/password',
          element : <Password/>
      },
      {
          path : '/register',
          element : <Register></Register>
       },
      {
          path : '/bmi',
          element : <BMI></BMI>
      },
      {
          path : '/profile',
          element : <Profile></Profile>
      },
      {
          path : '/recovery',
          element : <Recovery></Recovery>
      },
      {
          path : '/reset',
          element : <Reset></Reset>
      }

      // ,
      // {
      //   path: "/cart",
      //   element: <Cart/>,
      // }
      ,{
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
          path : '/admin/dashboard/user',
          element : <Admin></Admin>
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