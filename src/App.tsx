import React from 'react'
import Button, { ButtonType } from './components/Button/button'

function App() {
  return (
    <div className="App">
      <Button btnType={ButtonType.Primary}>你好</Button>
      <Button disabled>你好</Button>
      <Button btnType={ButtonType.Link} href="https://www.baidu.com">
        baidu Link
      </Button>
    </div>
  )
}

export default App
