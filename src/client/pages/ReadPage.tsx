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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    getArticle()
  }, [getArticle])

  React.useEffect(() => {
    if (auth === false) navigation('/')
  }, [auth, navigation])

  return (
    <>
      <h4>writer: {user}</h4>
      <h3>title: {title}</h3>
      <h3>{contents}</h3>
      <button type="button" onClick={() => deleteArticle()}>
        Delete!
      </button>
    </>
  )
}

export default ReadPage
