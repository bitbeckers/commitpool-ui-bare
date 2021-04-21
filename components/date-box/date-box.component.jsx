import React, { useState } from "react";
import { Platform } from "react-native";
import { StyleSheet, View } from "react-native";

import { DatePicker, Text, Button } from "../../components";

const DateBox = ({ dateInput, text }) => {
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(undefined);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setDate(currentDate);

    if (Platform.OS === "android") {
      setIsPickerShow(false);
    }
  };

  return (
    <View style={styles.dateBox}>
      <Text text={text} />
      <Button
        text={dateInput.toLocaleString().split(",")[0]}
        onPress={() => setIsPickerShow(!isPickerShow)}
      />
      {isPickerShow && (
        <DatePicker
          dateInput={dateInput}
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dateBox: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "flex-start",
    justifyContent: "center",
  },
});

export default DateBox;
