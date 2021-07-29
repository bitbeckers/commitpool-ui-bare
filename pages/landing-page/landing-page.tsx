import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "..";
import { LayoutContainer, Text, Button } from "../../components";
import strings from "../../resources/strings";
import useWeb3 from "../../hooks/useWeb3";

type LandingPageNavigationProps = StackNavigationProp<
  RootStackParamList,
  "Landing"
>;

type LandingPageProps = {
  navigation: LandingPageNavigationProps;
};

const LandingPage = ({ navigation }: LandingPageProps) => {
  const { account, requestWallet } = useWeb3();

  return (
    <LayoutContainer>
      {console.log("Act: " + account)}
      {account ? (
        <View style={styles.landingPage}>
          <Text text={strings.landing.intro} />
          <Button
            text={strings.landing.loggedIn.button}
            onPress={() => navigation.navigate("Intro")}
          />
        </View>
      ) : (
        <View style={styles.landingPage}>
          <Text text={strings.landing.intro} />
          <Button
            text={strings.landing.new.button}
            onPress={() => navigation.navigate("Intro")}
          />
          <Button
            text={strings.landing.reconnect.button}
            onPress={() => requestWallet()}
          />
        </View>
      )}
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
