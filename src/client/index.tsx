import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './App'

const rootNode = document.getElementById('root')

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(rootNode!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
