import { useSelector } from 'react-redux'
import { selectCurrentUserEntities } from 'reducers/auth'

export const useCurrentUserProp = (propName) => {
  const userProps = useSelector(selectCurrentUserEntities)
  return userProps?.[propName]
}

export const useCurrentUserHasAnswers = () => {
  const userProps = useSelector(selectCurrentUserEntities)
  return userProps?.answers?.length>0
}

export const useCurrentUserHasAssignedHero = () => {
  const userProps = useSelector(selectCurrentUserEntities)
  return userProps?.heroId?true:false
}
