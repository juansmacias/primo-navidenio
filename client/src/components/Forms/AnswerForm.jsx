import React,{ useState,useEffect  } from 'react'
import { Grid, Typography,Button } from '@mui/material'
import { FormProvider,useForm,useFieldArray, appendErrors } from 'react-hook-form'

// ----- Fields ----
import BasicTextField from 'components/Fields/BasicTextField'

// -----Hook--------
import { useCurrentUserProp } from 'hooks/useCurrentUserProp' 
import { useCurrentTips } from 'hooks/useCurrentTips'

const AnswerForm = ({externalEndpoints}) => {
    const userId = useCurrentUserProp('id')
    const answers = useCurrentUserProp('answers')
    const tips = useCurrentTips()
    const formMethods = useForm({defaultValues: {
        answersform: []
      }})
    const { handleSubmit,control,reset } = formMethods
    const { fields,append } = useFieldArray({ name: 'answersform', control })

    const [alertMessage, setAlertMessage] = useState('')
    const [showAlert,setShowAlert] = useState(false)

    useEffect(()=>{
        if(showAlert){
            showAlertFunc(alertMessage)
            setShowAlert(!showAlert)
        }
    },[showAlert,alertMessage])

    useEffect(()=>{
        reset()
        tips?.forEach(t => {
            const answer = answers?.find(a=>a.tipId===t.id)
            if(answer)
                append({ tipId:t.id, tipValue:t.question,value:answer.value,answerId:answer.id})
            else
                append({ tipId:t.id, tipValue:t.question,value:""})
        })
    },[tips,answers,reset])

    const onSubmit = async data => {
        try {
            data['userid'] = userId
            data.answersform = data.answersform.map(({tipValue,...values})=>values)
            if(answers.length===0){
                const response = await externalEndpoints.postAnswers(data)
                if(response!== undefined){
                    setAlertMessage("Preguntas Guardadas")
    
                    setShowAlert(true)
                }
            } else {
                const response = await externalEndpoints.putAnswers(data)
                console.log("🚀 ~ file: AnswerForm.jsx ~ line 56 ~ onSubmit ~ response", response)
                if(response!== undefined){
                    setAlertMessage("Preguntas Guardadas")
    
                    setShowAlert(true)
                }
            }

        }   
        catch(e) {
            console.log('catch error: '+e)
            
            setAlertMessage("Error con el registro. Revistar datos y volver a intentar.2")

            setShowAlert(true)
        }
    }

    function showAlertFunc(message){
        alert(message)
    }

return (
    <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)} id='AnswersForm'>
        <Grid container spacing={2}>
        {fields.map((item, i) => (
            <Grid item xs={12} key={item.id} container spacing={1} sx={{m:2,color:'black'}}>
                <Typography variant='h4'>{"Pregunta #"+(i+1)}</Typography>
                <Grid item xs={12}>
                    <BasicTextField formname="tipValue" type="text" formid={i} defaultfvalue={item.tipValue} disabled={true} fullWidth sx={{mb:4}}> </BasicTextField>
                    <BasicTextField formname="tipId" type="hidden" formid={i} defaultfvalue={item.tipId} disabled={true} fullWidth sx={{mb:4,width:0}}> </BasicTextField>                
                </Grid>
                <Grid item xs={12}>
                    <BasicTextField formname="value" type="text" formid={i} multiline={true} defaultfvalue={item.value} required fullWidth sx={{mb:4}}> </BasicTextField>
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