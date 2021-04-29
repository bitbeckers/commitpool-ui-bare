import React from "react";
import { StyleSheet, View } from "react-native";
import { LayoutContainer, Text, Button } from "../../components";

const LandingPage = ({ navigation }) => {
  return (
    <LayoutContainer>
      <View style={styles.landingPage}>
        <Text text={"New to CommitPool?"} />
        <Button
          text={"New User"}
          onPress={() => navigation.navigate("Intro")}
        />
        <Text text={"Used CommitPool before?"} />
        <Button
          text={"Reconnect"}
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </LayoutContainer>
  );
};

const styles = StyleSheet.create({
  landingPage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});

export default LandingPage;
