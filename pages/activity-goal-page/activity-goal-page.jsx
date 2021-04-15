import React from "react";
import { StyleSheet, View } from "react-native";
import {
  LayoutContainer,
  Footer,
  Text,
  Button,
  ProgressBar,
  ActivitySelector
} from "../../components";

const ActivityGoalPage = ({ navigation }) => {
  return (
    <LayoutContainer>
      <ProgressBar size={1 / 6} />
      <View style={styles.intro}>
        <Text text={"Set up your commitment"} />
        <ActivitySelector />
      </View>
      <Footer>
        <Button text={"Back"} onPress={() => navigation.goBack()} />
        <Button
          text={"Continue"}
          onPress={() => navigation.navigate("ActivitySource")}
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

export default ActivityGoalPage;
