import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Header from "./components/header/header.component.jsx";
import LandingPage from "./pages/landing-page/landing-page.jsx";
import LoginPage from "./pages/login-page/login-page.jsx";
import IntroPage from "./pages/intro-page/intro-page.jsx";
import ActivityGoal from "./pages/activity-goal-page/activity-goal-page.jsx";
import ActivitySource from "./pages/activity-source-page/activity-source-page.jsx";

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={LandingPage} options={{headerShown: false}}/>
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ headerTitle: (props) => <Header {...props} /> , headerLeft: ()=> null}}
        />
        <Stack.Screen
          name="Intro"
          component={IntroPage}
          options={{ headerTitle: (props) => <Header {...props} /> , headerLeft: ()=> null}}
        />
        <Stack.Screen
          name="ActivityGoal"
          component={ActivityGoal}
          options={{ headerTitle: (props) => <Header {...props} /> , headerLeft: ()=> null}}
          />
        <Stack.Screen
          name="ActivitySource"
          component={ActivitySource}
          options={{ headerTitle: (props) => <Header {...props} /> , headerLeft: ()=> null}}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Stack = createStackNavigator();

export default App;
