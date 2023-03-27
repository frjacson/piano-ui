import React from 'react'
import { ThemeProps } from '../Icon/Icon'

export interface ProgressProps {
  percent: number
  strokeHeight?: number
  showText?: boolean
  styles?: React.CSSProperties
  theme?: ThemeProps
}

const Progress: React.FC<ProgressProps> = props => {
  const { percent, strokeHeight, showText, styles, theme } = props
  return (
    <div className="piano-progress-bar" style={styles}>
      <div
        className="piano-progress-bar-outer"
        style={{ height: `${strokeHeight}px` }}
      >
        <div
          className={`piano-progress-bar-inner color-${theme}`}
          style={{ width: `${percent}px` }}
        >
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  )
}

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: 'primary'
}
export default Progress
