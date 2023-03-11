import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import Alert, { AlertProps } from '../Alert/Alert'

const testAlertProps: AlertProps = {
  title: 'testAlert',
  closable: true,
  closeIcon: '关闭',
  type: 'primary'
}

const testSuccessAlertProp: AlertProps = {
  closable: true,
  closeIcon: '关闭',
  type: 'success'
}

describe('test Alert Component', () => {
  // it('should render a default alert ', async () => {
  //   const wrapper = render(<Alert {...testAlertProps}>hello</Alert>)
  //   const element = wrapper.getByText('hello')

  //   expect(element).toBeInTheDocument()
  //   expect(element).toHaveClass('alert-message')
  //   expect(element.parentNode).toHaveClass('alert alert-primary')

  //   const titleElement = wrapper.getByText('testAlert')
  //   expect(titleElement).toBeInTheDocument()
  //   expect(titleElement).toHaveClass('alert-title')
  //   expect(titleElement.parentNode).toBe(element.parentNode)

  //   const iconElement = wrapper.getByText('关闭')
  //   fireEvent.click(iconElement)
  //   await waitFor(() => {
  //     expect(element).not.toBeInTheDocument()
  //   })
  // })

  it('should render the correct component based on different props', async () => {
    const wrapper = render(<Alert {...testSuccessAlertProp}>Nice</Alert>)
    const element = wrapper.getByText('Nice')

    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('P')
    expect(element).toHaveClass('alert-message')
    expect(element.parentNode).toHaveClass('alert alert-success')

    const iconElement = wrapper.getByText('关闭')
    expect(iconElement).toBeInTheDocument()
    fireEvent.click(iconElement)
    await waitFor(() => {
      expect(element).not.toBeInTheDocument()
    })
  })
})
