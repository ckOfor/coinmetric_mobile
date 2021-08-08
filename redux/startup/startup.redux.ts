import {
  StartupAction,
  StartupState,
} from "./startup.types"

const initialState: StartupState = {
  
}

export function startupReducer(
  state = initialState,
  action: StartupAction
): StartupState {
  switch (action.type) {
    default:
      return state
  }
}
