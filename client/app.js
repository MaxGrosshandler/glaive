import React from 'react'

import {Navbar, UserHome} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <UserHome />
    </div>
  )
}

export default App
