import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Header } from "./components/";
import {
  LandingPage,
  IntroPage,
  LoginPage,
  ActivityGoalPage,
  ActivitySourcePage,
} from "./pages";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  //Load fonts
  useEffect(() => {
    Font.loadAsync({
      "rubik-mono-one": require("./assets/fonts/Rubik_Mono_One/RubikMonoOne-Regular.ttf"),
      "open-sans": require("./assets/fonts/Open_Sans/OpenSans-Regular.ttf"),
    });
    setAssetsLoaded(true);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Landing"
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
        <Stack.Screen name="ActivitySource" component={ActivitySourcePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Stack = createStackNavigator();

export default App;
