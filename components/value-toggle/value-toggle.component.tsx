import React, { useState } from "react";

import { StyleSheet, View, Switch } from "react-native";
import { Text } from "..";

interface ValueToggle {
  toggleOptions: string[],
  onToggle: () => void,
};

const ValueToggle = ({ toggleOptions, onToggle }: ValueToggle) => {
  const [isEnabled, setIsEnabled] = useState(true);

  const toggleSwitch = () => {
    onToggle();
    setIsEnabled((previousState) => !previousState);
  };

  return (
    <View style={styles.toggleRow}>
      <Text text={toggleOptions[0]} />
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <Text text={toggleOptions[1]} />
    </View>
  );
};

const styles = StyleSheet.create({
  toggleRow: {
    flex: 1,
    flexDirection: "row",
  },
});

export default ValueToggle;
