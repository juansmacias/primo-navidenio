import React,{ useState,useEffect  } from 'react'
import { Grid, Typography,Button } from '@mui/material'
import { FormProvider,useForm,useFieldArray, appendErrors } from 'react-hook-form'

// ----- Fields ----
import BasicTextField from 'components/Fields/BasicTextField'

// -----Hook--------
import { useCurrentUserProp } from 'hooks/useCurrentUserProp' 
import { useCurrentTips } from 'hooks/useCurrentTips'

const tips = [
    {
        "id": 55,
        "question": "¿Su comida favorita?"
    },
    {
        "id": 56,
        "question": "Cuentame una historia de tu infancia a tu amigo secreto"
    },
    {
        "id": 57,
        "question": "¿Que color te gusta?"
    },
    {
        "id": 58,
        "question": "¿Cuál es su sueño + grande?"
    },
    {
        "id": 59,
        "question": "Cuál es su super poder?"
    },
    {
        "id": 60,
        "question": "¿Qué le da miedo?"
    },
    {
        "id": 61,
        "question": "¿Mar o Montaña? ¿Por qué?"
    },
    {
        "id": 62,
        "question": "¿Qué super poder tendrias si pudieras elegir?"
    },
    {
        "id": 63,
        "question": "¿Dónde ira de vacaciones?"
    }
]

const AnswerForm = ({externalEndpoint}) => {
    const userId = useCurrentUserProp('id')
    const answers = useCurrentUserProp('answers')
    const tips = useCurrentTips()
    const formMethods = useForm({defaultValues: {
        answersform: []
      }})
    const { handleSubmit,control } = formMethods
    const { fields,append } = useFieldArray({ name: 'answersform', control })

    const [alertMessage, setAlertMessage] = useState('')
    const [showAlert,setShowAlert] = useState(false)

    useEffect(()=>{
            if(showAlert){
                showAlertInComp(alertMessage)
                setShowAlert(!showAlert)
            }
    },[showAlert,alertMessage])

    useEffect(()=>{
        tips?.forEach(t => {
            const answer = answers?.find(a=>a.tipId===t.id)
            append({ tipId:t.id, tipValue:t.question,value:answer?answer.value:""})
        });
    },[tips,answers])

    const onSubmit = async data => {
        data['userid'] = userId
        console.log("🚀 ~ file: answerForm.jsx ~ line 15 ~ onSubmit ~ data", data)

        // try {
        //     const response = await externalEndpoint(data)
        //     setAlertMessage("Preguntas Guardadas")

        //     setShowAlert(true)
        // }   
        // catch(e) {
        //     console.log('catch error: '+e)
            
        //     setAlertMessage("Error con el registro. Revistar datos y volver a intentar.2")

        //     setShowAlert(true)
        // }
    }

return (
    <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)} id='AnswersForm'>
        <Grid container spacing={2}>
        {fields.map((item, i) => (
            <Grid item xs={12} key={item.id} container spacing={1} sx={{m:2,color:'black'}}>
                <Typography variant='h4'>{"Pregunta #"+(i+1)}</Typography>
                <Grid item xs={12}>
                    <BasicTextField formname="tipValue" type="text" formid={i} value={item.tipValue} disabled={true} fullWidth sx={{mb:4}}> </BasicTextField>
                    <BasicTextField formname="tipId" type="hidden" formid={i} value={item.tipId} disabled={true} fullWidth sx={{mb:4,width:0}}> </BasicTextField>                
                </Grid>
                <Grid item xs={12}>
                    <BasicTextField formname="value" type="text" formid={i} multiline={true} required fullWidth sx={{mb:4}}> </BasicTextField>
                </Grid>          
            </Grid>
        ))}
        <Grid item xs={12} sx={{mb:2}}>
            <Button size='large'
            name='submitButton'
            fullWidth 
            color='primary' 
            type='submit'
            variant='contained'>
            Guardar
            </Button>
        </Grid>  
        </Grid>
        </form>
    </FormProvider>
)

}

export default AnswerForm