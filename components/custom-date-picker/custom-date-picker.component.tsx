import React, { createElement } from "react";
import { StyleSheet, Platform } from "react-native";
import { useAppDispatch } from "../../redux/store";
import { DateTime } from "luxon";
import DateTimePicker, { AndroidEvent } from "@react-native-community/datetimepicker";

//TODO refactor any type away
interface CustomDatePicker {
  dateInSeconds: number;
  onDateChange: (dateInSeconds: number) => any;
};

const CustomDatePicker = ({
  dateInSeconds,
  onDateChange,
}: CustomDatePicker) => {

  const date: Date = new Date(dateInSeconds * 1000);
  const dispatch = useAppDispatch();

  const handleDateChange = (date: Date) => {
    const dateInSeconds: number = date.getTime() / 1000;

    dispatch(onDateChange(dateInSeconds));
  };

  //TODO timing on Date, currentlight 00:00 start of day
  const dateToJSDateTime = (dateFromEvent: string) => {
    console.log(`Date from event: ${dateFromEvent}`);

    const date: Date = DateTime.fromFormat(dateFromEvent, "yyyy-MM-dd").toJSDate();
    console.log(`Date: ${date}`);

    return date;
  };

  return {
    ...Platform.select({
      android: (
        <DateTimePicker
          // testID={label}
          value={date}
          mode={"date"}
          is24Hour={true}
          display="default"
          onChange={(e: Event, date?: Date) => handleDateChange(date)}
        />
      ),
      ios: (
        <DateTimePicker
          // testID={label}
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
        onInput: (e: Event) => { console.log("Event ", e.target);handleDateChange(dateToJSDateTime(e.target.value))},
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
