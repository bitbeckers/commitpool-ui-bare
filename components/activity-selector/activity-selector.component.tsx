import React from "react";

import { StyleSheet, View } from "react-native";
import { Text, DropDownPicker } from "..";

interface ActivitySelectorProps {
  text: string
}

const ActivitySelector = ({ text }: ActivitySelectorProps) => {
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