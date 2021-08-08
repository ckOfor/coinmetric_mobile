import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import {
  FETCH_ALL_ASSETS,
  FETCH_ALL_ASSETS_FAILURE,
  FETCH_ALL_ASSETS_SUCCESS,
  FETCH_ALL_METRICS,
  FETCH_ALL_METRICS_FAILURE,
  FETCH_ALL_METRICS_SUCCESS,
  STARTUP,
} from "./startup.types";
import { ApplicationState } from "..";
import { Toast } from "native-base";

// APIs
import {
  fetchAllAssets as apiFetchAllAssets,
  FetchAllMetrics as apiFetchAllMetrics
} from "../../services/api"


export const startup = () => ({ type: STARTUP });

export const notify = (message: string, type: string): ThunkAction<
  void,
  ApplicationState,
  null,
  Action<any>
  > => async (dispatch, getState) => {
  Toast.show({ text: `${message}`, type: `${type}`, position: 'top', duration: 3000, swipeDisabled: true })
};

export const fetchAllAssets = () => ({
	type: FETCH_ALL_ASSETS
})

export const fetchAllAssetsFailure = () => ({
	type: FETCH_ALL_ASSETS_FAILURE
})

export const fetchAllAssetsSuccess = (payload: Array<any>) => ({
	type: FETCH_ALL_ASSETS_SUCCESS,
  payload
})

export const fetchAllAssetsAsync = (): ThunkAction<void, ApplicationState, null, Action<any>> => async (
	dispatch,
	getState
) => {
	dispatch(fetchAllAssets())

	try {
		const result = await apiFetchAllAssets()
		const { kind, data } = result

		if (kind === "ok") {
			dispatch(fetchAllAssetsSuccess(data))
		} else {
			dispatch(notify(`${data.message}`, 'danger'))
			dispatch(fetchAllAssetsFailure())
		}
	} catch ({ message }) {
		dispatch(fetchAllAssetsFailure())
		dispatch(notify(`${message}`, 'danger'))
	}
}


export const fetchAllMetrics = () => ({
	type: FETCH_ALL_METRICS
})

export const fetchAllMetricsFailure = () => ({
	type: FETCH_ALL_METRICS_FAILURE
})

export const fetchAllMetricsSuccess = (payload: Array<any>) => ({
	type: FETCH_ALL_METRICS_SUCCESS,
  payload
})

export const fetchAllMetricsAsync = (): ThunkAction<void, ApplicationState, null, Action<any>> => async (
	dispatch,
	getState
) => {
	dispatch(fetchAllMetrics())

	try {
		const result = await apiFetchAllMetrics()
		const { kind, data } = result

		if (kind === "ok") {
			dispatch(fetchAllMetricsSuccess(data))
		} else {
			dispatch(notify(`${data.message}`, 'danger'))
			dispatch(fetchAllMetricsFailure())
		}
	} catch ({ message }) {
		dispatch(fetchAllMetricsFailure())
		dispatch(notify(`${message}`, 'danger'))
	}
}
