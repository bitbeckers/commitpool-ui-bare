import React from "react";
import { StyleSheet, View } from "react-native";
import { LayoutContainer, Footer, Text, Button, ProgressBar } from "../../components";

const IntroPage = ({ navigation }) => {
  return (
    <LayoutContainer>
      <ProgressBar size={2 / 6} />
      <View style={styles.intro}>
        <Text text={"Connect to Strava"} />
      </View>
      <Footer>
        <Button text={"Back"} onPress={() => navigation.goBack()} />
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

export default IntroPage;
