import { useState, useEffect } from 'react'
import Game from './Components/Game.jsx'
// import Loader from './Components/Loader.jsx'
import './App.css'

function App() {
  const [result, setResult] = useState(null);
  async function findData() {
    const response = await fetch('https://eldenring.fanapis.com/api/bosses?limit=100', {mode: 'cors'});
    const res = await response.json();
    setResult(res);
  }
  useEffect(() => {
    findData();
  }, [])
  return (
    <>
      {result !== null ?
        <Game result={result.data} />
        :
        <div>Loading...</div>
      }
    </>
  )
}

export default App
