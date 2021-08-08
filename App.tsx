// react
import React from 'react';

// react native
import { Text, View } from 'react-native';

// third-party libraries
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { NavigationScreenProps } from "react-navigation"
import * as Font from "expo-font"
import { Asset } from 'expo-asset'
import { Root } from "native-base";
import { eventEmitter, initialMode } from 'react-native-dark-mode'

// redux
import DebugConfig from "./config/debug-config"
import { AppWithNavigationState } from "./navigation/redux-navigation"
import configureStore from "./redux/create-store"
import { startup } from "./redux/startup"
import { colors } from './theme';

// store
export const { store, persistor } = configureStore();

type State = {
	isLoadingComplete: boolean
	onAnimationEnd: boolean
	hideSPlash: boolean
}

interface DispatchProps {
	startup: () => void
}

interface MyProps extends NavigationScreenProps {
	skipLoadingScreen: boolean
}

type Props = MyProps & DispatchProps


class App extends React.Component<Props, State> {
	state = {
		isLoadingComplete: false,
		onAnimationEnd: false,
		hideSPlash: false,
		autoBackgroundColor: initialMode
	};

	componentDidMount() {
		console.tron.log(initialMode, "INIT")
		this.loadResourcesAsync();
		store.dispatch(startup());
    	//@ts-ignore (let's discuss adding a permission screen before authLanding page.)
	}

	render() {
		const { autoBackgroundColor } = this.state

		if (!this.state.isLoadingComplete) return null;

		return (
		<Provider store={store}>
			<PersistGate persistor={persistor} loading={<Text> Loading... </Text>}>
			<View style={{ flex: 1, backgroundColor: autoBackgroundColor === 'dark' ? colors.companyDarkGreen : colors.white }}>
				<Root>
				<AppWithNavigationState />
				</Root>
			</View>
			</PersistGate>
		</Provider>
		)
	}

	loadResourcesAsync = async () => {
		await Promise.all([
		Asset.loadAsync([
			
		]),
		Font.loadAsync({
			"Gilroy-Bold": require("./assets/fonts/Gilroy-ExtraBold.otf"),
			"Gilroy-Light": require("./assets/fonts/Gilroy-Light.otf"),
			"Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
			"Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf")
		}),
	]);

		this.setState({ isLoadingComplete: true })
	};
}

// allow reactotron overlay for fast design in dev mode
//@ts-ignore
export default DebugConfig.useReactotron ? console.tron.overlay(App) : App
