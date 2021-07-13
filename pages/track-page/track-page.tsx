import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import {
  LayoutContainer,
  Footer,
  Text,
  Button,
  ProgressCircle,
  DialogPopUp,
} from "../../components";
import { RootStackParamList } from "..";
import { StackNavigationProp } from "@react-navigation/stack";
import strings from "../../resources/strings";
import { parseSecondTimestampToFullString } from "../../utils/dateTime";

import useActivities from "../../hooks/useActivities";
import { BigNumber } from "ethers";
import useCommitment from "../../hooks/useCommitment";
import useContracts from "../../hooks/useContracts";
import useWeb3 from "../../hooks/useWeb3";
import useStravaAthlete from "../../hooks/useStravaAthlete";
import useStravaData from "../../hooks/useStravaData";

type TrackPageNavigationProps = StackNavigationProp<
  RootStackParamList,
  "Track"
>;

type TrackPageProps = {
  navigation: TrackPageNavigationProps;
};

//TODO login to strava when auth/refresh-token area persisted in state
const TrackPage = ({ navigation }: TrackPageProps) => {
  // useStravaRefresh();
  const [popUpVisible, setPopUpVisible] = useState<boolean>(false);
  const { activities } = useActivities();
  const { commitment, activityName, refreshCommitment } = useCommitment();
  const { singlePlayerCommit } = useContracts();
  const { account } = useWeb3();
  const { athlete } = useStravaAthlete();
  const { progress } = useStravaData();

  //TODO manage URL smart when 'undefined'
  const stravaUrl: string = `http://www.strava.com/athletes/${athlete?.id}`;

  const oracleAddress: string =
    activities.find((activity) => activity.key === commitment.activityKey)
      ?.oracle || "";

  listenForActivityDistanceUpdate(
    singlePlayerCommit,
    account,
    commitment,
    navigation,
    setPopUpVisible,
    refreshCommitment
  );

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
          <Text text={`${activityName} for ${commitment.goalValue} miles`} />
          <Text
            text={`from ${parseSecondTimestampToFullString(
              commitment.startTime
            )} to ${parseSecondTimestampToFullString(commitment.endTime)}`}
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
        {athlete?.id !== undefined ? (
          <a
            style={{ color: "white", fontFamily: "OpenSans_400Regular" }}
            href={stravaUrl}
            target="_blank"
          >
            Open Strava profile
          </a>
        ) : (
          <Button
            text={"Login to Strava"}
            onPress={() => navigation.navigate("ActivitySource")}
          />
        )}
      </View>

      <Footer>
        <Button text={"Back"} onPress={() => navigation.goBack()} />
        <Button
          text={"Continue"}
          onPress={() =>
            processCommitmentProgress(
              singlePlayerCommit,
              account,
              oracleAddress
            )
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

const processCommitmentProgress = async (
  _singlePlayerCommit: any,
  account: string | undefined,
  oracleAddress: string
) => {
  console.log(_singlePlayerCommit, account, oracleAddress);
  _singlePlayerCommit.requestActivityDistance(
    account,
    oracleAddress,
    //to do - move to env and/or activity state
    "2fdfac54c3574e8e861d4f8c334a4121",
    { gasLimit: 500000 }
  );
};

const listenForActivityDistanceUpdate = (
  _singlePlayerCommit: any,
  account: string | undefined,
  commitment: Commitment,
  navigation: any,
  setPopUpVisible: any,
  refreshCommitment: any
) => {
  _singlePlayerCommit.on(
    "RequestActivityDistanceFulfilled",
    async (id: string, distance: BigNumber, committer: string) => {
      const now = new Date().getTime() / 1000;

      if (committer.toLowerCase() === account?.toLowerCase()) {
        if (now > commitment.endTime) {
          refreshCommitment();
          navigation.navigate("Completion");
        } else {
          setPopUpVisible(true);
        }
      }
    }
  );
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
