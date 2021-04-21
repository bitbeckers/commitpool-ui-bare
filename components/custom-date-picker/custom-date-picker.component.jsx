import React, { useState, useEffect, createElement } from "react";
import { StyleSheet, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const CustomDatePicker = ({ dateInput, label, onChange }) => {
  const [date, setDate] = useState(dateInput);

  return (
    {...Platform.select({
        android: (
          <DateTimePicker
            testID={label}
            value={date}
            mode={"date"}
            is24Hour={true}
            display='default'
            onChange={onChange}
          />
        ),
        ios: (
          <DateTimePicker
            testID={label}
            value={date}
            mode={"date"}
            is24Hour={true}
            display="spinner"
            onChange={onChange}
            style={styles.ios}
          />
        ),
        default: createElement("input", {
          type: "date",
          defaultValue: date,
          onInput: onChange,
        }),
      })}
  );
};

const styles = StyleSheet.create({
    web: {
        position: "absolute",
        left: 0,
        top: 0,
        width: 100,
        height: 100,
        opacity: 0,
    },
    ios: {
        width: 320,
        height: 260,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
  });

export default CustomDatePicker;
