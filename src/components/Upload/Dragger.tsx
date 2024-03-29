import React, { DragEvent, useState } from 'react'
import classNames from 'classnames'

interface DraggerProps {
  onFile?: (files: FileList) => void
  children?: React.ReactNode
}
const Dragger: React.FC<DraggerProps> = props => {
  const { onFile, children } = props
  const [dragOver, setDragOver] = useState(false)
  const classes = classNames('piano-uploader-dragger', {
    'is-dragover': dragOver
  })
  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault()
    setDragOver(over)
  }
  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault()
    setDragOver(false)
    if (onFile) {
      onFile(e.dataTransfer.files)
    }
  }
  return (
    <div
      draggable
      className={classes}
      onDragOver={e => {
        handleDrag(e, true)
      }}
      onDragLeave={e => {
        handleDrag(e, false)
      }}
      onDrop={handleDrop}
    >
      {children}
    </div>
  )
}

export default Dragger
