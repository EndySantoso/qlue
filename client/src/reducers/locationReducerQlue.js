import * as ActionTypes from '../actions/constants'

const initState = []

const locationReducerQlue = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.GET_DATA_LOCATION_QLUE: {
      return action.payload
    }
    default: return state
  }
}

export default locationReducerQlue
