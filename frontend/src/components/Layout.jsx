import React from 'react'
import Navbar from './Navbar'

const Layout = ({children, onSearch}) => {
  
  return (
    <div>
        <Navbar onSearch={onSearch} />
        <main className='pt-[87px]'>
            {children}
        </main>
    </div>
  )
}

export default Layout
