import React, { createContext, useState } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './MenuItem'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: string) => void
export interface MenuProps {
  /**默认展示下标 */
  defaultIndex?: string
  /** 自定义类名 */
  className?: string
  /** 显示样式 */
  mode?: MenuMode
  /** 自定义样式 */
  style?: React.CSSProperties
  /** 选择事件 */
  onSelect?: SelectCallback
  children?: React.ReactNode
  /** 默认展开某个子菜单 只在垂直方向上作用 */
  defaultOpenSubMenus?: string[]
}
interface IMenuContext {
  index: string
  onSelect?: SelectCallback
  mode?: MenuMode
  defaultOpenSubMenus?: string[]
}
export const MenuContext = createContext<IMenuContext>({ index: '0' })
const Menu: React.FC<MenuProps> = props => {
  const {
    className,
    mode,
    style,
    children,
    defaultIndex,
    onSelect,
    defaultOpenSubMenus
  } = props
  const [currentActive, setCurrentActive] = useState(defaultIndex)
  const classes = classNames('piano-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical'
  })
  const handleClick = (index: string) => {
    setCurrentActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode: mode,
    defaultOpenSubMenus
  }
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement =
        child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, { index: index.toString() })
      } else {
        console.error('Warning: menu has a child which is not MenuItem')
      }
    })
  }
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: []
}

export default Menu
