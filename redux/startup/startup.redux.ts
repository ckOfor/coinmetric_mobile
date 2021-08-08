import {
  FETCH_ALL_ASSETS,
  FETCH_ALL_ASSETS_FAILURE,
  FETCH_ALL_ASSETS_SUCCESS,
  FETCH_ALL_METRICS,
  FETCH_ALL_METRICS_FAILURE,
  FETCH_ALL_METRICS_SUCCESS,
  StartupAction,
  StartupState,
} from "./startup.types"

const initialState: StartupState = {
  allAssets: [],
  allMetrics: [],
  loading: false
}

export function startupReducer(
  state = initialState,
  action: StartupAction
): StartupState {
  switch (action.type) {

		case FETCH_ALL_ASSETS:
    case FETCH_ALL_METRICS:
			return {
				...state,
        loading: true
			}

    case FETCH_ALL_ASSETS_FAILURE:
    case FETCH_ALL_METRICS_FAILURE:
			return {
				...state,
        loading: false
			}

    case FETCH_ALL_ASSETS_SUCCESS:
			return {
				...state,
        loading: false,
        allAssets: action.payload
			}

    case FETCH_ALL_METRICS_SUCCESS:
			return {
				...state,
        loading: false,
        allMetrics: action.payload
			}

    default:
      return state
  }
}
