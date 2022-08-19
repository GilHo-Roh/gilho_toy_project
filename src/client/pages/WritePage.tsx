import { useState } from 'react'
import React = require('react')
import { useNavigate } from 'react-router-dom'
import { postFetch } from '../utility/fetchapi'

const WritePage = () => {
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')
  const navi = useNavigate()

  const submitArticle = async (title: string, contents: string) => {
    const res = await postFetch('submit', { title, contents })

    if (res.ok) {
      alert('writing success')
      navi('/main')
      window.location.reload()
    } else {
      alert('writing fail')
    }
  }

  return (
    <>
      <div className="write">
        <h2>write your article!</h2>
        <p>
          <label>
            TITLE : &ensp;
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
        <div className="btn2">
          <button type="button" onClick={() => submitArticle(title, contents)}>
            Submit!
          </button>
        </div>
      </div>
    </>
  )
}

export default WritePage
