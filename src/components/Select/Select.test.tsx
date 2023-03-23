import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import Select from './Select'
import { config } from 'react-transition-group'
// 将动画关闭，否则判断点击option后option选项不在页面上，会出错。
// 因为测试是立马执行的，而动画会有时间
config.disabled = true

// mock函数，使得使用icon图标时，生成该span标签，不实际生成图标，标签text为icon名，之后getByText('check')获取该标签
// Icon组件是命名导出, 这里需要同样mock命名导出
jest.mock('../Icon/Icon', () => {
  return (props: any) => {
    return <span onClick={props.onClick}>{props.icon}</span>
  }
})

const defaultProps = {
  defaultValue: '',
  placeholder: 'test',
  onChange: jest.fn(),
  onVisibleChange: jest.fn()
}
const multipleProps = {
  ...defaultProps,
  multiple: true
}
const searchProps = {
  ...defaultProps,
  onSearch: jest.fn(),
  showSearch: true
}
describe('test Select Component', () => {
  it('default select', () => {
    const wrapper = render(
      <Select
        {...defaultProps}
        options={[
          { value: 'nihao' },
          { value: 'nihao2' },
          { value: 'nihao3', disabled: true }
        ]}
      />
    )
    const { getByPlaceholderText, getByText } = wrapper
    const element = getByPlaceholderText('test') as HTMLInputElement
    expect(element).toBeInTheDocument()
    // 1.点击input框，应该显示option选项,focus框
    fireEvent.click(element)
    const firstItem = getByText('nihao')
    expect(firstItem).toBeInTheDocument()
    const disabledItem = getByText('nihao3')
    fireEvent.click(disabledItem)
    expect(disabledItem).toBeInTheDocument()
    // 点击除了disabled的li，其他的点击了之后弹框自动收起
    fireEvent.click(firstItem)
    expect(firstItem).not.toBeInTheDocument()
    expect(element.value).toEqual('nihao')
  })
})
