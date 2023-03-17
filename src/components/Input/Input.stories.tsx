import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Input from './Input'

export default {
  title: '组件/数据录入/Input 输入框',
  id: 'input',
  component: Input
} as ComponentMeta<typeof Input>

const Template: ComponentStory<typeof Input> = args => <Input {...args} />
export const Adefault = Template.bind({})
Adefault.args = {
  placeholder: 'default input'
}
Adefault.storyName = '默认的Input'

export const DisabledInput = Template.bind({})
DisabledInput.args = {
  placeholder: 'disabled input',
  disabled: true
}
DisabledInput.storyName = '被禁用的Input'

export const IconInput = Template.bind({})
IconInput.args = {
  placeholder: 'input with icon',
  icon: 'search'
}
IconInput.storyName = '带图标的Input'

export const DSizeInput = () => (
  <>
    <Input defaultValue="large size input" size="lg" />
    <Input placeholder="small size input" size="sm" />
  </>
)
DSizeInput.storyName = '大小不同的 Input'

export const EPandInput = () => (
  <>
    <Input defaultValue="baidu.com" prepend="https://" />
    <Input defaultValue="hello input" append=".com" />
  </>
)

EPandInput.storyName = '带前后缀的 Input'
