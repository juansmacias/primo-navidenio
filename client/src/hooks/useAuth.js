import { useSelector } from 'react-redux'
import { selectCurrentAuth } from 'reducers/auth'

export const useAuth = () => {
  return useSelector(selectCurrentAuth) 
}
export const useIsAuth = () => {
  const auth = useSelector(selectCurrentAuth)
  return auth?.userId !=null
}
