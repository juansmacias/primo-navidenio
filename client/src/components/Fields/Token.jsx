import React, { useState } from 'react'
import { TextField } from '@mui/material'
import { useFormContext } from 'react-hook-form'

export default function Token(passThroughProps){
  const [token, setToken ] = useState('')
  const {register, errors } = useFormContext()
  const tokenErrorMessage = errors?.token?.message

  return (
    <TextField { ...register('token',{ required: 'Requerido'}) }
      label='Token'
      name='token'
      type='password'
      required
      value={token}
      error={!!tokenErrorMessage}
      helperText={tokenErrorMessage || '*Requerido'}
      onChange= {({ currentTarget: { value } }) => { setToken(value)}}
      { ...passThroughProps }
    />
  )
}