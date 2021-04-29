import React, { useState } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View, Modal } from "react-native";

import {
  LayoutContainer,
  Footer,
  Text,
  Button,
  ProgressBar,
  ActivitySelector,
  DateBox,
  DistanceSelector,
} from "../../components";

import {
  updateStartDate,
  updateEndDate,
} from "../../redux/commitment/commitmentSlice";
import { setConstantValue } from "typescript";

const ActivityGoalPage = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const commitment = useSelector((state) => state.commitment);

  return (
    <LayoutContainer>
      <ProgressBar size={1 / 6} />
      <View style={styles.setUp}>
      {/* {modalVisible ? < Modal /> : <View />} */}
        <Text text={"Set up your commitment"} />
        <ActivitySelector text={"Activity"} />
        <DistanceSelector text={"Distance"} />
        <DateBox
          dateInput={commitment.startDate}
          text={"Start date"}
          onDateChange={updateStartDate}
        />
        <DateBox
          dateInput={commitment.endDate}
          text={"End date"}
          onDateChange={updateEndDate}
        />
      </View>
      <Footer>
        <Button text={"Back"} onPress={() => navigation.goBack()} />
        <Button
          text={"Continue"}
          onPress={() =>
            validCommitment(commitment)
              ? navigation.navigate("ActivitySource")
              : setModalVisible(true)
          }
        />
      </Footer>
    </LayoutContainer>
  );
};

const validCommitment = (commitment) => {
  const nowInSeconds = new Date().getTime() / 1000;

  return commitment.activity !== "" &&
    commitment.distance > 0 &&
    commitment.endDate > commitment.startDate &&
    commitment.endDate > nowInSeconds;
};

const styles = StyleSheet.create({
  setUp: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

export default ActivityGoalPage;
