import React, { useState, useEffect } from "react";
import { RootState, useAppDispatch } from "../../redux/store";
import {
  updateDistance,
  updateUnit,
} from "../../redux/commitment/commitmentSlice";

import { StyleSheet, View, TextInput } from "react-native";
import { Text, ValueToggle } from "..";
import { useSelector } from "react-redux";

interface DistanceSelector {
  text: string;
}

const DistanceSelector = ({ text }: DistanceSelector) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const distance: number = useSelector(
    (state: RootState) => state.commitment.distance
  );

  const dispatch = useAppDispatch();

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };
  const toggleOptions: string[] = ["km", "mi"];

  useEffect(() => {
    isEnabled ? dispatch(updateUnit("mi")) : dispatch(updateUnit("km"));
  }, [isEnabled]);

  const checkAndUpdateDistance = (value: string) => {
    const number = Number(value);
    if (number > 0) {
      dispatch(updateDistance(Number(value)));
    } else {
      dispatch(updateDistance(null));
    }
  };

  return (
    <View style={styles.distanceSelector}>
      <Text text={text} />
      <TextInput
        defaultValue={distance.toString()}
        keyboardType={"number-pad"}
        style={styles.textInput}
        onChangeText={(value) => checkAndUpdateDistance(value)}
      />
      <Text text="miles" />
      {/* <ValueToggle toggleOptions={toggleOptions} onToggle={toggleSwitch} /> */}
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
