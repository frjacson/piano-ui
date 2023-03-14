import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Button from './Button'

export default {
  title: '组件/通用/Button 按钮',
  component: Button
} as ComponentMeta<typeof Button>

// template
const Template: ComponentStory<typeof Button> = args => (
  <Button onClick={() => alert('click')} {...args}></Button>
)

//default button
export const Default = Template.bind({})
Default.args = {
  children: 'Default Button'
}
Default.storyName = 'Defalut Button 默认按钮'

//primary Button
export const Primary = Template.bind({})
Primary.args = {
  btnType: 'primary',
  children: 'Primary Button'
}
Primary.storyName = 'Primary Button 主按钮'

//danger Button
export const Danger = Template.bind({})
Danger.args = {
  btnType: 'danger',
  children: 'Danger Button'
}
Danger.storyName = 'Danger Button 危险按钮'

//link Button
export const Link = Template.bind({})
Link.args = {
  btnType: 'link',
  children: 'Link Button',
  href: 'https://google.com'
}
Link.storyName = 'Link Button 链接按钮'

//Large Button
export const Large = Template.bind({})
Large.args = {
  size: 'lg',
  children: 'Large Button'
}
Large.storyName = 'Large Button 大按钮'

//small Button
export const Small = Template.bind({})
Small.args = {
  size: 'sm',
  children: 'Small Button'
}
Small.storyName = 'Small Button 小按钮'
