import React from "react";
import { useAppDispatch } from "../../redux/store";
import { updateCommitment } from "../../redux/commitpool/commitpoolSlice";

import { StyleSheet, View, TextInput } from "react-native";
import { Text } from "..";
import useCommitment from "../../hooks/useCommitment";

interface DistanceSelector {
  text: string;
}

const DistanceSelector = ({ text }: DistanceSelector) => {
  const { commitment } = useCommitment();
  const { goalValue }: { goalValue: number} = commitment

  const dispatch = useAppDispatch();

  const onDistanceInput = (value: string) => {
    const distance: number = Number.parseFloat(value);
    if (!isNaN(distance) && distance > 0) {
      dispatch(updateCommitment({ goalValue: distance }));
    }
  };

  return (
    <View style={styles.distanceSelector}>
      <Text text={text} />
      <TextInput
        defaultValue={goalValue.toString()}
        keyboardType={"number-pad"}
        style={styles.textInput}
        onChangeText={(value) => onDistanceInput(value)}
      />
      <Text text="miles" />
    </View>
  );
};

const styles = StyleSheet.create({
  distanceSelector: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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

export default DistanceSelector;
