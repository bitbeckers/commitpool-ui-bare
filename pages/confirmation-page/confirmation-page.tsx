import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View, Image } from "react-native";

import {
  LayoutContainer,
  Footer,
  Text,
  Button,
  ProgressBar,
  DialogPopUp,
  CommitmentOverview,
} from "../../components";
import { RootState } from "../../redux/store";
import { RootStackParamList } from "..";
import { StackNavigationProp } from "@react-navigation/stack";

import strings from "../../resources/strings";
import getEnvVars from "../../environment";
const { spcAddress } = getEnvVars();

import { ethers, utils } from "ethers";
type ConfirmationPageNavigationProps = StackNavigationProp<
  RootStackParamList,
  "Confirmation"
>;

type ConfirmationPageProps = {
  navigation: ConfirmationPageNavigationProps;
};

const ConfirmationPage = ({ navigation }: ConfirmationPageProps) => {
  const [popUpVisible, setPopUpVisible] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [txSent, setTxSent] = useState<boolean>(false);
  const commitment: Commitment = useSelector(
    (state: RootState) => state.commitpool.commitment
  );
  const athlete: Athlete = useSelector(
    (state: RootState) => state.strava.athlete
  );

  const provider = useSelector((state: RootState) => state.web3.provider);
  const account = useSelector((state: RootState) => state.web3.account);
  let { dai, singlePlayerCommit } = useSelector(
    (state: RootState) => state.web3.contracts
  );

  let _dai = dai.connect(provider.getSigner());
  let _singlePlayerCommit = singlePlayerCommit.connect(provider.getSigner());
  console.log("Connected SPC contract: ", _singlePlayerCommit);

  const validCommitment = (commitment: Commitment) => {
    const nowInSeconds = new Date().getTime() / 1000;

    return (
      commitment.activityKey !== "" &&
      commitment.goalValue > 0 &&
      commitment.endTime > commitment.startTime &&
      commitment.endTime > nowInSeconds &&
      commitment.stake > 0 &&
      commitment.reportedValue === 0 &&
      commitment.met === false
    );
  };

  const createCommitment = async () => {
    let tx;
    if (validCommitment(commitment)) {
      const distanceInMiles: number = Math.floor(commitment.goalValue);
      const startTimestamp: number = Math.ceil(commitment.startTime);
      const endTimestamp: number = Math.ceil(commitment.endTime);
      const stakeAmount = utils.parseEther(commitment.stake.toString());
      setLoading(true);
      console.log("Stake amount: ", stakeAmount);

      const allowance = await dai.allowance(
        account,
        _singlePlayerCommit.address
      );

      if (allowance.gte(stakeAmount)) {
        tx = await _singlePlayerCommit.depositAndCommit(
          commitment.activityKey,
          distanceInMiles,
          startTimestamp,
          endTimestamp,
          stakeAmount,
          stakeAmount,
          String(athlete.id),
          { gasLimit: 5000000 }
        );
      } else {
        await _dai.approve(_singlePlayerCommit.address, stakeAmount);
        tx = await _singlePlayerCommit.depositAndCommit(
          commitment.activityKey,
          distanceInMiles,
          startTimestamp,
          endTimestamp,
          stakeAmount,
          stakeAmount,
          String(athlete.id),
          { gasLimit: 5000000 }
        );
      }

      setLoading(false);
      setTxSent(true);
      navigation.navigate("Track");
    } else {
      setPopUpVisible(true);
    }
  };

  return (
    <LayoutContainer>
      <DialogPopUp
        visible={popUpVisible}
        onTouchOutside={() => setPopUpVisible(false)}
        text={strings.confirmation.alert}
      />
      <ProgressBar size={4 / 6} />
      <Fragment>
        <Text
          text={`${strings.activitySource.loggedIn.text} ${athlete?.firstname}`}
        />
        <Image
          style={styles.tinyAvatar}
          source={{ uri: athlete?.profile_medium }}
        />
      </Fragment>
      <View style={styles.commitmentOverview}>
        <CommitmentOverview editing={editMode} />
        {editMode ? (
          <Button
            text="Set"
            onPress={() => {
              setEditMode(false);
            }}
          />
        ) : (
          <Button
            text="Edit"
            onPress={() => {
              setEditMode(true);
            }}
          />
        )}
      </View>
      <Footer>
        <Button
          text={strings.footer.back}
          onPress={() => navigation.goBack()}
        />
        <Button text={"Confirm"} onPress={async () => createCommitment()} />
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
  commitmentOverview: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  tinyAvatar: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  helpButton: {
    width: 50,
    maxWidth: 50,
  },
});

export default ConfirmationPage;
