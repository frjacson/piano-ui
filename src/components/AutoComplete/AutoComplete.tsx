import React, {
  ChangeEvent,
  KeyboardEvent,
  ReactElement,
  useEffect,
  useRef,
  useState
} from 'react'
import classNames from 'classnames'
import Input, { InputProps } from '../Input/Input'
import Transition from '../Transition/Transition'
import Icon from '../Icon/Icon'
import { useDebounce } from '../../hooks/useDebounce'
import { useClickOutSide } from '../../hooks/useClickOutside'

interface DataSource {
  value: string
}
export type DataSourceType<T = any> = T & DataSource
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  /** 返回推荐的结果 */
  fetchSuggestion: (str: string) => DataSourceType[] | Promise<DataSourceType[]>
  /** 返回选中的某一项 */
  onSelect?: (item: DataSourceType) => void
  /** 自定义渲染模式 */
  renderOption?: (item: DataSourceType) => ReactElement
}
/**
 * 页面中最常用的的输入框元素，适合于完成特定的交互
 * ### 引用方法
 *
 * ~~~js
 * import { AutoComplete } from 'piano-ui'
 * ~~~
 */
const AutoComplete: React.FC<AutoCompleteProps> = props => {
  const { fetchSuggestion, onSelect, renderOption, value, ...restProps } = props
  const [inputValue, setInputValue] = useState(value)
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false)
  const [showDropDown, setShowDropDown] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const triggerSearch = useRef(false)
  const componentRef = useRef<HTMLDivElement>(null)
  const debounceValue = useDebounce(inputValue, 300)
  useClickOutSide(componentRef, () => {
    setSuggestions([])
  })
  useEffect(() => {
    if (debounceValue && triggerSearch.current) {
      setSuggestions([])
      // 获取数据
      const result = fetchSuggestion(debounceValue)
      if (result instanceof Promise) {
        setLoading(true)
        result.then(data => {
          setLoading(false)
          setSuggestions(data)
          if (data.length > 0) {
            setShowDropDown(true)
          }
        })
      } else {
        setSuggestions(result)
        setShowDropDown(true)
        if (result.length > 0) {
          setShowDropDown(true)
        }
      }
    } else {
      setShowDropDown(false)
    }
    setHighlightIndex(-1)
  }, [debounceValue, fetchSuggestion])
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = true
  }
  const highlight = (index: number) => {
    if (index < 0) {
      index = 0
    }
    if (index >= suggestions.length) {
      index = suggestions.length - 1
    }
    setHighlightIndex(index)
  }
  // 监听键盘事件
  const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      //回车键
      case 'Enter':
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex])
        }
        break
      case 'ArrowUp':
        highlight(highlightIndex - 1)
        break
      case 'ArrowDown':
        highlight(highlightIndex + 1)
        break
      case 'Escape': //退出键
        setShowDropDown(false)
        break
      default:
        break
    }
  }
  // 渲染自定义模板
  const renderTemplate = (item: DataSource) => {
    return renderOption ? renderOption(item) : item.value
  }
  const handleSelect = (item: DataSource) => {
    setInputValue(item.value)
    setShowDropDown(false)
    if (onSelect) {
      onSelect(item)
    }
    triggerSearch.current = false
  }
  const generateDropDown = () => {
    return (
      <Transition
        in={showDropDown || loading}
        animation="zoom-in-top"
        timeout={200}
        onExit={() => {
          setSuggestions([])
        }}
      >
        <ul className="piano-suggestion-list">
          {loading && (
            <div className="suggestions-loading-icon">
              <Icon icon="spinner" spin></Icon>
            </div>
          )}
          {suggestions.map((item, index) => {
            const classes = classNames('suggestion-item', {
              'is-active': index === highlightIndex
            })
            return (
              <li
                key={index}
                className={classes}
                onClick={() => handleSelect(item)}
              >
                {renderTemplate(item)}
              </li>
            )
          })}
        </ul>
      </Transition>
    )
  }
  return (
    <div className="piano-auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeydown}
        {...restProps}
      />
      {suggestions.length > 0 && generateDropDown()}
    </div>
  )
}

export default AutoComplete
