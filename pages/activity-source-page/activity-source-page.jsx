import React from "react";
import { StyleSheet, View } from "react-native";
import { LayoutContainer, Footer, Button, ProgressBar } from "../../components";
import { useStravaLogin } from './hooks';

const ActivitySourcePage = ({ navigation }) => {
  return (
    <LayoutContainer>
      <ProgressBar size={2 / 6} />
      <View style={styles.intro}>
        <Button text={"Connect to Strava"} onPress={() => useStravaLogin()} />
      </View>
      <Footer>
        <Button text={"Back"} onPress={() => navigation.goBack()} />
        <Button text={"Continue"} onPress={() => navigation.navigate("StakingPage")} />
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
