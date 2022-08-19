# Gilho_toy_project

## Make simple board project

### 1. Explain functions and its spec

### 2. New dev tools and information

### 3. lessons I learned

# Function and spec

## sign in

- input email and password
- connect server and get account from database
- check passwor

## sign up

- check email and password validation(정규식을 이용)
- check email duplication
- save database (password need to crypt)

## write article

- write title, contents
- save on database
- title is unique!

## read article

- in main page we can see all articles title (login state)
- click title, transfer title to readpage
- readpage get article from database by title and show it

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
- Koa js
- yarn
- esbuild
- REST API
- bcrypt
- jsonwebtoken(JWT)
- github

# Dev information

## yarn lock

- package version control(lock)
- package-lock.json(npm)

## esbuild

- faster builder
- 100x faster then web pack
- It's written in `Go`, a language that compiles to native code
- Parsing, printing, and generating source maps are all fully `parallelized`
- Everything is done in very `few passes` without expensive data transformations
- The code was written with `speed in mind` and tries to avoid unnecessary allocations
- GO 언어로 작성, 속도에 중점, 병렬화, 무거운 변환 대신에 가벼운 절차를 이용

## bcrypt

- kind of crypt function
- we can control security and speed
- normal hash functions are vulnerable for rainbow table attack.
- scrypt has high security but slow
- 암호화할때마다 salt(추가로 해싱전에 붙는 string)이 다름(random generate), 따라서 같은 평문이라도 다른 암호문이 나옴
- 최종 암호문에서 salt와 hashed값을 구분할 수 있다. 따라서 들어온 평문과 salt를 이용해 비교가 가능하다.
- 따라서 암호문이 탈취당해도 물론 무작위 대응을 통해 답을 얻을 수는 있지만, salt마다 rainbow table제작은 불가능에 가까우므로 보안성이 높다

## SSR, CSR, Static rendering

reference :
https://medium.com/walmartglobaltech/the-benefits-of-server-side-rendering-over-client-side-rendering-5d07ff2cefe8

### SSR : server side rendering

- 서버에서 렌더링 가능한 html을 넘겨준다. js는 이후에 클라이언트가 다운로드.
- 렌더링된 html은 이미 표시중(이벤트는 불가), js 다운 후 실행
- pros
  - 최초 페이지 로딩이 빠르다.
  - 미리 응답을 받을 수 있음
  - 검색 최적화에 용이
- cons
  - 전체 페이지 로딩이 비교적 느림

### CSR : client side rendering

- 클라이언트가 js, html을 받아서 렌더링, 렌더링이 끝날때까지 볼수없음
- pros
  - 초기로딩 속도
  - 새로고침, 깜박임 등이 발생안함.
  - 서버 부하 감소
- cons
  - 최초 페이지 로딩이 ssr 보다 느림
  - 검색 최적화에 어려움

### Static rendering

- 빌드 타임에서 모든 url의 html파일을 만들고, 응답.
- pros
  - 예측 가능한 선에서 빠른 응답이 가능
- cons
  - 예측 불가능한 응답에 대응이 안됨

## Authentication method

- Header에 정보를 담아 보냄
  - 보안에 취약
- Session/COOKIE
  - 쿠키에 세션 id를 담아서 보냄, server는 session id를 확인하여 client에 응답
  - 서버에 추가적인 부하가 필요
- COOKIE + JWT
  - 간단히 인증이 가능
  - 탈취당할 경우 해당 JWT로 계속 요청이 가능함
  - 별도의 저장소 x, 높은 확장성
- Access / Refresh token
  - refresh token 으로 인증, 짧은 유효기간
  - 유효기간 후에는 access token으로 재발급
  - 토큰 유효기간이 짧아 보안에 유리

## package.json - dependency

### 1. dependencies

- Packages required by your application in production.

### 2. devDependencies

- Packages that are only needed for local development and testing.
- ex) @types/~~ : I use typescript on this project. Thus when add new library package,
  need to check new types. @types/~ can check their types but do not need in production.
- 개발에서 사용되는 패키지, 타입스크립트를 쓸때 타입 체킹을 위한 패키지, 프로덕트 유지에는 사용안함.
- 어차피 타입스크립트도 자바스크립트 빌드를 위한 툴이기 때문

## Async/Await Promise Callback

#### 자바스크립트는 싱글스레드만 사용가능하다. (lock은 필요가 없겠네요...)

#### 따라서 병렬처리가 필요한 작업들을 `asynchronous non-blocking I/O model` 방식으로 처리

### Callback

- 자바스크립트는 함수의 인자로 함수를 넘길 수 있음 lazy하다.
- 인자로 넘긴함수를 다른 함수 실행 이후에 다시 호출하는 것을 callback이라고 함.
- 비동기 처리가 끝난 이후의 값을 callback함수에 담아 실행함.
- 함수에 함수를 계속 담아 싱글스레드에서 실행을 할 수 있다.
- callback hell이 복잡

### Promise

- 내용은 실행되었지만, 결과가 아직 반환이 되지 않은 객체
- 작업이 종료되면 결과를 반환하겠다는 `약속`을 해주는 객체
- Pending(대기), Fulfilled(이행), Rejected(실패)
- Promise 내에서 resolve, reject로 반환
- then : resolve의 결과, catch : reject의 결과, finally : 무조건 실행
- 이것도 then catch가 계속 체이닝되어 복잡

### Async/Await

- await 키워드는 async함수 안에서만 동작함.
- async 함수는 promise 객체가 반환, 내부의 return 값은 객체의 결과 값
- await은 함수의 작업이 끝난후 결과를 줄때까지 대기하고, 결과가 리턴되면 다음 스텝으로 넘어감.
- 비동기 code들을 동기 code처럼 가독성이 높게 볼 수 있다. (async/await을 달아두면 내가 아는 기존의 프로그래밍 처럼 자연스럽게 동작을 예측할 수 있다.)
- 에러 핸들링을 then catch로 불가, try-catch를 통해 처리해야함.

## REST API

- 서버와 클라이언트간의 통신을 위한 API
- axios, fetch 등, 본 프로젝트는 fetch를 사용
- POST, GET를 본 프로젝트에서 사용
- Fetch를 하는 함수를 따로 만들어 주어 코드가독성을 높임

## React Hook

- useState
- useEffect
- useCallback
- rendering과 함수 호출을 최소화 하기 위한 고민을 해볼 수 있었음

# Lessons I learned

- React와 koa js 이용한 첫 웹 개발 토이 프로젝트
- 개발 환경을 세팅하는 것이 난이도가 있었다.
- 강력한 도구임을 알 수 있었으며, hook과 같은 것들을 통해 페이지를 관리할 수 있었음.
- 코드 컨벤션을 좀 더 신경쓸 수 있었다.
- bcrypt, jwt 등과 같은 보안 툴을 직접 사용해보았다.
- 웹을 처음 다루어 보았으며, 렌더링과 같은 과정을 처음 이해하였다. 이같은 과정을 최소화 하고 싶었고, 마음에 들지 않은 요소들도 많이 보였다.
- 처음 페이지 설계 과정의 문제와 useNavigate 훅을 많이 사용하면서 불필요한 렌더링 진행이 있었다.
