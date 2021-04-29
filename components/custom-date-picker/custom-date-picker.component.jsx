import React, { createElement } from "react";
import { StyleSheet, Platform } from "react-native";
import { useDispatch } from "react-redux";
import { DateTime } from "luxon";
import DateTimePicker from "@react-native-community/datetimepicker";

const CustomDatePicker = ({ dateInput, label, onDateChange }) => {
  const date = dateInput.toJSDate();
  const dispatch = useDispatch();

  const handleDateChange = (date) => {
    const dateInSeconds = date.getTime() / 1000;

    dispatch(onDateChange(dateInSeconds));
  };

  //TODO timing on Date, currentlight 00:00 start of day
  const dateToJSDateTime = (dateFromEvent) => {
    console.log(`Date from event: ${dateFromEvent}`)

    const date = DateTime.fromFormat(dateFromEvent, "yyyy-MM-dd");
    console.log(`Date: ${date}`)
    const datetime = new Date(date);
    
    return datetime;
  };

  return {
    ...Platform.select({
      android: (
        <DateTimePicker
          testID={label}
          value={date}
          mode={"date"}
          is24Hour={true}
          display="default"
          onChange={(e, date) => handleDateChange(date)}
        />
      ),
      ios: (
        <DateTimePicker
          testID={label}
          value={date}
          mode={"date"}
          is24Hour={true}
          display="spinner"
          onChange={(e, date) => handleDateChange(date)}
          style={styles.ios}
        />
      ),
      default: createElement("input", {
        //TODO pretty date picker desktop
        type: "date",
        defaultValue: date,
        onInput: (e) => handleDateChange(dateToJSDateTime(e.target.value)),
      }),
    }),
  };
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
    justifyContent: "center",
    alignItems: "flex-start",
  },
});

export default CustomDatePicker;
