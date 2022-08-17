import React = require('react')

export const SigninChecker = async (id, pw) => {
  //query string

  return await fetch('http://localhost:3000/api/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: id,
      user_pw: pw,
      batch: 1,
    }),
  })
    .then((res) => res.json())
    .then((res) => res.ok)
}

export const SignupChecker = async (id, pw) => {
  //query string
  var check = false
  await fetch('http://localhost:3000/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: id,
      user_pw: pw,
      batch: 1,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      check = res.ok
    })

  return check
}

export const emailChecker = (id) => {
  const regex = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/
  return regex.test(id)
}

export const passwordChecker = (pw) => {
  const regex = /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/
  return regex.test(pw)
}
