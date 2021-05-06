import React, { useState } from "react";

import { Platform } from "react-native";
import { StyleSheet, View } from "react-native";

import { DatePicker, Text, Button } from "..";

import { DateTime } from 'luxon';

interface DateBox {
  dateInSeconds: number,
  text: string,
  onDateChange: (dateInput: number) => any;
}

const DateBox = ({ dateInSeconds, text, onDateChange }: DateBox) => {
  const [isPickerShow, setIsPickerShow] = useState(false);
  const date: DateTime = DateTime.fromSeconds(dateInSeconds)

  const onChange = () => {
    setIsPickerShow(Platform.OS === 'ios');
  };

  return (
    <View style={styles.dateBox}>
      <Text text={text} style={styles.dateBox}/>
      <Button
        text={date.toLocaleString({ month: 'long', day: 'numeric', year: 'numeric' })}
        onPress={() => setIsPickerShow(true)}
      />
      {isPickerShow && (
        <DatePicker
          dateInSeconds={dateInSeconds}
          onDateChange={onDateChange}
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
    justifyContent: "center",
    alignItems: "center"
  }
});

export default DateBox;
