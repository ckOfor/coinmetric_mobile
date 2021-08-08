// react
import React, { useState } from 'react';

// react native
import { Text, View } from 'react-native';

// third-party libraries
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { NavigationScreenProps } from "react-navigation"
import * as Font from "expo-font"
import { Asset } from 'expo-asset'
import { Root } from "native-base";

// redux
import DebugConfig from "./config/debug-config"
import { AppWithNavigationState } from "./navigation/redux-navigation"
import configureStore from "./redux/create-store"
import { startup } from "./redux/startup"
import { useEffect } from 'react';

// store
export const { store, persistor } = configureStore();

interface DispatchProps {
	startup: () => void
}

interface MyProps extends NavigationScreenProps {
	skipLoadingScreen: boolean
}

type Props = MyProps & DispatchProps

const App = (props: Props) => {

	const [isLoadingComplete, setIsLoadingComplete] = useState(false)

	useEffect(() => {
		loadResourcesAsync()
		store.dispatch(startup());

	})

	const loadResourcesAsync = async () => {
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

		setIsLoadingComplete(true)
	};

	if (!isLoadingComplete) return null;

	return (
		<Provider store={store}>
			<PersistGate persistor={persistor} loading={<Text> Loading... </Text>}>
				<View style={{ flex: 1 }}>
					<Root>
						<AppWithNavigationState />
					</Root>
				</View>
			</PersistGate>
		</Provider>
	)
}

// allow reactotron overlay for fast design in dev mode
//@ts-ignore
export default DebugConfig.useReactotron ? console.tron.overlay(App) : App
