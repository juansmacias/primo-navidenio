import { useSelector } from 'react-redux'
import { selectCurrentTips } from 'reducers/tips'

export const useCurrentTips = () => {
    return useSelector(selectCurrentTips)
}