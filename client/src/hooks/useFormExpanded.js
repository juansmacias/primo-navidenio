import { useForm } from 'react-hook-form'

export default function useFormExpanded(args) {
  const baseMethods = useForm(args)
  const { errors, setError } = baseMethods

  function setFieldValidationErrors({ data: { errors } }) {
    for (const errorField in errors) {
      const errorMessages = errors[errorField]
      errorMessages.forEach((message) => {
        setError(errorField, { message })
      })
    }
  }

  const hasErrors = Object.keys(errors).length > 0

  return { ...baseMethods, setFieldValidationErrors, hasErrors }
}
