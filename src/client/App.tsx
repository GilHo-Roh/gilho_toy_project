import * as React from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import Startpage from './pages/startpage'
import Signin from './pages/signin'
import Signup from './pages/signup'
import Mainpage from './pages/mainpage'
import { useState } from 'react'

export default function App() {
  const [user, setUser] = useState<string | undefined>(undefined)
  const authenticated = user != undefined
  //make Route authenticated
  console.log('App')

  return (
    <Router>
      <Routes>
        <Route path="/startpage" element={<Startpage />} />
        <Route path="/signin" element={<Signin setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mainpage" element={<Mainpage />} />
      </Routes>
    </Router>
  )
}
