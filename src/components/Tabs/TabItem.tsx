import React from 'react'
import classNames from 'classnames'

export interface TabItemProps {
  label: any
  className?: string
  isActive?: boolean
  disabled?: boolean
  children?: React.ReactNode
}

const TabItem: React.FC<TabItemProps> = props => {
  const { label, className, isActive, children } = props
  const classes = classNames('tabs-content', className, {
    'tabs-content-active': isActive
  })
  return (
    <div className={classes} key={label}>
      {children}
    </div>
  )
}
TabItem.defaultProps = {
  isActive: false,
  disabled: false
}
TabItem.displayName = 'TabItem'
export default TabItem
