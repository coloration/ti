import React, { FC, useState, useMemo, ReactNode, Fragment } from 'react'
import { Form, Input, Button, Card } from 'antd'
import { useI18nLocale } from '@code/use-react'
import { PlainObject } from '@code/kit'


import { locales } from './utils'
import { FormProps, Rule } from 'antd/lib/form'


export interface ILoginProps extends FormProps {
  withCardWrapper?: boolean
  backboard?: ReactNode,
  loading?: boolean,
  header?: ReactNode,
  width?: number,
  height?: number,
  usernameRules?: Rule[],
  passwordRules?: Rule[],
  onFinish: (value: { username: string, password: string }) => any
  [key: string]: any
}
export const NormalLogin: FC<ILoginProps> = ({
  withCardWrapper,
  backboard,
  loading,
  header,
  width,
  height,
  usernameRules,
  passwordRules,
  onFinish,
  ...otherProps
}) => {
    const [w] = useState(width || 300)
    const [h] = useState(height || 300)
    const [innerLocale] = useI18nLocale<PlainObject<string>>(locales)

    const InnerForm = useMemo(() => {
      return (
        <Fragment>
          <div>{header}</div>
          <Form onFinish={onFinish}>
            <Form.Item 
              name="username"
              rules={usernameRules || [{ required: true, message: innerLocale.usernameTip }]}>
              <Input placeholder={innerLocale.username} />
            </Form.Item>
            <Form.Item 
              name="password"
              rules={passwordRules || [{ required: true, message: innerLocale.passwordTip }]}>
              <Input.Password placeholder={innerLocale.password} />
            </Form.Item>
            <Form.Item>
              <Button 
                type="primary" 
                block 
                loading={loading}
                htmlType="submit">{innerLocale.login}</Button>
            </Form.Item>
          </Form>
        </Fragment>
      )
    }, [innerLocale, header, onFinish, usernameRules, passwordRules, loading])

    return (
      <section
        className="fixed inset-0"
        {...otherProps}>
        <div className="absolute inset-0 z-10">{backboard}</div>
        <div
          className="absolute inset-0 m-auto z-20"
          style={{ width: w, height: h }}>
            { withCardWrapper ? <Card>{ InnerForm }</Card> : InnerForm }
        </div>
      </section>
    )
  }

