import React, { Fragment, useEffect, useState } from "react";

import { Platform } from "react-native";
import { StyleSheet, View, TextInput } from "react-native";

import { Text, Button } from "..";

import { DateTime } from "luxon";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";

import {
  updateStartDate,
  updateEndDate,
} from "../../redux/commitment/commitmentSlice";

interface DateFromTo {
  children?: React.ReactNode;
}

const DateFromTo = ({ children }: DateFromTo) => {
  const [startIn, setStartIn] = useState("0");
  const [endIn, setEndIn] = useState("7");
 
  const startDate: any = useSelector(
    (state: RootState) => state.commitment.startDate
  );
  const endDate: number = useSelector(
    (state: RootState) => state.commitment.endDate
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const updateDates = () => {
      const startDay = calculateStartDay(startIn);
      const endDay = calculateEndDay(endIn);
      dispatch(updateStartDate(startDay));
      dispatch(updateEndDate(endDay))
    }

    updateDates()
  }, [startIn, endIn])

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
      return startDate;
    }
  };

  const calculateEndDay = (input: string) => {
    const numericInput: number = Number(input);
    if (numericInput === 0) {
      return DateTime.fromSeconds(startDate)
        .set({ hour: 23, minute: 59 })
        .toSeconds();
    } else if (numericInput > 0) {
      return DateTime.fromSeconds(startDate)
        .plus({ days: numericInput })
        .set({ hour: 23, minute: 59 })
        .toSeconds();
    } else {
      return endDate;
    }
  };

  return (
    <Fragment>
      <View style={styles.dateInput}>
        <Text text={"Starting in"}/>
        <TextInput
          defaultValue={startIn}
          keyboardType={"number-pad"}
          style={styles.textInput}
          onChangeText={(value) => setStartIn(value)
          }
        />
        <Text text={"days for"} />
        <TextInput
          defaultValue={endIn}
          keyboardType={"number-pad"}
          style={styles.textInput}
          onChangeText={(value) => setEndIn(value)
          }
        />
        <Text text={"days"}/>
      </View>
      <View>
        <Text
          text={`From ${parseToString(startDate)} to ${parseToString(endDate)}`}
          style={styles.dateView}
        />
      </View>
    </Fragment>
  );
};

const parseToString = (dateInSeconds: number) => {
  return DateTime.fromSeconds(dateInSeconds).toLocaleString();
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
