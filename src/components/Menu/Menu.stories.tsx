import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Menu from './Menu'
import MenuItem from './MenuItem'
import SubMenu from './SubMenu'

export default {
  title: '组件/导航/Menu 导航菜单',
  component: Menu
} as ComponentMeta<typeof Menu>

// 页面
const Template: ComponentStory<typeof Menu> = args => (
  <Menu {...args}>
    <MenuItem>active</MenuItem>
    <MenuItem disabled>disabled</MenuItem>
    <MenuItem>hello</MenuItem>
    <SubMenu title="dropdown">
      <MenuItem>drop1</MenuItem>
      <MenuItem>drop2</MenuItem>
      <MenuItem>drop3</MenuItem>
    </SubMenu>
  </Menu>
)

export const HorizontalMenu = Template.bind({})
HorizontalMenu.storyName = '横向菜单'
HorizontalMenu.decorators = [
  Story => (
    <div style={{ marginBottom: '100px' }}>
      <Story />
    </div>
  )
]
HorizontalMenu.parameters = {
  docs: {
    source: {
      code: `
<Menu>
  <MenuItem>active</MenuItem>
  <MenuItem disabled>disabled</MenuItem>
  <MenuItem>hello</MenuItem>
  <SubMenu title="dropdown">
    <MenuItem>drop1</MenuItem>
    <MenuItem>drop2</MenuItem>
    <MenuItem>drop3</MenuItem>
  </SubMenu>
</Menu>
      `,
      language: 'jsx',
      type: 'auto'
    }
  }
}

export const VerticalMenu = Template.bind({})
VerticalMenu.args = {
  defaultIndex: '2',
  mode: 'vertical'
}
VerticalMenu.storyName = '纵向菜单'
VerticalMenu.decorators = [
  Story => (
    <div style={{ width: '400px' }}>
      <Story />
    </div>
  )
]
VerticalMenu.parameters = {
  docs: {
    source: {
      code: `
<Menu defaultIndex={2} mode='vertical'>
  <Menu.Item>active</Menu.Item>
  <Menu.Item disabled>disabled</Menu.Item>
  <Menu.Item>xyz</Menu.Item>
  <Menu.SubMenu title="dropdown">
    <Menu.Item>drop1</Menu.Item>
    <Menu.Item>drop2</Menu.Item>
    <Menu.Item>drop3</Menu.Item>
  </Menu.SubMenu>
</Menu>
      `,
      language: 'jsx',
      type: 'auto'
    }
  }
}

const Template2: ComponentStory<typeof Menu> = args => (
  <Menu {...args}>
    <SubMenu title="dropdown">
      <MenuItem>1</MenuItem>
      <MenuItem>2</MenuItem>
      <MenuItem>3</MenuItem>
    </SubMenu>
    <SubMenu title="dropdown">
      <MenuItem>drop1</MenuItem>
      <MenuItem>drop2</MenuItem>
      <MenuItem>drop3</MenuItem>
    </SubMenu>
  </Menu>
)
export const DefaultVerticalMenu = Template2.bind({})
DefaultVerticalMenu.args = {
  defaultOpenSubMenus: ['0'],
  mode: 'vertical'
}
DefaultVerticalMenu.decorators = [
  Story => (
    <div style={{ width: '400px' }}>
      <Story />
    </div>
  )
]
DefaultVerticalMenu.parameters = {
  docs: {
    source: {
      code: `
<Menu>
  <SubMenu title="dropdown">
    <MenuItem>1</MenuItem>
    <MenuItem>2</MenuItem>
    <MenuItem>3</MenuItem>
  </SubMenu>
  <SubMenu title="dropdown">
    <MenuItem>drop1</MenuItem>
    <MenuItem>drop2</MenuItem>
    <MenuItem>drop3</MenuItem>
  </SubMenu>
</Menu>
      `,
      language: 'jsx',
      type: 'auto'
    }
  }
}
DefaultVerticalMenu.storyName = '默认展开'
