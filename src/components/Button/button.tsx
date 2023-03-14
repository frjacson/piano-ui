import React from 'react'
import classNames from 'classnames'

export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface BaseButtonProps {
  /**添加自定义类名 */
  className?: string
  /**设置按钮失效状态 */
  disabled?: boolean
  /**设置按钮的尺寸大小 */
  size?: ButtonSize
  /**设置按钮的类型 */
  btnType?: ButtonType
  /**设置按钮上的文字 */
  children?: React.ReactNode
  /**点击跳转的地址，指定此属性 button 的行为和 a 链接一致 */
  href?: string
}
type NativeButtonProps = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLElement>
// 将属性都变成可选的
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: React.FC<ButtonProps> = props => {
  const { btnType, className, disabled, size, children, href, ...restProps } =
    props
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === 'link' && disabled
  })
  if (btnType === 'link' && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    )
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: 'default'
}

export default Button
