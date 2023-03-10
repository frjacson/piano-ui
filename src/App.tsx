import React from 'react'
// 引入fontawesome组件库
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import Menu from './components/Menu/Menu'
import MenuItem from './components/Menu/MenuItem'
import SubMenu from './components/Menu/SubMenu'
import Icon from './components/Icon/Icon'
import Alert from './components/Alert/Alert'
// import Button from './components/Button/button'
import Tabs from './components/Tabs/Tabs'
import TabItem from './components/Tabs/TabItem'

library.add(fas)
function App() {
  return (
    <div className="App">
      <Icon icon="coffee" theme="primary" size="10x"></Icon>
      <Menu defaultIndex="0" mode="horizontal" defaultOpenSubMenus={['3']}>
        <MenuItem>cool link</MenuItem>
        <MenuItem disabled>cool link2</MenuItem>
        <MenuItem>hello</MenuItem>
        <SubMenu title="dropdown">
          <MenuItem>dropdown</MenuItem>
          <MenuItem>dropdown 2</MenuItem>
        </SubMenu>
      </Menu>
      <Alert type="danger" closeIcon="关闭">
        你好
      </Alert>
      <Tabs styleType="outline">
        <TabItem label="card1">this is card one</TabItem>
        <TabItem label="card2">this is card two</TabItem>
        <TabItem label="card3" disabled>
          this is card three
        </TabItem>
      </Tabs>
    </div>
  )
}

export default App
