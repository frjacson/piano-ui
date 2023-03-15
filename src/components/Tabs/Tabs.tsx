import React, { useState } from 'react'
import classNames from 'classnames'
import { TabItemProps } from './TabItem'

type TabStyle = 'underline' | 'outline'

export interface TabProps {
  /** 默认显示第几个index */
  defalutIndex?: number
  /** 点击第i个tab触发事件 */
  onSelect?: (selectId: number) => void
  /** tabs的样式 */
  styleType?: TabStyle
  /** 自定义样式名 */
  className?: string
  /** 子节点 */
  children?: React.ReactNode
}

const Tabs: React.FC<TabProps> = props => {
  const { defalutIndex, onSelect, styleType, className, children } = props
  const classes = classNames('tabs-nav', className, {
    'tabs-underline': styleType === 'underline',
    'tabs-outline': styleType === 'outline'
  })
  const [activeIndex, setActiveIndex] = useState(defalutIndex)
  const handleClick = (index: number, disabled: boolean) => {
    if (disabled) return
    setActiveIndex(index)
    if (typeof onSelect === 'function') {
      onSelect(index)
    }
  }
  const childrenComponent = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<TabItemProps>
      const isLabelDisabled = childElement.props.disabled
        ? childElement.props.disabled
        : false
      const tabsLabelClasses = classNames('tabs-label', {
        'tabs-label-disabled': isLabelDisabled,
        'tabs-label-active': activeIndex === index
      })
      const handleChildClick = () => {
        handleClick(index, isLabelDisabled)
      }
      return (
        <li className={tabsLabelClasses} onClick={handleChildClick} key={index}>
          {childElement.props.label}
        </li>
      )
    })
  }
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<TabItemProps>
      const { displayName } = childElement.type
      if (displayName === 'TabItem') {
        return React.cloneElement(childElement, {
          isActive: activeIndex === index
        })
      } else {
        console.error(
          'Warning: Tabs has a child which is not a TabItem component'
        )
      }
    })
  }
  return (
    <div>
      <nav className={classes}>
        <ul className="tabs-ul">{childrenComponent()}</ul>
      </nav>
      {renderChildren()}
    </div>
  )
}
Tabs.defaultProps = {
  defalutIndex: 0,
  styleType: 'underline'
}

export default Tabs
