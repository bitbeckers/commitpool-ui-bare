import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "..";
import {
  LayoutContainer,
  Footer,
  Text,
  Button,
  DialogPopUp,
} from "../../components";

import { useTorusLogin } from "./hooks";
import strings from "../../resources/strings";

type LoginPageNavigationProps = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

type LoginPageProps = {
  navigation: LoginPageNavigationProps;
};

//TODO check for open commitments to determine redirect
const LoginPage = ({ navigation }: LoginPageProps) => {
  const [isLoggedIn, handleLogin] = useTorusLogin();
  const [popUpVisible, setPopUpVisible] = useState(false);

  return (
    <LayoutContainer>
      <DialogPopUp
        visible={popUpVisible}
        onTouchOutside={() => setPopUpVisible(false)}
        text={strings.login.alert}
      />
      <View style={styles.loginPage}>
        <Text text={strings.login.text} />
        <Button text={strings.login.select.torus} onPress={() => handleLogin()} />
        <Button
          text={strings.login.select.metamask}
          onPress={() => console.log("Log in using MetaMask")}
        />
      </View>
      <Footer>
        <Button text={strings.footer.back} onPress={() => navigation.goBack()} />
        <Button
          text={strings.footer.next}
          onPress={() =>
            isLoggedIn
              ? navigation.navigate("ActivityGoal")
              : setPopUpVisible(true)
          }
        />
      </Footer>
    </LayoutContainer>
  );
};

const styles = StyleSheet.create({
  loginPage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoginPage;
