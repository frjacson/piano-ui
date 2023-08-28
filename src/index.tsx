// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import './styles/index.scss'
// import App from './App'

// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )

// 入口文件

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)
// 样式
import './styles/index.scss'
export { fas } from '@fortawesome/free-solid-svg-icons'
export { library } from '@fortawesome/fontawesome-svg-core'
export { default as Menu } from './components/Menu/Menu'
export { default as MenuItem } from './components/Menu/MenuItem'
export { default as SubMenu } from './components/Menu/SubMenu'
export { default as Icon } from './components/Icon/Icon'
export { default as Alert } from './components/Alert/Alert'
export { default as Button } from './components/Button/Button'
export { default as Tabs } from './components/Tabs/Tabs'
export { default as TabItem } from './components/Tabs/TabItem'
export { default as Input } from './components/Input/Input'
export { default as AutoComplete } from './components/AutoComplete/AutoComplete'
export { default as Select } from './components/Select/Select'
export { default as Upload } from './components/Upload/Upload'
export { default as Progress } from './components/Progress/Progress'
export { default as Form } from './components/Form/Form'
export { default as FormItem } from './components/Form/FormItem'
