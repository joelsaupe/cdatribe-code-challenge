import React from 'react'
import { FormContext, useForm, useFormContext } from 'react-hook-form'
import { v4 as generateUUID } from 'uuid'

export const Container = props => <div {...props} className="container" />

export const Section = props => <section {...props} className="section" />

export const Notification = ({ type, props }) => <div {...props} className={['notification', type && `is-${type}`].filter(Boolean).join(' ')} />

export const Form = ({ onSubmit, loading, children, error: errorProp, ...props }) => {
  const methods = useForm();

  const errorMessage = ((errorProp || {}).graphQLErrors || [])
    .map(error => error.message)
    .filter(Boolean)
    .join(' ')

  console.log({ errorMessage, errorProp })

  return (
    <FormContext { ...methods} loading={loading}>
      <form {...props} onSubmit={methods.handleSubmit(onSubmit)}>
        {!!errorMessage && <Notification type="danger">{errorMessage}</Notification>}
        {children}
      </form>
    </FormContext>
  );
}

export const Input = ({ label, ...props }) => {
  const { register, loading } = useFormContext();

  const uuid = React.useMemo(generateUUID, []);

  return (
    <div className="field">
      {!!label && <label className="label" htmlFor={uuid}>{label}</label>}
      <div className="control">
        <input {...props} className="input" disabled={loading} id={uuid} ref={register} />
      </div>
    </div>
  )
}

export const Button = ({ color, type, ...props }) => {
  const form = useFormContext()

  return (
    <button
      type={type || "button"}
      disabled={!!(form && form.loading)}
      {...props}
      className={[
        'button',
        color && `is-${color.toLowerCase()}`,
        !!(form && form.loading && type === "submit") && 'is-loading',
      ].filter(Boolean).join(' ')}
    />
  )
}
