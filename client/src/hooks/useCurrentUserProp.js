import { useSelector } from 'react-redux'
import { selectCurrentUserEntities } from 'reducers/auth'

export const useCurrentUserProp = (propName) => {
  const userProps = useSelector(selectCurrentUserEntities)
  return userProps?.[propName]
}
