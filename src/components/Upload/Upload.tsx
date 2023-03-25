import React, { ChangeEvent, useRef, useState } from 'react'
import axios from 'axios'

import Button from '../Button/Button'
import { UploadFile } from './UploadFileProps'
import UploadList from './UploadList'

export interface UploadProps {
  action: string
  defaultFileList?: UploadFile[]
  beforeUpload?: (file: File) => boolean | Promise<File>
  onProgress?: (percentage: number, file: File) => void
  onSuccess?: (data: any, file: File) => void
  onError?: (err: any, file: File) => void
  onChange?: (file: File) => void
  onRemove?: (file: UploadFile) => void
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
    onRemove
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
    setFileList([_file, ...fileList])
    const formData = new FormData()
    formData.append(file.name, file)
    axios
      .post(action, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
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
      <Button btnType="primary" onClick={handleClick}>
        Upload File
      </Button>
      <input
        type="file"
        className="piano-file-input"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <UploadList
        fileList={fileList}
        onRemove={() => {
          handleRemove
        }}
      ></UploadList>
    </div>
  )
}

export default Upload
