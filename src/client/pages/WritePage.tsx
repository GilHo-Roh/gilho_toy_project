import { useState } from 'react'
import React = require('react')
import { useNavigate } from 'react-router-dom'

const WritePage = ({ user }: { user: string }) => {
  const [name, setName] = useState('')
  const [article, setArticle] = useState('')
  const navi = useNavigate()

  const submitArticle = async (name, article) => {
    console.log(name, article, user)
    await fetch('http://localhost:3000/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user,
        title: name,
        article: article,
        batch: 1,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.ok) {
          alert('success')
          navi('/Mainpage')
        } else {
          alert('fail')
        }
      })
  }

  return (
    <>
      <h2>welcome to main page</h2>
      <p>
        <label>
          Title:
          <input type="text" onChange={(e) => setName(e.target.value)} />
        </label>
      </p>
      <p>
        <textarea
          cols={40}
          rows={20}
          onChange={(e) => setArticle(e.target.value)}
        ></textarea>
      </p>
      <button type="button" onClick={() => submitArticle(name, article)}>
        Submit!
      </button>
    </>
  )
}

export default WritePage
