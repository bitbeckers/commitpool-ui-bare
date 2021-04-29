import React from "react";
import { useDispatch } from 'react-redux'
import { StyleSheet, View} from "react-native";

import DropDownPicker from "react-native-dropdown-picker";
import { updateActivity } from "../../redux/commitment/commitmentSlice";

const items = [
  { label: "Run  🏃‍♂️", value: "Run" },
  { label: "Ride  🚲", value: "Ride" },
];
const Picker = () => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
    <DropDownPicker
      items={items}
      defaultValue={items[0]}
      placeholder={"Click to select"}
      arrowStyle={styles.arrowStyle}
      containerStyle={styles.containerStyle}
      labelStyle={styles.labelStyle}
      itemStyle={styles.itemStyle}
      globalTextStyle={styles.textStyle}
      onChangeItem={(item) => dispatch(updateActivity(item.value))}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  arrowStyle: {
    marginRight: 5,
    marginLeft: 5,
  },
  containerStyle: {
    maxHeight: 40,
    minHeight: 50,
    minWidth: 149,
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
    fontFamily: "OpenSans_400Regular",
    fontSize: 15,
  },
});

export default Picker;
