import React from 'react'
import './App.css';
import Root from './components/routes/Root.jsx';
import Books from './components/books/Books.jsx'; 
import Orders from './components/orders/Orders.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
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
import UserContextProvider from './components/context/User.jsx';
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

export default function App() {
  return (

    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>

  
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