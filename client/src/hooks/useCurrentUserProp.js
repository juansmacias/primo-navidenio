import { useSelector } from 'react-redux'
import { selectCurrentUser } from 'reducers/auth'

export const useCurrentUserProp = (propName) => {
  const user = useSelector(selectCurrentUser)
  return user?.[propName]
}
