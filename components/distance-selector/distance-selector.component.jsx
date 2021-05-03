import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateDistance,
  updateUnit,
} from "../../redux/commitment/commitmentSlice";

import { StyleSheet, View, TextInput } from "react-native";
import { Text, ValueToggle } from "..";

const DistanceSelector = ({ text }) => {
  const [isEnabled, setIsEnabled] = useState(true);

  const dispatch = useDispatch();

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };
  const toggleOptions = ["km", "mi"];

  useEffect(() => {
    isEnabled ? dispatch(updateUnit("mi")) : dispatch(updateUnit("km"));
  }, [isEnabled]);

  //TODO export switch and labels to toggle component
  return (
    <View style={styles.distanceSelector}>
      <Text text={text} />
      <TextInput
        keyboardType={"number-pad"}
        style={styles.textInput}
        onChangeText={(value) => dispatch(updateDistance(value))}
      />
      <ValueToggle toggleOptions={toggleOptions} onToggle={toggleSwitch} />
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
