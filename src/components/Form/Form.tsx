import { ValidateError } from 'async-validator'
import React, {
  ReactNode,
  createContext,
  forwardRef,
  useImperativeHandle
} from 'react'
import useStore, { FormState } from './useStore'

export type RenderProps = (form: FormState) => ReactNode
export interface FormProps {
  name?: string
  initialValues?: Record<string, any>
  children?: ReactNode | RenderProps
  onFinish?: (values: Record<string, any>) => void
  onFinishFailed?: (
    values: Record<string, any>,
    errors: Record<string, ValidateError[]>
  ) => void
}

export type IFormContext = Pick<
  ReturnType<typeof useStore>,
  'dispatch' | 'fields' | 'validateField'
> &
  Pick<FormProps, 'initialValues'>

export type IFormRef = Omit<
  ReturnType<typeof useStore>,
  'fields' | 'dispatch' | 'form'
>
export const FormContext = createContext<IFormContext>({} as IFormContext)

/**
 * > 表单控件, 带数据与管理功能, 包含数据录入、校验等
 *
 * ### 何时使用
 * - 用于创建一个实体或收集信息。
 * - 需要对输入的数据类型进行校验时。
 */

/* eslint-disable react/display-name */
export const Form = forwardRef<IFormRef, FormProps>((props, ref) => {
  const { name, children, initialValues, onFinish, onFinishFailed } = props
  const { form, fields, dispatch, ...restProps } = useStore(initialValues)
  const { validateField, validateAllFields } = restProps
  useImperativeHandle(ref, () => {
    return {
      ...restProps
    }
  })
  const passedContext: IFormContext = {
    dispatch,
    fields,
    initialValues,
    validateField
  }
  let childrenNode: ReactNode
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const { isValid, errors, valueMap: values } = await validateAllFields()
    if (isValid && onFinish) {
      onFinish(values)
    } else if (!isValid && onFinishFailed) {
      onFinishFailed(values, errors)
    }
  }
  if (typeof children === 'function') {
    childrenNode = children(form)
  } else {
    childrenNode = children
  }
  return (
    <>
      <form name={name} className="piano-form" onSubmit={submitForm}>
        <FormContext.Provider value={passedContext}>
          {childrenNode}
        </FormContext.Provider>
      </form>
    </>
  )
})

Form.defaultProps = {
  name: 'piano-form'
}

// Form.displayName = 'Form'

export default Form
