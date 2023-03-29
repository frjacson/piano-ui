import React from 'react'
import { ComponentMeta } from '@storybook/react'
import Upload from './Upload'
import Icon from '../Icon/Icon'
import Button from '../Button/Button'

export default {
  title: '组件/数据录入/Upload 上传',
  component: Upload,
  id: 'Upload'
} as ComponentMeta<typeof Upload>

const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50) {
    alert('上传文件过大')
    return false
  }
  return true
}

export const SimpleUpload = (args: any) => (
  <Upload
    {...args}
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    multiple
  >
    <Button size="lg" btnType="primary">
      <Icon icon="upload" /> 点击上传
    </Button>
  </Upload>
)
SimpleUpload.storyName = '普通的上传'

export const CheckUpload = (args: any) => (
  <Upload
    {...args}
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    multiple
    beforeUpload={checkFileSize}
  >
    <Button size="lg" btnType="primary">
      <Icon icon="upload" /> 传50kb以下文件
    </Button>
  </Upload>
)
CheckUpload.storyName = '限制文件大小的上传'

export const DragUpload = (args: any) => (
  <Upload
    {...args}
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    multiple
    drag
  >
    <Icon icon="upload" size="5x" theme="secondary" />
    <br />
    <p>点击或者拖动到此区域进行上传</p>
  </Upload>
)
DragUpload.storyName = '可拖动的上传'
