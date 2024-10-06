import React from 'react'
import Header from '../AppHeader'

export const metadata = {
  title: 'AI Image Generator | BubbleTrends',
  description: ' Now generate AI images with Bubble Trends with Flux 1.0 models.',
}

const layout = ({ children }) => {
  return (
    <div>
        <Header />
      {children}
    </div>
  )
}

export default layout