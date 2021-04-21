import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, DropDownPicker } from "../../components";

const ActivitySelector = ({}) => {
  return (
    <View style={styles.activitySelector}>
      <Text text={"Select activity"} style={styles.label} />
      <DropDownPicker style={styles.dropDownPicker}/>
    </View>
  );
};

const styles = StyleSheet.create({
  activitySelector: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "flex-start",
    // alignItems: "center",
    justifyContent: "center",
  },
  label: { fontSize: 14, textAlign: 'left', alignSelf: "flex-start" },
  label: { alignSelf: "flex-start" },

});

export default ActivitySelector;
