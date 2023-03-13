import React from 'react'
import Tabs, { TabProps } from './Tabs'
import TabItem from './TabItem'
import { RenderResult, render, fireEvent } from '@testing-library/react'

const testProps: TabProps = {
  defalutIndex: 0,
  styleType: 'underline',
  onSelect: jest.fn()
}

const generateTabs = (props: TabProps) => {
  return (
    <Tabs {...props}>
      <TabItem label={1}>this is card one</TabItem>
      <TabItem label={2}>this is card two</TabItem>
      <TabItem label={3} disabled>
        this is card three
      </TabItem>
    </Tabs>
  )
}

const createStyleFile = () => {
  const css = `
    .tabs-content {
      display: none;
    }
    .tabs-content.tabs-content-active{
      display: block;
    }
  `
  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = css
  return style
}
let wrapper: RenderResult, activeLabel: HTMLElement, activeContent: HTMLElement

describe('test Tabs and TabsItem component in default(underline) mode', () => {
  beforeEach(() => {
    wrapper = render(generateTabs(testProps))
    wrapper.container.appendChild(createStyleFile())
    activeLabel = wrapper.getByText(1)
    activeContent = wrapper.getByText('this is card one')
  })

  it('should render correct Tabs and TabsItem based on default props', () => {
    expect(activeLabel).toHaveClass('tabs-label tabs-label-active')
    expect(activeContent).toBeVisible()
    const label2 = wrapper.getByText(2)
    fireEvent.click(label2)
    const content2 = wrapper.getByText('this is card two')
    expect(activeContent).not.toBeVisible()
    expect(content2).toBeVisible()
    const label3 = wrapper.getByText('3')
    fireEvent.click(label3)
    const content3 = wrapper.getByText('this is card three')
    expect(content3).not.toBeVisible()
  })
})
