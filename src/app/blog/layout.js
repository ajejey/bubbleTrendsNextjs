import React from 'react'
import Header from '../AppHeader'
import Breadcrumbs from '@/components/Breadcrumbs'

const layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
        <Header />
        <Breadcrumbs />
        {children}
        </div>
  )
}

export default layout