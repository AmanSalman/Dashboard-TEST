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
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children:[
      {
        path:'books',
        element:<Books/>,
      },
      {
        path:'addbook',
        element:<AddBook/>
      },
      {
        path:'delete/:id',
        element:<DeleteBook/>
      },
      {
        path:'orders',
        element:<Orders/>
      },
      {
        path:'acceptOrder/:orderId',
        element:<AcceptOrder/>
      },
      {
        path:'rejectOrder/:orderId',
        element:<RejectOrder/>
      }
    ]
  },
]);

export default function App() {
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