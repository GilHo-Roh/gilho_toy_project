import React = require('react')
import { Link, useNavigate } from 'react-router-dom'

const Article = ({
  article,
}: {
  article: { title: string; email: string }
}) => {
  return (
    <div>
      <Link to={'/articles/' + article.title}>{article.title}</Link>
    </div>
  )
}

const MainPage = ({
  articles,
  auth,
}: {
  articles: { title: string; email: string }[]
  auth: boolean
}) => {
  const navigation = useNavigate()

  React.useEffect(() => {
    if (auth === false) navigation('/')
  }, [auth, navigation])

  return (
    <>
      <h2 className="main">welcome to main page</h2>
      <div className="article">
        {articles.map((user) => (
          <Article article={user} key={user.title} />
        ))}
      </div>
      <div className="btn">
        <button type="button" onClick={() => navigation('/write')}>
          Write!
        </button>
      </div>
    </>
  )
}

export default React.memo(MainPage)
