import { useState } from 'react'
import React = require('react')
import { useNavigate } from 'react-router-dom'

const WritePage = ({ user }: { user: string }) => {
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')
  const navi = useNavigate()

  const submitArticle = async (title: string, contents: string) => {
    console.log(title, contents, user)
    await fetch('http://localhost:3000/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user,
        title: title,
        article: contents,
        batch: 1,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.ok) {
          alert('writing success')
          navi('/Mainpage')
          window.location.reload()
        } else {
          alert('writing fail')
        }
      })
  }

  return (
    <>
      <h2>write your article!</h2>
      <p>
        <label>
          Title:
          <input type="text" onChange={(e) => setTitle(e.target.value)} />
        </label>
      </p>
      <p>
        <textarea
          cols={40}
          rows={20}
          onChange={(e) => setContents(e.target.value)}
        ></textarea>
      </p>
      <button type="button" onClick={() => submitArticle(title, contents)}>
        Submit!
      </button>
    </>
  )
}

export default WritePage
