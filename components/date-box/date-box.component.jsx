import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { Platform } from "react-native";
import { StyleSheet, View } from "react-native";

import { DatePicker, Text, Button } from "../../components";

import { DateTime } from 'luxon';


const DateBox = ({ dateInput, text, onDateChange }) => {
  const [isPickerShow, setIsPickerShow] = useState(false);
  const date = DateTime.fromSeconds(dateInput)

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
          dateInput={date}
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
