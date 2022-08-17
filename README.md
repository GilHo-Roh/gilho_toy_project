# Gilho_toy_project

Make simple board project

# Function and spec

## sign in

- input email and password
- connect server and database
- check information

## sign up

- check email and password validation
- check email duplication
- save database (password need to crypt)

## write article

- write title, contents
- save on database
- title is unique!

## read article

- in main page we can see all articles title (login state)
- click title, readpage can get title and show it

## delete article

- server check writer and client user
- decode JWT cookie
- if they are same, delete. otherwise is shouldn't

## keeping login in session

- when login, server set JWT in cookies (HttpOnly)
- HttpOnly cookie >> client can not access
- client always ask to server (useEffect)
- server decode email and send user information to client

# Development tool

- Typescript
- React
- Koa
- yarn
- esbuild
- github
- REST API
- bcrypt
- jsonwebtoken(JWT)

# New information

## yarn lock

- package version control(lock)

## esbuild

- faster builder
- 100x faster then web pack
- Go and JS

## bcrypt

- kind of crypt function
- we can control security and speed

## SSR, Static Rendering

## Authentication

- COOKIE + JWT :
- Session :
- LocalStorage :

## package.json

### 1. dependencies

- Packages required by your application in production.

### 2. devDependencies

- Packages that are only needed for local development and testing.
- ex) @types/~~ : I use typescript on this project. Thus when add new library package,
  need to check new types. @types/~ can check their types but do not need in production.

# Lessons I learned

## new language

- I handle react first and koa js
- It is very powerful tools to make web

## new function

## code convention
