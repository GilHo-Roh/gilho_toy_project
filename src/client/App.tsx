import * as React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Startpage from "./pages/startpage"
import Signin from "./pages/signin"
import Signup from "./pages/signup"

function LoginForm(props){
  return (
    <form>
      <label>Enter your name:
        <input type = "text"/>
      </label>
    </form>
  )
}

export default function App() {
  console.log('App')
  return (
    <Router>
      <Routes>
        <Route path="/startpage" element={<Startpage />} />
        <Route path="/clienttest" element={<LoginForm />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  )
}