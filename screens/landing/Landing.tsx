// react
import React, { useState, useEffect, useRef } from "react"

// react-native
import {
	View, ViewStyle
} from "react-native";

// third-party
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { useDarkMode } from 'react-native-dark-mode'
// import _ from 'lodash';

// redux
import { ApplicationState } from "../../redux";
import { notify } from "../../redux/startup";
import useReduxStore from '../../redux/utils/hooks/useRedux';

// components
import { Button } from "../../components/button";

// styles
import { Layout } from "../../constants";


interface DispatchProps {
	
}

interface StateProps {
	
}

interface LandingScreenProps extends NavigationScreenProps {}

type Props = DispatchProps & StateProps & LandingScreenProps

const ROOT: ViewStyle = {
    width: Layout.window.width,
	height: Layout.window.height,
    backgroundColor: 'red'
};

const Landing = (props: Props) => {

    // redux
    const [dispatch, selectStore] = useReduxStore('startup');

    return(
        <View
            style={ROOT}
        >
			
		</View>
    )

}

export const LandingScreen = Landing