import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View, Linking } from "react-native";
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

  const athleteId: number = useSelector(
    (state: RootState) => state.strava.athlete.id
  );

  const progress: number =
    ((commitment?.progress / commitment?.distance) * 100) | 0;

  const stravaUrl: string = `http://www.strava.com/athletes/${athleteId}`;

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
            text={`${commitment?.activity?.name} for ${commitment.distance} ${commitment.unit}`}
          />
          <Text
            text={`from ${parseToString(
              commitment.startDate
            )} to ${parseToString(commitment.endDate)}`}
          />
        </View>
        <View style={styles.commitmentValues}>
          <Text
            text={`${strings.track.tracking.stake} ${commitment.stake} DAI`}
          />
        </View>
        <View style={styles.commitmentValues}>
          <Text text={`Progression`} />
          <ProgressCircle progress={progress} />
        </View>
        <a
          style={{ color: "white", fontFamily: "OpenSans_400Regular" }}
          href={stravaUrl}
          target="_blank"
        >
          Open Strava profile
        </a>
      </View>

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
