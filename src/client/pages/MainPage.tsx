import React = require('react')
import { Link, useNavigate } from 'react-router-dom'

function Article({ article }) {
  return (
    <div>
      <Link to={'/Readpage/' + article.title}>{article.title}</Link>
    </div>
  )
}

const MainPage = ({
  articles,
}: {
  articles: { title: string; email: string }[]
}) => {
  const navigation = useNavigate()
  return (
    <>
      <h2>welcome to main page</h2>
      <div className="article">
        {articles.map((user) => (
          <Article article={user} key={user.title} />
        ))}
      </div>
      <button type="button" onClick={() => navigation('/Writepage')}>
        Write!
      </button>
    </>
  )
}

export default MainPage
