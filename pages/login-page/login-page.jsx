import React from "react";
import { StyleSheet, View } from "react-native";
import LayoutContainer from "../../components/layout-container/layout-container.component.jsx";
import Button from "../../components/custom-button/custom-button.component";
import Text from "../../components/text-box/text-box.component";
import Footer from "../../components/footer/footer.component";

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
