import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import {
  STARTUP,
} from "./startup.types";
import { ApplicationState } from "..";
import { AsyncStorage } from 'react-native';
import { Toast } from "native-base";


export const startup = () => ({ type: STARTUP });

export const notify = (message: string, type: string): ThunkAction<
  void,
  ApplicationState,
  null,
  Action<any>
  > => async (dispatch, getState) => {
  Toast.show({ text: `${message}`, type: `${type}`, position: 'top', duration: 3000, swipeDisabled: true })
};