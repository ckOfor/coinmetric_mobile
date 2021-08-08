import { combineReducers, Reducer } from "redux"
import { startupReducer as startup, StartupState } from "./startup"
import { navReducer } from "../navigation/redux-navigation"

export interface ApplicationState {
  nav: any
  startup: StartupState
}

export const appReducer: Reducer<ApplicationState> = combineReducers({
  nav: navReducer,
  startup,
});
