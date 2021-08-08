export const STARTUP = "STARTUP"
type SetStartupAction = {
  type: typeof STARTUP
}

export const FETCH_ALL_ASSETS= "FETCH_ALL_ASSETS"
type FetchAllAssets = {
	type: typeof  FETCH_ALL_ASSETS,
}

export const FETCH_ALL_ASSETS_FAILURE = "FETCH_ALL_ASSETS_FAILURE"
type FetchAllAssetsFailure = {
	type: typeof FETCH_ALL_ASSETS_FAILURE,
}

export const FETCH_ALL_ASSETS_SUCCESS = "FETCH_ALL_ASSETS_SUCCESS"
type FetchAllAssetsSuccess = {
	type: typeof FETCH_ALL_ASSETS_SUCCESS,
  payload: Array<any>
}

export const FETCH_ALL_METRICS= "FETCH_ALL_METRICS"
type FetchAlMetrics = {
	type: typeof  FETCH_ALL_METRICS,
}

export const FETCH_ALL_METRICS_FAILURE = "FETCH_ALL_METRICS_FAILURE"
type FetchAlMetricsFailure = {
	type: typeof FETCH_ALL_METRICS_FAILURE,
}

export const FETCH_ALL_METRICS_SUCCESS = "FETCH_ALL_METRICS_SUCCESS"
type FetchAlMetricsSuccess = {
	type: typeof FETCH_ALL_METRICS_SUCCESS,
  payload: Array<any>
}

export type StartupState = {
  loading: boolean
  allAssets: Array<any>
  allMetrics: Array<any>
}

export type StartupAction =
  | SetStartupAction
  | FetchAllAssets
  | FetchAllAssetsFailure
  | FetchAllAssetsSuccess
  | FetchAlMetrics
  | FetchAlMetricsFailure
  | FetchAlMetricsSuccess
