import React, {useState, useEffect} from "react";
import { StyleSheet, View } from "react-native";
import {
  LayoutContainer,
  Footer,
  Text,
  Button,
  ProgressBar,
  ActivitySelector,
  DateBox
} from "../../components";

const ActivityGoalPage = ({ navigation }) => {
  const date = new Date();
  const [activity, setActivity] = useState("");
  const [distance, setDistance] = useState(0);
  const [metric, setMetric] = useState("");
  const [startDate, setStartDate] = useState(date);
  const [endDate, setEndDate] = useState(date);

  return (
    <LayoutContainer>
      <ProgressBar size={1 / 6} />
      <View style={styles.setUp}>
        <Text text={"Set up your commitment"} />
        <ActivitySelector />
        <DateBox dateInput={startDate} text={"Select start date"}/>
        <DateBox dateInput={endDate} text={"Select end date"}/>
      </View>
      <Footer>
        <Button text={"Back"} onPress={() => navigation.goBack()} />
        <Button
          text={"Continue"}
          onPress={() => navigation.navigate("ActivitySource")}
        />
      </Footer>
    </LayoutContainer>
  );
};

const styles = StyleSheet.create({
  setUp: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ActivityGoalPage;
