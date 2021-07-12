import React, { useState } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View } from "react-native";

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
import { useStravaRefresh } from './hooks'
import strings from "../../resources/strings";
import { getActivityName } from "../../utils/commitment";
import { parseSecondTimestampToFullString } from "../../utils/dateTime";

import useActivities from "../../hooks/useActivities";

type TrackPageNavigationProps = StackNavigationProp<
  RootStackParamList,
  "Track"
>;

type TrackPageProps = {
  navigation: TrackPageNavigationProps;
};

const TrackPage = ({ navigation }: TrackPageProps) => {
  useStravaRefresh();
  const [popUpVisible, setPopUpVisible] = useState<boolean>(false);
  const { activities } = useActivities();

  const commitment: Commitment = useSelector(
    (state: RootState) => state.commitpool.commitment
  );


  const athleteId: number = useSelector(
    (state: RootState) => state.strava?.athlete?.id
  );

  const accessToken: string | undefined = useSelector(
    (state: RootState) => state.strava.access_token
  );

  const singlePlayerCommit = useSelector(
    (state: RootState) => state.web3.contracts.singlePlayerCommit
  );

  const account: string | undefined = useSelector(
    (state: RootState) => state.web3?.account
  );

  const provider = useSelector((state: RootState) => state.web3.provider);

  let _singlePlayerCommit = singlePlayerCommit.connect(provider.getSigner());

  const stravaUrl: string = `http://www.strava.com/athletes/${athleteId}`;

  const activityName: string =
    getActivityName(commitment.activityKey, activities) || "";

  listenForActivityDistanceUpdate(_singlePlayerCommit, account, commitment, navigation, setPopUpVisible);

  let progress: number = 0;
  getActivity(commitment, accessToken, activityName).then((total) => {
    console.log(total, commitment.goalValue, (total / commitment.goalValue))
    progress = ((total / commitment.goalValue) * 100) | 0;
  })    

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
            processCommitmentProgress(_singlePlayerCommit, account, commitment)
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
const processCommitmentProgress = async (
  _singlePlayerCommit: any,
  account: string | undefined,
  commitment: Commitment
) => {
  console.log(_singlePlayerCommit, account, commitment.activity?.oracle)
  _singlePlayerCommit.requestActivityDistance(
    account,
    commitment.activity?.oracle,
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
  setPopUpVisible: any
) => {
  _singlePlayerCommit.on(
    "RequestActivityDistanceFulfilled",
    async (id: string, distance: BigNumber, committer: string) => {
      const now = new Date().getTime() / 1000;

      if (committer.toLowerCase() === account?.toLowerCase()) {
        if (now > commitment.endDate) {
          navigation.navigate("Completion")
        } else {
          setPopUpVisible(true)
        } 
      }
    }
  );
}

const getActivity = async (commitment: Commitment, accessToken: any, activityName: string) => {
  return fetch(
    "https://test2.dcl.properties/activities?startTime=" +
      commitment.startTime +
      "&endTime=" +
      commitment.endTime +
      "&type=" +
      "Run" +
      "&accessToken=" +
      accessToken,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer: " + accessToken,
      },
    }
  )
    .then((res) => res.json())
    .then((json) => {
      return json.total;
    });
}

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
