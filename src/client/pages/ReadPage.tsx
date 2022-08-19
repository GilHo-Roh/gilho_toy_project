import { useState } from 'react'
import React = require('react')
import { useNavigate, useParams } from 'react-router-dom'
import { postFetch } from '../utility/fetchapi'

const ReadPage = ({ auth }: { auth: boolean }) => {
  const { title } = useParams()
  const [user, setUser] = useState('')
  const [contents, setContents] = useState('')

  const navigation = useNavigate()

  const deleteArticle = async () => {
    const res = await postFetch('remove', { title })

    if (res.ok) {
      alert('remove article success')
      navigation('/main')
      window.location.reload()
    } else {
      alert('permission denied')
    }
  }

  const getArticle = React.useCallback(async () => {
    const res = await postFetch('read', { title })

    if (res.ok) {
      setUser(res.result.email)
      setContents(res.result.article)
    } else {
      navigation('/')
    }
  }, [navigation, title])

  React.useEffect(() => {
    getArticle()
  }, [getArticle])

  React.useEffect(() => {
    if (auth === false) navigation('/')
  }, [auth, navigation])

  return (
    <>
      <div className="readhead">
        <h4>
          {user} <br />
          {title}
        </h4>
      </div>
      <div className="read">
        <h3>{contents}</h3>
      </div>
      <div className="btn">
        <button type="button" onClick={() => deleteArticle()}>
          Delete!
        </button>
      </div>
    </>
  )
}

export default ReadPage
