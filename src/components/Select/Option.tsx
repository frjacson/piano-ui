import React from 'react'
import classNames from 'classnames'
import Icon from '../Icon/Icon'

export default interface OptionProps {
  /** option名称 */
  value: string
  index?: number
  selectedValues?: string[]
  onSelect?: (value: string, selected?: boolean) => void
  multiple?: boolean
  disabled?: boolean
  handleClick?: () => void
}

export const Option: React.FC<OptionProps> = props => {
  const { value, index, onSelect, multiple, selectedValues, disabled } = props
  // 判断当前value是否已选中
  const selected = selectedValues?.includes(value)
  const classes = classNames('select-option-item', {
    'select-option-item-selected': selected,
    'select-option-item-disabled': disabled
  })
  const handleLiClick = (
    e: React.MouseEvent,
    value: string,
    selected: boolean
  ) => {
    e.preventDefault()
    if (onSelect && !disabled) {
      onSelect(value, selected)
    }
  }
  return (
    <li
      className={classes}
      key={index}
      onClick={e => handleLiClick(e, value, selected || false)}
    >
      {value}
      {multiple && selected && <Icon icon="check" />}
    </li>
  )
}
