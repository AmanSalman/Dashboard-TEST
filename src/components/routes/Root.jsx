import React from 'react'
import Sidebar from '../sidebar/Sidebar.jsx'
import { Outlet } from 'react-router-dom'

function Root() {
  return (
    <div className='d-flex fixWrapSmall'>
    <Sidebar/>
    <div className=' flex-grow-1'>
    <Outlet/>
    </div>
    </div>
  )
}

export default Root