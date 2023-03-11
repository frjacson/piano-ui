import React, { useState } from 'react'
import classNames from 'classnames'
import Icon from '../../components/Icon/Icon'
import Transition from '../Transition/Transition'

export type AlertType = 'success' | 'primary' | 'danger' | 'warning'

export interface AlertProps {
  title?: string
  type?: AlertType
  closable?: boolean
  closeIcon?: string
  onClose?: () => void
  children?: React.ReactNode
}

const Alert: React.FC<AlertProps> = props => {
  const { title, type, closable, closeIcon, onClose, children } = props
  const [isVisiable, setIsVisiable] = useState(true)
  const handleClick = () => {
    setIsVisiable(false)
    if (onClose) {
      onClose()
    }
  }
  const closeIcons = closeIcon || (
    <Icon icon="times" className="window-close" size="lg"></Icon>
  )
  const classes = classNames('alert', {
    [`alert-${type}`]: type
  })
  return (
    <Transition in={isVisiable} timeout={200} animation="zoom-in-left" wrapper>
      <div className={classes}>
        {title ? <h4 className="alert-title">{title}</h4> : null}
        <p className="alert-message">{children}</p>
        {closable ? <i onClick={handleClick}>{closeIcons}</i> : null}
      </div>
    </Transition>
  )
}
Alert.defaultProps = {
  closable: true,
  type: 'primary'
}

export default Alert
