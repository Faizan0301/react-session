import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Curd from './components/Curd'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Curd />
  )
}

export default App
