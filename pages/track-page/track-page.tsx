import React, { useState } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View } from "react-native";
import { DateTime } from "luxon";
import { BigNumber } from "ethers";

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
  
  const commitment: Commitment = useSelector(
    (state: RootState) => {
      return state.commitment
    }
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

  const progress: number =
    ((commitment?.progress / commitment?.distance) * 100) | 0;

  listenForActivityDistanceUpdate(_singlePlayerCommit, account, commitment, navigation, setPopUpVisible);

  getActivity(commitment, accessToken);

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
            } ${commitment?.activity?.name.toLowerCase()}`}
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

const getActivity = (commitment: Commitment, accessToken: any) => {
  const total = fetch(
    "https://test2.dcl.properties/activities?startTime=" +
      commitment.startDate +
      "&endTime=" +
      commitment.endDate +
      "&type=" +
      commitment?.activity?.name +
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
      return json.total
    });
  console.log(total)
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
