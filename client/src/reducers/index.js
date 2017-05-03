import { combineReducers } from 'redux'

import locationReducerQlue from './locationReducerQlue'
import locationReducerWaze from './locationReducerWaze'

const rootReducer = combineReducers({
  locationQlue: locationReducerQlue,
  locationWaze: locationReducerWaze
})

export default rootReducer
