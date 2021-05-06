import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "..";
import { LayoutContainer, Footer, Text, Button } from "../../components";

type IntroPageNavigationProps = StackNavigationProp<
  RootStackParamList,
  'Intro'
>;

type IntroPageProps = {
  navigation: IntroPageNavigationProps;
};

const IntroPage = ({ navigation }: IntroPageProps) => {
  return (
    <LayoutContainer>
      <View style={styles.introPage}>
        <Text text={"Intropaage"} />
      </View>
      <Footer>
        <Button text={"Back"} onPress={() => navigation.goBack()}/>
        <Button
          text={"Get Started"}
          onPress={() => navigation.navigate("ActivityGoal")}
        />
      </Footer>
    </LayoutContainer>
  );
};

const styles = StyleSheet.create({
  introPage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});

export default IntroPage;
