import React from "react";

import { StyleSheet, View } from "react-native";
import { Text, DropDownPicker } from "../../components";

const ActivitySelector = ({ text }) => {
  return (
    <View style={styles.activitySelector}>
      <Text text={text} />
      <DropDownPicker />
    </View>
  );
};

const styles = StyleSheet.create({
  activitySelector: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
});

export default ActivitySelector