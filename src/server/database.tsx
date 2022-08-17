import { useState } from 'react'
import { createPool, sql, type DatabaseConnection } from 'slonik'

export const pool = createPool(
  'postgresql://postgres:password@localhost:6544/gilho_toy_project'
)

//connect table
export const getAccount = (email: string) =>
  pool.connect(async (connection) => {
    const result = await connection.query(sql`SELECT * 
                                            FROM user_info
                                            WHERE email=${email}`)

    if (result.rowCount === 0) {
      console.log(email)
      throw new Error('Resource not found.')
    }

    return result.rows[0]
  })

export const saveAccount = (email: string, password: string) =>
  pool.connect(async (connection) => {
    await connection.query(sql`INSERT INTO user_info
                               VALUES (${email}, ${password})`)
  })

export const saveArticle = (email: string, name: string, article: string) =>
  pool.connect(async (connection) => {
    await connection.query(sql`INSERT INTO article
                               VALUES (${email}, ${name}, ${article})`)
  })

export const loadArticle = (name: string) =>
  pool.connect(async (connection) => {
    const result = await connection.query(sql`SELECT * 
                                              FROM article
                                              WHERE title=${name}`)

    if (result.rowCount === 0) {
      throw new Error('Resource not found.')
    }

    return result.rows[0]
  })

export const loadAllArticle = () =>
  pool.connect(async (connection) => {
    const result = await connection.query(sql`SELECT title, email
                                              FROM article`)

    return result.rows
  })

export const removeArticle = (name: string) =>
  pool.connect(async (connection) => {
    await connection.query(sql`DELETE FROM article
                               WHERE title=${name}`)
  })
