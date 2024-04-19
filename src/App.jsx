import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
      <Switch>
        {/*<Route exact path="/" component={Home} />*/}
        
      </Switch>
    </Router>
    </>
  )
}

export default App
