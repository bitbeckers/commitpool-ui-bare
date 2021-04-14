import React from "react";
import { StyleSheet, View } from "react-native";
import LayoutContainer from "../../components/layout-container/layout-container.component.jsx";
import Button from "../../components/custom-button/custom-button.component";
import Text from "../../components/text-box/text-box.component";

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
  },
});

export default LandingPage;
