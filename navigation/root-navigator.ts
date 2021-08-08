import { createSwitchNavigator } from "react-navigation";
import { LandingScreen } from "../screens/landing";

export const RootNavigator = createSwitchNavigator({
  landing: { screen: LandingScreen },
});
