import React, {
  ChangeEvent,
  ReactNode,
  useEffect,
  useRef,
  useState
} from 'react'
import Input from '../Input/Input'
import Transition from '../Transition/Transition'
import Icon from '../Icon/Icon'
import { Option } from './Option'
import OptionProps from './Option'
import { useClickOutSide } from '../../hooks/useClickOutside'
import { useDebounce } from '../../hooks/useDebounce'

export interface SelectProps {
  /** 指定是否是多选 */
  multiple?: boolean
  /** options数据列表 */
  options: OptionProps[]
  /** 指定默认选中的条目 */
  defaultValue?: string | string[]
  /**指定当前选中的条目,多选时为数组 */
  value?: string | string[]
  /** 选中值触发的事件 */
  onChange?: (selectValue: string, selectValues?: string[]) => void
  /** 配置是否可搜索 */
  showSearch?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 文本框变化时的回调 */
  onSearch?: (value: string) => void
  /** 选择框默认文本 */
  placeholder?: string
  /** style */
  style?: React.CSSProperties
  children?: ReactNode
}

const Select: React.FC<SelectProps> = props => {
  const {
    multiple,
    options,
    defaultValue,
    value,
    disabled,
    style,
    onChange,
    showSearch,
    placeholder,
    onSearch
  } = props
  const [showList, setShowList] = useState(false)
  const [inputValue, setInputValue] = useState(
    value ? value : typeof defaultValue === 'string' ? defaultValue : ''
  )
  const [selectedValues, setSelectedValues] = useState<string[]>(
    Array.isArray(defaultValue) ? defaultValue : []
  )
  let selectOptions = [] as OptionProps[]
  const debounceValue = useDebounce(inputValue, 200)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLInputElement>(null)
  // container容器的宽度
  const containerWidth = useRef(0)
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!showSearch) {
      if (!disabled) {
        setShowList(!showList)
      }
    } else {
      if (!disabled) {
        setShowList(true)
      }
    }
  }
  // 当鼠标点击外面元素时，关闭下拉框
  useClickOutSide(containerRef, () => {
    setShowList(false)
  })
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.trim()
    setInputValue(inputValue)
    onSearch && onSearch(inputValue)
  }
  const handleOptionClick = (value: string, selected?: boolean) => {
    if (!multiple) {
      setShowList(false)
      setInputValue(value)
      onChange && onChange(value)
    } else {
      setInputValue('')
    }
    let updateValues = [value]
    if (multiple) {
      updateValues = selected
        ? selectedValues.filter(item => item !== value)
        : [...selectedValues, value]
      setSelectedValues(updateValues)
    }
    onChange && onChange(value, updateValues)
  }
  // 多选模式下，placeholer会一直显示
  useEffect(() => {
    if (multiple && selectedValues.length > 0) {
      if (inputRef.current !== null) {
        inputRef.current.placeholder = ''
      }
    } else {
      if (inputRef.current !== null) {
        inputRef.current.placeholder = placeholder as string
      }
    }
  }, [selectedValues, multiple, placeholder])
  // 计算input框的宽，分配多选时tag的width
  useEffect(() => {
    if (containerRef.current) {
      containerWidth.current =
        containerRef.current.getBoundingClientRect().width
    }
    if (showSearch && multiple) {
      // 改变光标位置
      const tags = document.querySelectorAll(
        '.piano-selected_tags_tag'
      ) as NodeListOf<HTMLSpanElement>
      let totalWidth = 4
      for (let i = 0; i < tags.length; i++) {
        totalWidth += tags[i].offsetWidth + 6
      }
      inputRef.current &&
        (inputRef.current.style.paddingLeft = totalWidth + 'px')
    }
  })
  const generateOptions = () => {
    const reg = new RegExp('^' + debounceValue)
    if (showSearch) {
      const assertOptions = options as OptionProps[]
      selectOptions = assertOptions.filter(item => reg.test(item.value))
    } else {
      selectOptions = options
    }
    return (
      <ul className="select-options">
        {selectOptions &&
          selectOptions.map((option, index) => {
            return (
              <Option
                value={option.value}
                key={index}
                selectedValues={selectedValues}
                onSelect={handleOptionClick}
                multiple={multiple}
                disabled={option.disabled}
              ></Option>
            )
          })}
        {selectOptions?.length === 0 && (
          <Option disabled value={'暂无数据'}></Option>
        )}
      </ul>
    )
  }
  return (
    <div className="piano-select-wrapper" ref={containerRef} style={style}>
      <div onClick={handleClick}>
        {!showSearch && (
          <Input
            ref={inputRef}
            value={inputValue}
            icon={showList ? 'angle-down' : 'angle-up'}
            readOnly
            onChange={handleInputChange}
            disabled={disabled}
          ></Input>
        )}
        {showSearch && (
          <Input
            ref={inputRef}
            value={inputValue}
            icon={showList ? 'angle-down' : 'angle-up'}
            onChange={handleInputChange}
            disabled={disabled}
            autoComplete="off"
          ></Input>
        )}
      </div>
      <Transition in={showList} animation="zoom-in-top" timeout={200}>
        {generateOptions()}
      </Transition>
      {multiple && (
        <div
          className="piano-selected_tags"
          style={{ maxWidth: containerWidth.current - 32 }}
        >
          {selectedValues.map((item, index) => {
            return (
              <span className="piano-selected_tags_tag" key={`tag-${index}`}>
                {item}
                <Icon
                  icon="times"
                  onClick={() => handleOptionClick(item, true)}
                />
              </span>
            )
          })}
        </div>
      )}
    </div>
  )
}
Select.defaultProps = {
  placeholder: ''
}
export default Select
