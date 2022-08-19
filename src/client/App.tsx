import React = require('react')
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Startpage from './pages/StartPage'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import MainPage from './pages/MainPage'
import WritePage from './pages/WritePage'
import ReadPage from './pages/ReadPage'
import { getFetch } from './utility/fetchapi'

export default function App() {
  const [user, setUser] = useState<string | undefined>(undefined)
  const [authenticated, setAuth] = useState<boolean | undefined>(undefined)

  const [articles, setArticle] = useState([])

  const getArticles = async () => {
    const res = await getFetch('articles')
    if (res.ok) setArticle(res.res)
  }

  const getInfo = async () => {
    const res = await getFetch('auth')
    if (res.ok) {
      setUser(res.res)
      setAuth(true)
    } else {
      setAuth(false)
    }
  }
  const logout = async () => {
    const res = await getFetch('logout')

    if (res.ok) {
      alert('logout')
      window.location.reload()
      setAuth(false)
    }
  }

  useEffect(() => {
    getArticles()
    getInfo()
  }, [])

  return (
    <Router>
      <header>
        <div>
          {authenticated ? (
            <div className="user">
              login user is {user}!&nbsp;
              <button type="button" onClick={() => logout()}>
                logout
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </header>
      <Routes>
        <Route path="/" element={<Startpage auth={authenticated} />} />
        <Route
          path="/signin"
          element={<Signin getInfo={getInfo} auth={authenticated} />}
        />
        <Route path="/signup" element={<Signup auth={authenticated} />} />
        <Route
          path="/main"
          element={<MainPage articles={articles} auth={authenticated} />}
        />
        <Route path="/write" element={<WritePage />} />
        <Route
          path="/articles/:title"
          element={<ReadPage auth={authenticated} />}
        />
      </Routes>
    </Router>
  )
}
