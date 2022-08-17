import { useState } from 'react'
import React = require('react')
import { useNavigate, useParams } from 'react-router-dom'

const ReadPage = () => {
  const { title } = useParams()
  const [user, setUser] = useState('')
  const [contents, setContents] = useState('')
  const navi = useNavigate()

  const deleteArticle = async (title: string) => {
    await fetch('http://localhost:3000/api/remove', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        batch: 1,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.ok) {
          alert('remove article success')
          navi('/mainpage')
        } else {
          alert('can not remove article')
        }
      })
  }

  const getContent = async (title: string) => {
    await fetch('http://localhost:3000/api/read', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        batch: 1,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.ok) {
          setUser(res.result.email)
          setContents(res.result.article)
        }
      })
  }
  React.useEffect(() => {
    getContent(title)
  }, [])

  return (
    <>
      <h3>user: {user}</h3>
      <h3>title: {title}</h3>
      <h3>article: {contents}</h3>
      <button type="button" onClick={() => deleteArticle(title)}>
        Delete!
      </button>
    </>
  )
}

export default ReadPage
