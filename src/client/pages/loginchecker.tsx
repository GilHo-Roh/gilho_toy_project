import React = require("react")
import axios from "axios"

export const ServerChecker = (id, pw) => {
  //query string
  console.log(id,pw)
  fetch('http://localhost:3000/api/signin', {
    method: 'POST',
    body: JSON.stringify({
        user_id: id,
        user_pw: pw,
        batch: 1
    })
  })
  .then(res => res.json())
  .then(res =>{
    if (res.ok){
      return true
    }
  })
  
  return false
}

export const emailChecker = (id) => {
  return false
}

export const passwordChecker = (pw) => {
  return true
}

