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
import { updateActivitySet } from "../../redux/commitpool/commitpoolSlice";
import { validActivityParameters } from "../../utils/commitment";

import { RootStackParamList } from "..";
import useCommitment from "../../hooks/useCommitment";
import useActivities from "../../hooks/useActivities";

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

  const {commitment} = useCommitment();

  const {activities} = useActivities();

  const activitySet: boolean = useSelector(
    (state: RootState) => state.commitpool.activitySet
  );

  useEffect(() => {
    if(activities.length > 0) {
      if (validActivityParameters(commitment, activities)) {
        dispatch(updateActivitySet(true));
      } else if (!validActivityParameters(commitment, activities)) {
        dispatch(updateActivitySet(false));
      }
    }
  }, [commitment, activities]);

  return (
    <LayoutContainer>
      <DialogPopUp
        visible={alertVisible}
        onTouchOutside={() => setAlertVisible(false)}
        text={strings.activityGoal.alert}
      />
      <ProgressBar size={1} />
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
            activitySet ? navigation.navigate("Staking") : setAlertVisible(true)
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
