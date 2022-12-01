import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { TextField } from '@mui/material'

export default function BasicTextField(passThroughProps){
    const { formname,formid,defaultfvalue } = passThroughProps
    const [textValue, setTextValue ] = useState(defaultfvalue?defaultfvalue:'')
    const { register, errors } = useFormContext()
    const errorMessage = errors?.answersform?.[formid]?.[formname].message

    return (
        <TextField { ...register(`answersform.${formid}.${formname}`,{ required:'Requerido' })}
            value={ textValue }
            helperText={errorMessage}
            error={!!errorMessage}
            name={`answersform.[${formid}].${formname}`}
            onChange= {({ currentTarget: { value } }) => { setTextValue(value)}}
            { ...passThroughProps }
        />
    )
}
