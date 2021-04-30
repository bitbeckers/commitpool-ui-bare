import React from "react";
import { StyleSheet, View } from "react-native";
import { LayoutContainer, Footer, Button, Text, ProgressBar } from "../../components";

const StakingPage = ({ navigation }) => {
          //TODO selector [amount, currency]

  return (
    <LayoutContainer>
      <ProgressBar size={3 / 6} />
      <View style={styles.text}>
        <Text text={"How much to you want to stake?"}/>
      </View>
      <Footer>
        <Button text={"Back"} onPress={() => navigation.goBack()} />
        <Button text={"Continue"} onPress={() => navigation.goBack()} />
      </Footer>
    </LayoutContainer>
  );
};

const styles = StyleSheet.create({
  text: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default StakingPage;
