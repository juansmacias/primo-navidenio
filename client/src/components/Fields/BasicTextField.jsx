import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { TextField } from '@mui/material'

export default function BasicTextField(passThroughProps){
    const { name } = passThroughProps
    const [textValue, setTextValue ] = useState('')
    const { register, errors } = useFormContext()
    const errorMessage = errors?.[name]?.message

    return (
        <TextField { ...register(name,{ required:'Requerido' })}
            value={ textValue }
            helperText={errorMessage}
            error={!!errorMessage}
            required
            onChange= {({ currentTarget: { value } }) => { setTextValue(value)}}
            { ...passThroughProps }
        />
    )
}
