import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, DropDownPicker } from "../../components";

const ActivitySelector = ({}) => {
  return (
    <View style={styles.activitySelector}>
      <Text text={"Select activity"} style={styles.label} />
      <DropDownPicker/>
    </View>
  );
};

const styles = StyleSheet.create({
  activitySelector: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "flex-start",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  label: { fontSize: 14, textAlign: 'left' },
});

export default ActivitySelector;
