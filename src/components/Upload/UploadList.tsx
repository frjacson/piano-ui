import React from 'react'
import { UploadFile } from './UploadFileProps'
import Icon from '../Icon/Icon'
import Progress from '../Progress/Progress'

interface UploadListProps {
  fileList: UploadFile[]
  onRemove: (_file: UploadFile) => void
}

const UploadList: React.FC<UploadListProps> = props => {
  const { fileList, onRemove } = props
  return (
    <ul className="piano-upload-list">
      {fileList.map(item => {
        return (
          <li className="piano-upload-list-item" key={item.uid}>
            <span className={`file-name file-name-${item.status}`}>
              <Icon icon="file-alt" theme="secondary"></Icon>
              {item.name}
            </span>
            <span className="file-status">
              {(item.status === 'uploading' || item.status === 'ready') && (
                <Icon icon="spinner" spin theme="primary"></Icon>
              )}
              {item.status === 'success' && (
                <Icon icon="check-circle" theme="success"></Icon>
              )}
              {item.status === 'error' && (
                <Icon icon="times-circle" theme="danger"></Icon>
              )}
            </span>
            <span className="file-actions">
              <Icon
                icon="times"
                onClick={() => {
                  onRemove(item)
                }}
              ></Icon>
            </span>
            {item.status === 'uploading' && (
              <Progress percent={item.percent || 0}></Progress>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default UploadList
