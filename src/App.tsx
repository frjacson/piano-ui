import React from 'react'
import Button from './components/Button/button'

function App() {
  return (
    <div className="App">
      <Button btnType="primary">你好</Button>
      <Button disabled>你好</Button>
      <Button btnType="link" href="https://www.baidu.com">
        baidu Link
      </Button>
    </div>
  )
}

export default App
