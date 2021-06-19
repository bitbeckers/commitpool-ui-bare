import React, { Fragment } from "react";
import {
  StyleSheet,
  StyleProp,
  TextStyle,
  View,
  TextInput,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";

import { Text } from "../../components";

import { updateStake } from "../../redux/commitment/commitmentSlice";

interface StakeBoxProps {
  style?: StyleProp<TextStyle>;
}

const StakeBox = ({ style }: StakeBoxProps) => {
  const stake: number = useSelector(
    (state: RootState) => state.commitment.stake
  );

  const dispatch = useAppDispatch();

  return (
    <Fragment>
      <View style={styles.valueInput}>
        <TextInput
          defaultValue={stake?.toString()}
          keyboardType={"number-pad"}
          style={styles.textInput}
          onChangeText={(value) => dispatch(updateStake(value))}
        />
        <Text text={`DAI`} />
      </View>
      {stake >= 100 ? (
        <Text
          style={styles.textHighAlert}
          text={`You're staking ${stake.toString()} DAI. That's a big commitment!`}
        />
      ) : undefined}
      ;
    </Fragment>
  );
};

const styles = StyleSheet.create({
  stakeBox: {
    color: "white",
    fontSize: 22,
    letterSpacing: 1,
    textAlign: "left",
    fontFamily: "OpenSans_400Regular",
    paddingRight: 10,
    paddingLeft: 10,
  },
  valueInput: {
    flexDirection: "row",
    marginTop: 20,
  },
  textHighAlert: {
    marginTop: 25,
    fontWeight: "bold",
  },
  textInput: {
    backgroundColor: "white",
    fontSize: 14,
    height: 28,
    width: 75,
    textAlign: "center",
    borderRadius: 20,
  },
});

export default StakeBox;
