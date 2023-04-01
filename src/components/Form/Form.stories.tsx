import React, { useRef } from 'react'
import { ComponentMeta } from '@storybook/react'
import Form, { IFormRef } from './Form'
import FormItem from './FormItem'
import Input from '../Input/Input'
import Button, { ButtonType } from '../Button/Button'
import { CustomRule } from './useStore'
// import Select from '../Select/select'
import Select from '../Select/Select'

const meta: ComponentMeta<typeof Form> = {
  title: '组件/数据录入/Form 表单',
  id: 'Form',
  component: Form,
  subcomponents: { Item: FormItem },
  decorators: [
    Story => (
      <div style={{ width: '550px' }}>
        <Story />
      </div>
    )
  ]
}

export default meta
const confirmRules: CustomRule[] = [
  { type: 'string', required: true, min: 3, max: 8 },
  ({ getFieldValue }) => ({
    asyncValidator(rule, value) {
      return new Promise((resolve, reject) => {
        if (value !== getFieldValue('password')) {
          reject('The two passwords that you entered do not match!')
        }
        setTimeout(() => {
          resolve()
        }, 1000)
      })
    }
  })
]

export const ABasicForm = (args: any) => {
  return (
    <Form {...args}>
      <FormItem
        label="用户名"
        name="name"
        rules={[{ type: 'string', required: true, min: 3 }]}
      >
        <Input />
      </FormItem>
      <FormItem
        label="密码"
        name="password"
        rules={[{ type: 'string', required: true, min: 3, max: 8 }]}
      >
        <Input type="password" />
      </FormItem>
      <div className="piano-form--submit_area">
        <Button type="submit" btnType="primary">
          登陆
        </Button>
      </div>
    </Form>
  )
}
ABasicForm.storyName = '基本的登陆表单'

export const BasicForm = (args: any) => {
  const ref = useRef<IFormRef>()
  const resetAll = () => {
    ref.current?.resetFields()
  }
  return (
    <Form
      ref={ref}
      initialValues={{ username: '', agreement: false }}
      {...args}
    >
      {({ isValid, isSubmitting }) => (
        <>
          <FormItem
            label="用户名"
            name="username"
            rules={[{ type: 'string', required: true, min: 3 }]}
          >
            <Input />
          </FormItem>
          <FormItem
            label="密码"
            name="password"
            rules={[{ type: 'string', required: true, min: 3, max: 8 }]}
          >
            <Input type="password" />
          </FormItem>
          <FormItem label="重复密码" name="confirmPwd" rules={confirmRules}>
            <Input type="password" />
          </FormItem>
          <div
            className="agreement-section"
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <FormItem
              name="agreement"
              valuePropName="checked"
              getValueFromEvent={e => e.target.checked}
              rules={[{ type: 'enum', enum: [true], message: '请同意协议' }]}
            >
              <input type="checkbox" />
            </FormItem>
            <span className="agree-text">
              注册即代表同意<a href="#">用户协议</a>
            </span>
          </div>
          <div className="piano-form--submit_area">
            <Button type="submit" btnType="primary" size="sm">
              登录
            </Button>
            <div className="link-line"></div>
            <Button
              type="button"
              btnType="primary"
              size="sm"
              onClick={resetAll}
            >
              重置
            </Button>
          </div>
        </>
      )}
    </Form>
  )
}
BasicForm.storyName = '验证功能+重置按钮'

export const BRegForm = (args: any) => {
  const initialValues = {
    agreement: false
  }
  return (
    <Form {...args} initialValues={initialValues}>
      <FormItem
        label="邮件"
        name="email"
        rules={[{ type: 'email', required: true }]}
      >
        <Input />
      </FormItem>
      <FormItem
        label="密码"
        name="password"
        rules={[{ type: 'string', required: true, min: 3, max: 8 }]}
      >
        <Input type="password" />
      </FormItem>
      <FormItem
        label="性别"
        name="gender"
        rules={[{ type: 'string', required: true }]}
        getValueFromEvent={e => e}
        valuePropName="defaultValue"
      >
        <Select
          placeholder="请选择性别"
          options={[{ value: '男' }, { value: '女' }]}
        />
      </FormItem>
      <div
        className="agreement-section"
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <FormItem
          name="agreement"
          rules={[{ type: 'enum', enum: [true], message: '请同意协议' }]}
          getValueFromEvent={e => e.target.checked}
          valuePropName="checked"
        >
          <input type="checkbox" />
        </FormItem>
        <span className="agree-text">
          注册即代表你同意<a href="#">用户协议</a>
        </span>
      </div>
      <div className="piano-form--submit_area">
        <Button type="submit" btnType="primary">
          登陆
        </Button>
      </div>
    </Form>
  )
}
BRegForm.storyName = '加入Select选择框'
