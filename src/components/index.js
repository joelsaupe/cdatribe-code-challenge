import React from 'react'
import { FormContext, useForm, useFormContext } from 'react-hook-form'
import { v4 as generateUUID } from 'uuid'

export const Container = props => <div {...props} className="container" />

export const Section = props => <section {...props} className="section" />

export const Form = ({ onSubmit, ...props }) => {
  const methods = useForm();

  return (
    <FormContext { ...methods}>
      <form {...props} onSubmit={methods.handleSubmit(onSubmit)} />
    </FormContext>
  );
}

export const Input = ({ label, ...props }) => {
  const { register } = useFormContext();
  const uuid = React.useMemo(generateUUID, []);

  return (
    <div className="field">
      {!!label && <label class="label" htmlFor={uuid}>{label}</label>}
      <div className="control">
        <input {...props} className="input" id={uuid} ref={register} />
      </div>
    </div>
  )
}

export const Button = ({ color, ...props }) => (
  <button
    type="button"
    {...props}
    className={['button', color && `is-${color.toLowerCase()}`].filter(Boolean).join(' ')}
  />
)
