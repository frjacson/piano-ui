import React, { useContext, useState, FunctionComponentElement } from 'react'
import classNames from 'classnames'
import { MenuContext } from './Menu'
import { MenuItemProps } from './MenuItem'
import Icon from '../Icon/Icon'
import Transition from '../Transition/Transition'

export interface SubMenuProps {
  index?: string
  title: string
  className?: string
  children: React.ReactNode
}

const SubMenu: React.FC<SubMenuProps> = props => {
  const { index, title, className, children } = props
  const context = useContext(MenuContext)
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>
  const isOpenSubMenus =
    index && context.mode === 'vertical'
      ? openedSubMenus.includes(index)
      : false
  const [isOpened, setIsOpened] = useState(isOpenSubMenus)
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
    'is-opened': isOpened,
    'is-vertical': context.mode === 'vertical'
  })
  const handleIsOpenClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsOpened(!isOpened)
  }
  let timer: ReturnType<typeof setTimeout>
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setIsOpened(toggle)
    }, 300)
  }
  const clickEvents =
    context.mode === 'vertical'
      ? {
          onClick: handleIsOpenClick
        }
      : {}
  const hoverEvents =
    context.mode !== 'vertical'
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true)
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false)
          }
        }
      : {}
  const renderChildren = () => {
    const pianoClasses = classNames('piano-submenu', {
      'is-opened': isOpened
    })
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      if (childElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`
        })
      } else {
        console.error('Warning: SubMenu has a child which is not a MenuItem')
      }
    })
    return (
      <Transition in={isOpened} animation="zoom-in-top" timeout={200}>
        <ul className={pianoClasses}>{childrenComponent}</ul>
      </Transition>
    )
  }
  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon"></Icon>
      </div>
      {renderChildren()}
    </li>
  )
}
SubMenu.displayName = 'SubMenu'
export default SubMenu
