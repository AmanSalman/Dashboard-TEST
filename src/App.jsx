import React, { useContext, useEffect } from 'react'
import './App.css';
import Root from './components/routes/Root.jsx';
import Books from './components/books/Books.jsx'; 
import Orders from './components/orders/Orders.jsx'
import { RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom';
import "./index.css";
import DeleteBook from './components/books/DeleteBook.jsx';
import AddBook from './components/books/AddBook.jsx';
import AcceptOrder from './components/orders/AcceptOrder.jsx'
import RejectOrder from './components/orders/RejectOrder.jsx';
import Home from './components/Home/Home.jsx';
import Profile from './components/profile/Profile.jsx';
import Register from './components/Register/Register.jsx'
import Login from './components/Register/Login.jsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
import UserContextProvider, { UserContext } from './components/context/User.jsx';
import User from './components/users/User.jsx';
import AddCategory from './components/category/AddCategory.jsx';
import Category from './components/category/Category.jsx';
import Update from './components/books/UpdateBook.jsx';
import UpdateBook from './components/books/UpdateBook.jsx';


export default function App() {

  let {setUser} = useContext(UserContext);
  useEffect(()=>{
    if(localStorage.getItem("userToken")!= null){
      setUser(localStorage.getItem("userToken"))
    } 
  },[]);


const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute>
      <Root/>
    </ProtectedRoute>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/books',
        element:<Books/>,
      },
      {
        path:'/addbook',
        element:<AddBook/>
      },
      {
        path:'/Update/:id',
        element:<UpdateBook/>
      },
      {
        path:'/delete/:id',
        element:<DeleteBook/>
      },
      {
        path:'/orders',
        element:<Orders/>
      },
      {
        path:'/acceptOrder/:orderId',
        element:<AcceptOrder/>
      },
      {
        path:'/rejectOrder/:orderId',
        element:<RejectOrder/>
      },
      {
        path:'/profile',
        element:<Profile/>
      },
      {
        path:'/users',
        element:<User/>
      },
      {
        path:'/addCategory',
        element:<AddCategory/>
      },
      {
        path:'/categories',
        element:<Category/>
      }
    ]
  },
   {
        path:'/register',
        element:<Register/>
      },
      {
        path:'/login',
        element:<Login/>
      }
]);
  return (


      <RouterProvider router={router} />

  
  )
}

//  <div className='d-flex '>
  //   <Sidebar/>
  //   <Routes>
  //     <Route path='/' element={<Home/>}/>
  //     <Route path='/register' element={<Register/>} />
  //     <Route path='/books/add' element={<AddBook/>} />
  //     <Route path='/orders' element={<Orders/>}/>
  //     <Route path='/books' element={<Books/>}/>
  //     <Route path='/delete/:id' element={<DeleteBook/>}/>
  //     <Route path='*' element={<PageNotFound/>}/>
  //   </Routes>
  //  </div>