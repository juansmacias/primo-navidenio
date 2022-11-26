import React, { useState } from 'react'
import { TextField } from '@mui/material'
import { useFormContext } from 'react-hook-form'

// ---- Hooks -----


export default function Email(passThroughProps) {
  const [email, setEmail] = useState('')
  const { register, errors } = useFormContext()
  const errorMessage = errors?.email?.message

  return (
    <TextField { ...register('email',{ required:'Requerido' })}
      label='Correo'
      name='email'
      type='email'
      required
      value = {email}
      helperText={errorMessage || '*Requerido'}
      error={!!errorMessage}
      onChange = {({ currentTarget: { value } }) => { setEmail(value)}}
      { ...passThroughProps }
    />
  )
}
