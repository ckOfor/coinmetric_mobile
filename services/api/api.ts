// a library to wrap and simplify api calls
import apisauce, { DEFAULT_HEADERS } from "apisauce"
import { RN_BASE_URL } from "@env"
import * as Types from "./api.types"
import { getGeneralApiProblem } from "./api-problem"
import { Header } from "react-native/Libraries/NewAppScreen";

const api = apisauce.create({
  // base URL is read from the "constructor"
  baseURL: RN_BASE_URL,
  // here are some default headers
  headers: {
    "Cache-Control": "no-cache",
    Accept: 'application/json',
    ContentType: 'application/json',
    // Authorization: `Bearer ${token}`
  },
  // 10 second timeout...
  timeout: 100000
})

/**
 * Process the api response
 */
const processResponse = async (response: any): Promise<any> => {
  // the typical ways to die when calling an api
  if (!response.ok) {
    const problem = getGeneralApiProblem(response)
    if (problem) {
      console.tron.error({ ...response, message: response.config.url })
      return problem
    }
  }

  // we're good
  // replace with `data` once api change is made.
  return { kind: "ok", data: response.data }
}

const fetchAllAssets = async (): Promise<
  Types.getResponse
  > => {
  const response = await api.post( `/catalog/assets?pretty=true`)
  return processResponse(response)
}

const FetchAllMetrics = async (): Promise<
  Types.getResponse
  > => {
  const response = await api.post( `/catalog/metrics?pretty=true`)
  return processResponse(response)
}

export {
  fetchAllAssets,
  FetchAllMetrics
}
