import { useState } from 'react'
import React = require('react')
import { useParams } from 'react-router-dom'

const ReadPage = () => {
  const { title } = useParams()
  const [user, setUser] = useState('')
  const [contents, setContents] = useState('')

  const getContent = async (title: string) => {
    await fetch('http://localhost:3000/api/read', {
      method: 'POST',
      headers: {
        Cookie: 'cookie=test',
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
    </>
  )
}

export default ReadPage
