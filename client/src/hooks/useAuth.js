import { useSelector } from 'react-redux'
import { selectCurrentAuth } from 'reducers/auth'

export const useAuth = () => {
  return useSelector(selectCurrentAuth) 
}
