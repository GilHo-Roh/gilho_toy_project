import React = require("react")

export const SigninChecker = async(id, pw) => {
  //query string
  var check = false
  await fetch('http://localhost:3000/api/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        user_id: id,
        user_pw: pw,
        batch: 1
    })
  })
  .then(res => res.json())
  .then(res =>{
    if (res.user.length == 1){
      check = true
    }
  })
  
  return check
}

export const SignupChecker = async(id, pw) => {
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
        batch: 1
    })
  })
  .then(res => res.json())
  .then(res =>{
    check = res.ok
  })
  
  return check
}

export const emailChecker = (id) => {
  return true
}

export const passwordChecker = (pw) => {
  return true
}

