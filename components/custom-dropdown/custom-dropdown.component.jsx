import React from "react";
import { StyleSheet } from "react-native";

import DropDownPicker from "react-native-dropdown-picker";

const items = [
  { label: "Run  🏃‍♂️", value: "Run" },
  { label: "Ride  🚲", value: "Ride" },
];
const Picker = ({}) => {
  return (
    <DropDownPicker
      items={items}
      defaultValue={items[0]}
      placeholder={"Click to select"}
      arrowStyle={styles.arrowStyle}
      containerStyle={styles.containerStyle}
      labelStyle={styles.labelStyle}
      itemStyle={styles.itemStyle}
      globalTextStyle={styles.textStyle}
    />
  );
};

const styles = StyleSheet.create({
  arrowStyle: {
    marginRight: 5,
    marginLeft: 5,
  },
  containerStyle: {
    flex: 1,
    maxHeight: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  itemStyle: {
    justifyContent: "center",
  },
  labelStyle: {
    fontSize: 14,
    textAlign: "left",
    color: "#000",
  },
  textStyle: {
    fontFamily: 'OpenSans_400Regular',    
    fontSize: 15 
  }
});

export default Picker;
