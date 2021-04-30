import React from "react";
import { StyleSheet, View } from "react-native";
import {
  LayoutContainer,
  Footer,
  Button,
  ProgressBar,
  Text,
} from "../../components";
import { useStravaLogin } from "./hooks";

const ActivitySourcePage = ({ navigation }) => {
  const [isLoggedIn, handleLogin] = useStravaLogin();
  return (
    <LayoutContainer>
      <ProgressBar size={2 / 6} />
      <View style={styles.intro}>
        {isLoggedIn ? (
          <Text text={"Hello Frank"} />
        ) : (
          <Text text={"Please log in"} />
        )}
        {isLoggedIn ? (
          <Button text={"Change account"} onPress={() => handleLogin()} />
        ) : (
          <Button text={"Connect to Strava"} onPress={() => handleLogin()} />
        )}
      </View>
      <Footer>
        <Button text={"Back"} onPress={() => navigation.goBack()} />
        <Button
          text={"Continue"}
          onPress={() => navigation.navigate("StakingPage")}
        />
      </Footer>
    </LayoutContainer>
  );
};

const styles = StyleSheet.create({
  intro: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ActivitySourcePage;
