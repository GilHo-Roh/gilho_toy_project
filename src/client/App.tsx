import * as React from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import Startpage from './pages/StartPage'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Mainpage from './pages/MainPage'
import WritePage from './pages/WritePage'
import { useState } from 'react'
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

  React.useEffect(() => {
    getArticles()
  }, [])

  return (
    <Router>
      <header>
        <h4>login user is {user} </h4>
      </header>
      <Routes>
        <Route path="/" element={<Startpage />} />
        <Route path="/signin" element={<Signin setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mainpage" element={<Mainpage articles={articles} />} />
        <Route path="/writepage" element={<WritePage user={user} />} />
        <Route path="/readpage/:title" element={<ReadPage />} />
      </Routes>
    </Router>
  )
}
