import React, { Fragment, useEffect, useState } from "react";

import { StyleSheet, View, TextInput } from "react-native";

import { Text } from "..";

import { DateTime } from "luxon";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";

import { updateCommitment } from "../../redux/commitpool/commitpoolSlice";

interface DateFromTo {
  children?: React.ReactNode;
}

const DateFromTo = ({ children }: DateFromTo) => {
  const [startIn, setStartIn] = useState("0");
  const [endIn, setEndIn] = useState("7");

  const commitment: Commitment = useSelector(
    (state: RootState) => state.commitpool.commitment
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const updateDates = () => {
      const startTime = calculateStartDay(startIn);
      const endTime = calculateEndDay(startTime, endIn);
      dispatch(updateCommitment({ startTime, endTime }));
    };

    updateDates();
  }, [startIn, endIn]);

  const calculateStartDay = (input: string) => {
    const numericInput: number = Number(input);
    if (numericInput === 0) {
      return DateTime.now().toSeconds();
    } else if (numericInput > 0) {
      return DateTime.now()
        .plus({ days: numericInput })
        .set({ hour: 0, minute: 0 })
        .toSeconds();
    } else {
      return commitment.startTime;
    }
  };

  const calculateEndDay = (from: number, input: string) => {
    const numericInput: number = Number(input);
    const _startDate = DateTime.fromSeconds(from);
    if (numericInput === 0) {
      return _startDate.set({ hour: 23, minute: 59 }).toSeconds();
    } else if (numericInput > 0) {
      return _startDate
        .plus({ days: numericInput })
        .set({ hour: 23, minute: 59 })
        .toSeconds();
    } else {
      return commitment.endTime;
    }
  };

  return (
    <Fragment>
      <View style={styles.dateInput}>
        <Text text={"Starting in"} />
        <TextInput
          defaultValue={startIn}
          keyboardType={"number-pad"}
          style={styles.textInput}
          onChangeText={(value) => setStartIn(value)}
        />
        <Text text={"days for"} />
        <TextInput
          defaultValue={endIn}
          keyboardType={"number-pad"}
          style={styles.textInput}
          onChangeText={(value) => setEndIn(value)}
        />
        <Text text={"days"} />
      </View>
      <View>
        <Text
          text={`Starts on: ${parseToString(commitment.startTime)} `}
          style={styles.dateView}
        />
        <Text
          text={`Ends on:  ${parseToString(commitment.endTime)}`}
          style={styles.dateView}
        />
      </View>
    </Fragment>
  );
};

const parseToString = (dateInSeconds: number) => {
  return DateTime.fromSeconds(dateInSeconds).toLocaleString({
    weekday: "long",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const styles = StyleSheet.create({
  dateInput: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dateView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    backgroundColor: "white",
    fontSize: 14,
    height: 28,
    width: 75,
    textAlign: "center",
    borderRadius: 20,
  },
});

export default DateFromTo;
