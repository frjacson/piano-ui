import React, { ChangeEvent, ReactNode, useRef, useState } from 'react'
import axios from 'axios'

import { UploadFile } from './UploadFileProps'
import UploadList from './UploadList'

export interface UploadProps {
  /** 请求地址 */
  action: string
  /** 默认发送的文件 */
  defaultFileList?: UploadFile[]
  /** 发送前触发事件 */
  beforeUpload?: (file: File) => boolean | Promise<File>
  /** 发送过程中触发事件 */
  onProgress?: (percentage: number, file: File) => void
  /** 发送成功触发事件 */
  onSuccess?: (data: any, file: File) => void
  /** 发送失败触发事件 */
  onError?: (err: any, file: File) => void
  /** 更改发送文件触发的改变事件 */
  onChange?: (file: File) => void
  /** 移除文件触发事件 */
  onRemove?: (file: UploadFile) => void
  /** 发送请求头 */
  headers?: { [key: string]: any }
  /** 发送文件名称 */
  name?: string
  /** 发送文件的key-value */
  data?: { [key: string]: any }
  /** 是否认证 */
  withCredentials?: boolean
  /** 支持上传文件的类型 */
  accept?: string
  /** 是否支持上传多个文件 */
  multiple?: boolean
  /** 是否支持拖动上传 */
  drag?: boolean
  children?: ReactNode
}

const Upload: React.FC<UploadProps> = props => {
  const {
    action,
    onProgress,
    onSuccess,
    onError,
    beforeUpload,
    onChange,
    defaultFileList,
    onRemove,
    headers,
    name,
    data,
    withCredentials,
    accept,
    multiple,
    drag,
    children
  } = props
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])
  const updateFileList = (
    updateFile: UploadFile,
    updateObj: Partial<UploadFile>
  ) => {
    setFileList(preList => {
      return preList.map(file => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj }
        } else {
          return file
        }
      })
    })
  }
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  const handleRemove = (file: UploadFile) => {
    setFileList(preList => {
      return preList.filter(item => item.uid !== file.uid)
    })
    if (onRemove) {
      onRemove(file)
    }
  }
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) {
      return
    }
    //upload
    uploadFile(files)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }
  const uploadFile = (files: FileList) => {
    const postFiles = Array.from(files)
    postFiles.forEach(file => {
      if (!beforeUpload) {
        post(file)
      } else {
        const result = beforeUpload(file)
        if (result && result instanceof Promise) {
          result.then(processFile => {
            post(processFile)
          })
        } else if (result !== false) {
          post(file)
        }
      }
    })
  }
  const post = (file: File) => {
    const _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file
    }
    // setFileList([_file, ...fileList])
    setFileList(preList => {
      return [_file, ...preList]
    })
    const formData = new FormData()
    formData.append(name || 'file', file)
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key])
      })
    }
    axios
      .post(action, formData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data'
        },
        withCredentials,
        onUploadProgress: e => {
          if (e.total) {
            const percentage = Math.round((e.loaded * 100) / e.total) || 0
            if (percentage < 100) {
              updateFileList(_file, {
                percent: percentage,
                status: 'uploading'
              })
              if (onProgress) {
                onProgress(percentage, file)
              }
            }
          }
        }
      })
      .then(res => {
        console.log(res)
        updateFileList(_file, { status: 'success', response: res.data })
        if (onSuccess) {
          onSuccess(res.data, file)
        }
        if (onChange) {
          onChange(file)
        }
      })
      .catch(err => {
        console.log(err)
        updateFileList(_file, { status: 'error', error: err })
        if (onError) {
          onError(err, file)
        }
        if (onChange) {
          onChange(file)
        }
      })
  }
  return (
    <div className="piano-upload-component">
      {/* <Button btnType="primary" onClick={handleClick}>
        Upload File
      </Button> */}
      <div
        className="piano-upload-input"
        style={{ display: 'inline-block' }}
        onClick={handleClick}
      >
        {children}
        <input
          type="file"
          className="piano-file-input"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={accept}
          multiple={multiple}
        />
      </div>
      <UploadList fileList={fileList} onRemove={handleRemove}></UploadList>
    </div>
  )
}
Upload.defaultProps = {
  name: 'file'
}
export default Upload
