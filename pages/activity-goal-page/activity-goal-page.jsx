import React, { useState } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View } from "react-native";

import {
  LayoutContainer,
  Footer,
  Text,
  Button,
  ProgressBar,
  ActivitySelector,
  DateBox,
  DistanceSelector,
  DialogPopUp,
} from "../../components";

import {
  updateStartDate,
  updateEndDate,
} from "../../redux/commitment/commitmentSlice";

const ActivityGoalPage = ({ navigation }) => {
  const [popUpVisible, setPopUpVisible] = useState(false);
  const commitment = useSelector((state) => state.commitment);

  //TODO Modal for invalid commitment
  return (
    <LayoutContainer>
      <DialogPopUp
        visible={popUpVisible}
        onTouchOutside={() => setPopUpVisible(false)}
        text={"Commitment not complete, please check values"}
      />
      <ProgressBar size={1 / 6} />
      <View style={styles.setUp}>
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
              : setPopUpVisible(true)
          }
        />
      </Footer>
    </LayoutContainer>
  );
};

const validCommitment = (commitment) => {
  const nowInSeconds = new Date().getTime() / 1000;

  return (
    commitment.activity !== "" &&
    commitment.distance > 0 &&
    commitment.endDate > commitment.startDate &&
    commitment.endDate > nowInSeconds
  );
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
