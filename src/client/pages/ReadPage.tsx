import { useState } from 'react'
import React = require('react')
import { useNavigate, useParams } from 'react-router-dom'

const ReadPage = () => {
  const { title } = useParams()
  const [user, setUser] = useState('')
  const [contents, setContents] = useState('')
  const navigation = useNavigate()

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
          navigation('/mainpage')
        } else {
          alert('permission denied')
        }
      })
  }

  const getArticle = async (title: string) => {
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
    getArticle(title)
  }, [])

  return (
    <>
      <h4>writer: {user}</h4>
      <h3>title: {title}</h3>
      <h3>{contents}</h3>
      <button type="button" onClick={() => deleteArticle(title)}>
        Delete!
      </button>
    </>
  )
}

export default ReadPage
