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

import strings from "../../resources/strings";

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
        text={strings.activityGoal.alert}
      />
      <ProgressBar size={1 / 6} />
      <View style={styles.setUp}>
        <Text text={strings.activityGoal.setUp.text} />
        <ActivitySelector text={strings.activityGoal.setUp.activitySelector} />
        <DistanceSelector text={strings.activityGoal.setUp.distanceSelector} />
        <DateBox
          dateInSeconds={commitment.startDate}
          text={strings.activityGoal.setUp.startDate}
          onDateChange={updateStartDate}
        />
        <DateBox
          dateInSeconds={commitment.endDate}
          text={strings.activityGoal.setUp.endDate}
          onDateChange={updateEndDate}
        />
      </View>
      <Footer>
        <Button text={strings.footer.back} onPress={() => navigation.goBack()} />
        <Button
          text={strings.footer.next}
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
