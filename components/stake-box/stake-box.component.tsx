import React, { Fragment } from "react";
import {
  StyleSheet,
  StyleProp,
  TextStyle,
  View,
  TextInput,
} from "react-native";
import { useAppDispatch } from "../../redux/store";

import { Text } from "..";

import {
  updateCommitment,
  updateStakeSet,
} from "../../redux/commitpool/commitpoolSlice";
import useCommitment from "../../hooks/useCommitment";

interface StakeBoxProps {
  style?: StyleProp<TextStyle>;
}

const StakeBox = ({ style }: StakeBoxProps) => {
  const dispatch = useAppDispatch();

  const { commitment } = useCommitment();
  const { stake }: {stake: number} = commitment;

  const onStakeInput = (stake: string) => {
    const _stake = Number.parseFloat(stake);
    if (!isNaN(_stake) && validStake(_stake)) {
      dispatch(updateCommitment({ stake: _stake }));
      dispatch(updateStakeSet(true));
    } else {
      dispatch(updateStakeSet(false));
    }
  };

  return (
    <Fragment>
      <View style={styles.valueInput}>
        <TextInput
          defaultValue={stake?.toString()}
          keyboardType={"number-pad"}
          style={styles.textInput}
          onChangeText={(stake) => onStakeInput(stake)}
        />
        <Text text={`DAI`} />
      </View>
      {stake >= 100 ? (
        <Text
          style={styles.textHighAlert}
          text={`You're staking ${stake.toString()} DAI. That's a big commitment!`}
        />
      ) : undefined}
    </Fragment>
  );
};

const validStake = (stake: number) => {
  return stake > 0;
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
