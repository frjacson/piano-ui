import React from 'react'
import { ComponentMeta } from '@storybook/react'
import Select, { SelectProps } from './Select'
import {
  DefaultSelectCode,
  MultipleSelectCode,
  DisabledSelectCode,
  SearchSelectCode
} from './selectStories.code'
export default {
  title: '组件/数据录入/Select 选择器',
  component: Select,
  // 让整个story包在width:350px的div内
  decorators: [
    Story => (
      <div style={{ width: '350px', height: '200px' }}>
        <Story />
      </div>
    )
  ]
} as ComponentMeta<typeof Select>
const options = [
  { value: 'nihao' },
  { value: 'nihao2' },
  { value: 'nihao3' },
  { value: 'nihao4', disabled: true }
]
export const DefaultSelect = (args: any) => (
  <Select {...args} placeholder="请选择" options={options} />
)
DefaultSelect.storyName = '默认的选择器'
DefaultSelect.parameters = {
  docs: {
    source: {
      code: DefaultSelectCode
    },
    description: {
      story: `点击选择器框，进行单选`
    }
  }
}

export const MultipleSelect = (args: any) => (
  <Select {...args} placeholder="多选框" multiple options={options} />
)
MultipleSelect.storyName = '支持多选的选择器'
MultipleSelect.parameters = {
  docs: {
    source: {
      code: MultipleSelectCode
    },
    description: {
      story: `通过设置multiple参数，实现选择器的多选`
    }
  }
}
export const DisabledSelect = (args: any) => (
  <Select {...args} placeholder="禁选框" disabled options={options} />
)
DisabledSelect.storyName = '被禁用的选择器'
DisabledSelect.parameters = {
  docs: {
    source: {
      code: DisabledSelectCode
    },
    description: {
      story: `通过设置disabled参数，实现选择器的禁用`
    }
  }
}
export const SearchSelect = (args: any) => (
  <>
    <Select
      {...args}
      placeholder="单选框"
      options={[
        { value: '南京' },
        { value: '武汉' },
        { value: '长春' },
        { value: '长沙' }
      ]}
      showSearch
    />
    <Select
      {...args}
      placeholder="多选框"
      multiple
      options={[
        { value: '南京' },
        { value: '武汉' },
        { value: '长春' },
        { value: '长沙' }
      ]}
      style={{ marginTop: 200 }}
      showSearch
    />
  </>
)
SearchSelect.storyName = '可搜索的选择器'
SearchSelect.parameters = {
  docs: {
    source: {
      code: SearchSelectCode
    },
    description: {
      story: `通过设置showSearch参数，实现选择器的搜索`
    }
  }
}
