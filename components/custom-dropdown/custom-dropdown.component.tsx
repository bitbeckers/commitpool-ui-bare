import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import DropDownPicker from "react-native-dropdown-picker";

interface Picker {
  itemsToSelect: [];
  onSelect: any;
  children?: React.ReactNode;
}

const Picker = ({ itemsToSelect, onSelect, children }: Picker) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log("Formatting activities")
    const formattedActivities = itemsToSelect.map((act: Activity) => {
      console.log("formatting ", act)
      if (act.name === "Run") {
        return {
          label: "Run 🏃‍♂️",
          value: act.key,
        };
      } else if (act.name === "Ride") {
        return {
          label: "Ride 🚲",
          value: act.key,
        };
      } else {
        return {
          label: act.name,
          value: act.key,
        };
      }
    });
    setItems(formattedActivities);
  }, [itemsToSelect]);

  console.log(items)
  return (
    <View style={styles.container}>
      <DropDownPicker
        items={items}
        defaultValue={"Loading"}
        placeholder={"Click to select"}
        arrowStyle={styles.arrowStyle}
        containerStyle={styles.containerStyle}
        labelStyle={styles.labelStyle}
        itemStyle={styles.itemStyle}
        globalTextStyle={styles.textStyle}
        onChangeItem={(item) => onSelect(item.value)}
      />
      {children}
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
