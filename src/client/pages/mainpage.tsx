import React = require('react')
import { Link, useNavigate } from 'react-router-dom'

function Article({ article }) {
  return (
    <div>
      <Link to={'/Readpage/' + article.title}>{article.title}</Link>
    </div>
  )
}

const Mainpage = ({
  articles,
}: {
  articles: { title: string; email: string }[]
}) => {
  //console.log(articles)
  const navi = useNavigate()
  return (
    <>
      <h2>welcome to main page</h2>
      <div>
        {articles.map((user) => (
          <Article article={user} key={user.title} />
        ))}
      </div>
      <button type="button" onClick={() => navi('/Writepage')}>
        Write!
      </button>
    </>
  )
}

export default Mainpage
