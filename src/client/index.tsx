import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

function Hello(props) {
  return <h1>Client: Hello World!</h1>;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Hello />);