import React from "react";
import { StyleSheet, View } from "react-native";
import { LayoutContainer, Footer, Text, Button } from "../../components";

const LoginPage = ({ navigation }) => {
  return (
    <LayoutContainer>
      <View style={styles.loginPage}>
        <Text text={"Select login method"} />
        <Button text={"Login"} onPress={() => console.log("Log in using Torus")} />
        <Button
          text={"MetaMask"}
          onPress={() => console.log("Log in using MetaMask")}
        />
      </View>
      <Footer>
        <Button text={"Back"} onPress={() => navigation.goBack()} />
        <Button text={"Continue"} onPress={() => navigation.navigate("StakingPage")} />
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
