import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  // //Load fonts
  let [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    Rubik_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
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
          <Stack.Screen name="ActivitySource" component={ActivitySourcePage} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

const Stack = createStackNavigator();

export default App;
