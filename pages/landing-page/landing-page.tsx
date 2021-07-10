import { StackNavigationProp } from "@react-navigation/stack";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "..";
import { LayoutContainer, Text, Button } from "../../components";
import strings from "../../resources/strings";
import { useWeb3ModalLogin } from "./hooks";
import { useTorusLogin } from "./hooks";

type LandingPageNavigationProps = StackNavigationProp<
  RootStackParamList,
  "Landing"
>;

type LandingPageProps = {
  navigation: LandingPageNavigationProps;
};

const LandingPage = ({ navigation }: LandingPageProps) => {
  const [isLoggedIn, handleLogin] = useWeb3ModalLogin();
  const [popUpVisible, setPopUpVisible] = useState(false);

  const account: string | undefined = useSelector(
    (state: RootState) => state.web3?.account);

  return (
    <LayoutContainer>
    {console.log("Act: " + account)}
    {account ?
            <View style={styles.landingPage}>
              <Text text={strings.landing.intro} />
              <Button
                text={strings.landing.loggedIn.button}
                onPress={() => navigation.navigate("Intro")}
              />
              </View>
              :
              <View style={styles.landingPage}>
                <Text text={strings.landing.intro} />
                  <Button
                    text={strings.landing.new.button}
                    onPress={() => navigation.navigate("Intro")}
                  />
                  <Button
                    text={strings.landing.reconnect.button}
                    onPress={() => handleLogin()}
                  />
                </View>
        }
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
