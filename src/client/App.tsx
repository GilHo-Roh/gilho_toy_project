import React = require('react')
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import { useState, useEffect } from 'react'
import Startpage from './pages/StartPage'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import MainPage from './pages/MainPage'
import WritePage from './pages/WritePage'
import ReadPage from './pages/ReadPage'

export default function App() {
  const [user, setUser] = useState<string | undefined>(undefined)
  const authenticated = user != undefined

  const [articles, setArticle] = useState([])
  const getArticles = async () => {
    await fetch('http://localhost:3000/api/articles')
      .then((res) => res.json())
      .then((res) => {
        if (res.ok) {
          setArticle(res.res)
        }
      })
  }
  const getInfo = async () => {
    await fetch('http://localhost:3000/api/auth')
      .then((res) => res.json())
      .then((res) => {
        if (res.ok) {
          setUser(res.res)
        }
      })
  }
  const logout = async () => {
    await fetch('http://localhost:3000/api/logout')
      .then((res) => res.json())
      .then((res) => {
        if (res.ok) {
          alert('logout')
          window.location.reload()
        }
      })
  }

  useEffect(() => {
    getArticles()
    getInfo()
  }, [])

  return (
    <Router>
      <header>
        <h4>
          login user is {user}!
          {authenticated ? (
            <button type="button" onClick={() => logout()}>
              logout
            </button>
          ) : (
            <></>
          )}
        </h4>
      </header>
      <Routes>
        <Route
          path="/"
          element={
            !authenticated ? <Startpage /> : <Navigate replace to="/mainpage" />
          }
        />
        <Route
          path="/signin"
          element={
            !authenticated ? (
              <Signin setUser={setUser} />
            ) : (
              <Navigate replace to="/mainpage" />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !authenticated ? <Signup /> : <Navigate replace to="/mainpage" />
          }
        />
        <Route
          path="/mainpage"
          element={
            authenticated ? (
              <MainPage articles={articles} />
            ) : (
              <Navigate replace to="/" />
            )
          }
        />
        <Route
          path="/writepage"
          element={
            authenticated ? (
              <WritePage user={user} />
            ) : (
              <Navigate replace to="/" />
            )
          }
        />
        <Route
          path="/readpage/:title"
          element={authenticated ? <ReadPage /> : <Startpage />}
        />
      </Routes>
    </Router>
  )
}
