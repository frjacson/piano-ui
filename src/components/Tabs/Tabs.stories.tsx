import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Tabs from './Tabs'
import TabItem from './TabItem'

export default {
  title: '组件/数据展示/Tabs 标签页',
  component: Tabs,
  subcomponents: { TabItem: TabItem }
} as ComponentMeta<typeof Tabs>

const Template: ComponentStory<typeof Tabs> = args => (
  <Tabs {...args}>
    <TabItem label="选项卡一">this is content one</TabItem>
    <TabItem label="选项卡二">this is content two</TabItem>
    <TabItem label="用户管理">this is content three</TabItem>
  </Tabs>
)

export const DefaultTabs = Template.bind({})
DefaultTabs.storyName = '默认的Tabs'

export const OutlineTabs = Template.bind({})
OutlineTabs.args = {
  styleType: 'outline'
}

const DisabledTemplate: ComponentStory<typeof Tabs> = args => (
  <Tabs {...args}>
    <TabItem label="card1">this is card one</TabItem>
    <TabItem label="card2">this is content two</TabItem>
    <TabItem label="disabled" disabled>
      this is content three
    </TabItem>
  </Tabs>
)
export const Disabled = DisabledTemplate.bind({})
Disabled.storyName = '可禁用选项卡'
