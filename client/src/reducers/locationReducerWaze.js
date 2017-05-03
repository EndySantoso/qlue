import * as ActionTypes from '../actions/constants'

const initState = []

const locationReducerWaze = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.GET_DATA_LOCATION_WAZE: {
      // console.log(action.payload)
      return action.payload
    }
    default: return state
  }
}

export default locationReducerWaze
