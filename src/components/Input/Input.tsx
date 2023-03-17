import React, { ChangeEvent, InputHTMLAttributes, ReactElement } from 'react'
import classNames from 'classnames'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
// import { faDivide } from '@fortawesome/free-solid-svg-icons'
import Icon from '../Icon/Icon'

export type InputSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

// Omit忽略接口中的某个值
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  /** placeholder 悬浮 */
  placeholder?: string
  /** 是否禁用Input */
  disabled?: boolean
  /** input大小，支持lg，sm */
  size?: InputSize
  /** 图标选项，右侧悬浮 */
  icon?: IconProp
  /** 添加前缀，用于配制一些固定的组合 */
  prepend?: string | ReactElement
  /** 添加后缀 用于配制一些固定的组合 */
  append?: string | ReactElement
  /** change事件 */
  onChange?: (e: ChangeEvent<HTMLElement>) => void
}

const Input: React.FC<InputProps> = props => {
  const { disabled, size, icon, prepend, append, style, ...restProps } = props
  const classes = classNames('piano-input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend
  })

  const fixControlledValue = (value: any) => {
    if (typeof value == 'undefined' || value === null) {
      return ''
    }
    return value
  }
  if ('value' in props) {
    delete restProps.defaultValue
    restProps.value = fixControlledValue(props.value)
  }
  return (
    <div className={classes} style={style}>
      {prepend && <div className="piano-input-group-prepend">{prepend}</div>}
      {icon && (
        <div className="icon-wrapper">
          <Icon icon={icon} title={`title-${icon}`}></Icon>
        </div>
      )}
      <input className="piano-input-inner" disabled={disabled} {...restProps} />
      {append && <div className="piano-input-group-append">{append}</div>}
    </div>
  )
}
Input.defaultProps = {
  disabled: false
}

export default Input
