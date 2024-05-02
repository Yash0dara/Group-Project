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
import Card from "../components/card";
import Choose_payment_method from "../components/choose_payment_method";
import Received from "../components/received"
import Salary_cal from "../components/salary_cal"
import Slp from "../components/slp"
import viewcards from "../components/viewww";
import ViewCards from "../components/viewww";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home/>,
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
        path: "/card",
        element: <Card />,
      },
      {
        path: "/choose_payment_method",
        element: <Choose_payment_method />,
      },
      {
        path: "/received",
        element: <Received />,
      },
      {
        path: "/salary_cal",
        element: <Salary_cal/>,
      },
      {
        path: "/slp",
        element: <Slp />,
      },
       {
         path: "/view_cards",
       element: <ViewCards/>,
       }
      // // ,
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
        path:"/admin/dashboard/edit/:id",
        element:<EditProduct/>,
        loader:({params})=>fetch(`http://localhost:5000/product/${params.id}`)
      }
      
    ]
  }
 
]);

export default router;