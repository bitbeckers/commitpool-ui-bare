import "react-native-gesture-handler";
import React from "react";

import { Provider } from "react-redux";
import store from "./redux/store";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AppLoading from "expo-app-loading";
import { useFonts, OpenSans_400Regular } from "@expo-google-fonts/open-sans";
import { Rubik_700Bold } from "@expo-google-fonts/rubik";

import { Header } from "./components/";
import {
  LandingPage,
  IntroPage,
  LoginPage,
  ActivityGoalPage,
  ActivitySourcePage,
} from "./pages";

const App = () => {
  let [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    Rubik_700Bold,
  });

  //TODO Do we ever get to the loading screen?
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="ActivityGoal"
            screenOptions={{
              headerTitle: (props) => <Header {...props} />,
              headerLeft: () => null,
            }}
          >
            <Stack.Screen
              name="Landing"
              component={LandingPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Intro" component={IntroPage} />
            <Stack.Screen name="ActivityGoal" component={ActivityGoalPage} />
            <Stack.Screen
              name="ActivitySource"
              component={ActivitySourcePage}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
};

const Stack = createStackNavigator();

export default App;
