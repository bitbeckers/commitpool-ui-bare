import { StackNavigationProp } from "@react-navigation/stack";
import React, { Fragment } from "react";
import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "..";
import { LayoutContainer, Text, Button } from "../../components";
import strings from "../../resources/strings";

type LandingPageNavigationProps = StackNavigationProp<
  RootStackParamList,
  "Landing"
>;

type LandingPageProps = {
  navigation: LandingPageNavigationProps;
};

const LandingPage = ({ navigation }: LandingPageProps) => {
  return (
    <LayoutContainer>
      <View style={styles.landingPage}>
        <Text text={strings.landing.intro} />
          <Text text={strings.landing.new.text} />
          <Button
            text={strings.landing.new.button}
            onPress={() => navigation.navigate("Intro")}
          />
          <Text text={strings.landing.reconnect.text} />
          <Button
            text={strings.landing.reconnect.button}
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
