import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Alert from './Alert'

export default {
  title: '组件/通用/Alert 弹框',
  component: Alert
} as ComponentMeta<typeof Alert>

const Template: ComponentStory<typeof Alert> = args => <Alert {...args}></Alert>
//default Alert or Primary Alert
export const Default = Template.bind({})
Default.args = {
  children: 'hello'
}
Default.storyName = 'Defalut Alert 默认弹框'

// danger Alert
export const Danger = Template.bind({})
Danger.args = {
  type: 'danger',
  children: 'danger'
}
Danger.storyName = 'Danger Alert 弹框'

// warning Alert
export const Warning = Template.bind({})
Warning.args = {
  type: 'warning',
  children: 'Warning'
}
Warning.storyName = 'Warning Alert 弹框'

// Success Alert
export const Success = Template.bind({})
Success.args = {
  type: 'success',
  children: 'Success'
}
Success.storyName = 'Success Alert 弹框'

// 改变图标样式
export const IconClose = Template.bind({})
IconClose.args = {
  closeIcon: '关闭',
  children: '显示关闭'
}

// 图标点击
export const IconClick = Template.bind({})
IconClick.args = {
  type: 'danger',
  children: '点击关闭按钮',
  onClose: () => {
    alert('图标关闭')
  }
}
