import React, { useState } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';

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
import { RootState } from "../../redux/store";

import {RootStackParamList} from '..'

type ActivityGoalPageNavigationProps = StackNavigationProp<
  RootStackParamList,
  'ActivityGoal'
>;

type ActivityGoalPageProps = {
  navigation: ActivityGoalPageNavigationProps;
};

const ActivityGoalPage = ({ navigation }: ActivityGoalPageProps) => {
  const [popUpVisible, setPopUpVisible] = useState<boolean>(false);
  const commitment: Commitment = useSelector((state: RootState) => state.commitment);

  return (
    <LayoutContainer>
      <DialogPopUp
        visible={popUpVisible}
        onTouchOutside={() => setPopUpVisible(false)}
        text={"Ooops! There is something wrong with your commitment :( please check values"}
      />
      <ProgressBar size={1 / 6} />
      <View style={styles.setUp}>
        <Text text={"Set up your commitment"} />
        <ActivitySelector text={"Activity"} />
        <DistanceSelector text={"Distance"} />
        <DateBox
          dateInSeconds={commitment.startDate}
          text={"Start date"}
          onDateChange={updateStartDate}
        />
        <DateBox
          dateInSeconds={commitment.endDate}
          text={"End date"}
          onDateChange={updateEndDate}
        />
      </View>
      <Footer>
        <Button text={"Back"} onPress={() => navigation.goBack()} />
        <Button
          text={"Continue"}
          onPress={() =>
            validActivity(commitment)
              ? navigation.navigate("ActivitySource")
              : setPopUpVisible(true)
          }
        />
      </Footer>
    </LayoutContainer>
  );
};

const validActivity = (commitment: Commitment) => {
  const nowInSeconds = new Date().getTime() / 1000;

  return (
    commitment.activity !== "" &&
    commitment.distance > 0  &&
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
