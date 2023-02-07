import React from 'react'
import Widget from './Widget'
import WidgetTag from './WidgetTag'
import './RightSidebar.css'


const RightSidebar = () => {
  return (
    <aside className='right-sidebar'>
      <Widget/>
      <WidgetTag/>
    </aside>
  )
}

export default RightSidebar
