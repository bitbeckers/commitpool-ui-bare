import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateStake } from "../../redux/commitment/commitmentSlice";

import { StyleSheet, View, TextInput } from "react-native";
import {
  LayoutContainer,
  Footer,
  Button,
  Text,
  ProgressBar,
} from "../../components";

const StakingPage = ({ navigation }) => {
  //TODO selector [amount, currency]
  const dispatch = useDispatch();

  return (
    <LayoutContainer>
      <ProgressBar size={3 / 6} />
      <View style={styles.text}>
        <Text text={"How much to you want to stake?"} />
        <View style={styles.valueInput}>
          <TextInput
            keyboardType={"number-pad"}
            style={styles.textInput}
            onChangeText={(value) => dispatch(updateStake(value))}
          />
          <Text text={"DAI"} />
        </View>
      </View>
      <Footer>
        <Button text={"Back"} onPress={() => navigation.goBack()} />
        <Button text={"Continue"} onPress={() => navigation.navigate("ConfirmationPage")} />
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
  textInput: {
    backgroundColor: "white",
    fontSize: 14,
    height: 28,
    width: 75,
    textAlign: "center",
    borderRadius: 20,
  },
  valueInput: {
    flexDirection: 'row',
    marginTop: 20,
  }
});

export default StakingPage;
