import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import {
  LayoutContainer,
  Footer,
  Text,
  Button,
  ProgressBar,
  ActivitySelector,
  DateFromTo,
  DistanceSelector,
  DialogPopUp,
} from "../../components";

import strings from "../../resources/strings";
import { RootState, useAppDispatch } from "../../redux/store";
import {
  updateActivitySet,
} from "../../redux/commitment/commitmentSlice";

import { RootStackParamList } from "..";

type ActivityGoalPageNavigationProps = StackNavigationProp<
  RootStackParamList,
  "ActivityGoal"
>;

type ActivityGoalPageProps = {
  navigation: ActivityGoalPageNavigationProps;
};

const ActivityGoalPage = ({ navigation }: ActivityGoalPageProps) => {
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const commitment: Commitment = useSelector(
    (state: RootState) => state.commitment
  );

  useEffect(() => {
    if (validActivity(commitment) && !commitment.activitySet) {
      dispatch(updateActivitySet(true));
    }
  }, [commitment]);

  return (
    <LayoutContainer>
      <DialogPopUp
        visible={alertVisible}
        onTouchOutside={() => setAlertVisible(false)}
        text={strings.activityGoal.alert}
      />
      <ProgressBar size={1 / 6} />
      <View style={styles.setUp}>
        <Text text={strings.activityGoal.setUp.text} />
        <ActivitySelector text={strings.activityGoal.setUp.activitySelector} />
        <DistanceSelector text={strings.activityGoal.setUp.distanceSelector} />
        <DateFromTo />
      </View>
      <Footer>
        <Button
          text={strings.footer.back}
          onPress={() => navigation.goBack()}
        />
        <Button
          text={strings.footer.next}
          onPress={() =>
            commitment.activitySet
              ? navigation.navigate("Staking")
              : setAlertVisible(true)
          }
        />
        <Button
          text={strings.footer.help}
          onPress={() => navigation.navigate("Faq")}
          style={styles.helpButton}
        />
      </Footer>
    </LayoutContainer>
  );
};

const validActivity = (commitment: Commitment) => {
  const nowInSeconds = new Date().getTime() / 1000;

  return (
    commitment?.activity &&
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
  helpButton: {
    width: 50,
    maxWidth: 50,
  },
});

export default ActivityGoalPage;
