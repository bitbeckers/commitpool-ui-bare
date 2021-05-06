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
        text={"Mmmmm... It appears you are not yet connected to a wallet"}
      />
      <View style={styles.loginPage}>
        <Text text={"Select login method"} />
        <Button text={"Login"} onPress={() => handleLogin()} />
        <Button
          text={"MetaMask"}
          onPress={() => console.log("Log in using MetaMask")}
        />
      </View>
      <Footer>
        <Button text={"Back"} onPress={() => navigation.goBack()} />
        <Button
          text={"Continue"}
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
