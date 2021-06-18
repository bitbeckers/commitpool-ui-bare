import React, { useState } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View } from "react-native";
import { DateTime } from "luxon";

import {
  LayoutContainer,
  Footer,
  Text,
  Button,
  ProgressCircle,
  DialogPopUp,
} from "../../components";
import { RootState } from "../../redux/store";
import { RootStackParamList } from "..";
import { StackNavigationProp } from "@react-navigation/stack";
import strings from "../../resources/strings";

type TrackPageNavigationProps = StackNavigationProp<
  RootStackParamList,
  "Track"
>;

type TrackPageProps = {
  navigation: TrackPageNavigationProps;
};

const TrackPage = ({ navigation }: TrackPageProps) => {
  const [popUpVisible, setPopUpVisible] = useState<boolean>(false);
  const commitment: Commitment = useSelector(
    (state: RootState) => state.commitment
  );

  const progress: number =
    ((commitment?.progress / commitment?.distance) * 100) | 0;

  return (
    <LayoutContainer>
      <DialogPopUp
        visible={popUpVisible}
        onTouchOutside={() => setPopUpVisible(false)}
        text={strings.track.alert}
      />
      <View style={styles.commitment}>
        <Text text={strings.track.tracking.text} />
        <View style={styles.commitmentValues}>
          <Text
            text={`${
              strings.track.tracking.activity
            } ${commitment.activityKey.toLowerCase()}`}
          />
          <Text
            text={`${strings.track.tracking.distance} ${commitment.distance} ${commitment.unit}`}
          />
          <Text
            text={`${strings.track.tracking.startDate} ${DateTime.fromSeconds(
              commitment.startDate
            ).toFormat("yyyy MMMM dd")}`}
          />
          <Text
            text={`${strings.track.tracking.endDate}  ${DateTime.fromSeconds(
              commitment.endDate
            ).toFormat("yyyy MMMM dd")}`}
          />
        </View>
        <View style={styles.commitmentValues}>
          <Text text={strings.track.tracking.stake} />

          <Text text={`${commitment.stake} DAI`} />
        </View>
      </View>
      <ProgressCircle progress={progress} />

      <Footer>
        <Button text={"Back"} onPress={() => navigation.goBack()} />
        <Button
          text={"Continue"}
          onPress={() =>
            processCommitmentProgress(commitment)
              ? navigation.navigate("Completion")
              : setPopUpVisible(true)
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

//TODO implement logic to compare against actual Strava data and timebox
const processCommitmentProgress = (commitment: Commitment) => {
  return true;
};

const styles = StyleSheet.create({
  commitment: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  commitmentValues: {
    flex: 1,
    marginTop: 20,
    alignContent: "flex-start",
    alignItems: "center",
  },
  helpButton: {
    width: 50,
    maxWidth: 50,
  },
});

export default TrackPage;
