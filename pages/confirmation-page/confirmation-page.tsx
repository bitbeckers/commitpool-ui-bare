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

import {
  validCommitmentRequest,
  getCommitmentRequestParameters,
} from "../../utils/commitment";
import useCommitment from "../../hooks/useCommitment";
import useActivities from "../../hooks/useActivities";
import useContracts from "../../hooks/useContracts";
import useWeb3 from "../../hooks/useWeb3";
import useStravaAthlete from "../../hooks/useStravaAthlete";

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

  const { commitment } = useCommitment();
  const { activities } = useActivities();


  const {athlete} = useStravaAthlete();

  const { account, provider } = useWeb3();
  const { dai, singlePlayerCommit } = useContracts();

  console.log("Connected SPC contract: ", singlePlayerCommit);

  const createCommitment = async () => {
    let tx;
    if (validCommitmentRequest(commitment, activities)) {
      setLoading(true);

      const allowance = await dai.allowance(
        account,
        singlePlayerCommit.address
      );

      const _commitmentParameters = getCommitmentRequestParameters(commitment);
      const _commitmentParametersWithUserId = {
        ..._commitmentParameters,
        _userId: String(athlete.id),
      };

      console.log(
        "Commitment request with user ID: ",
        _commitmentParametersWithUserId
      );

      if (allowance.gte(_commitmentParameters._stake)) {
        tx = await singlePlayerCommit.depositAndCommit(
          _commitmentParametersWithUserId._activityKey,
          _commitmentParametersWithUserId._goalValue,
          _commitmentParametersWithUserId._startTime,
          _commitmentParametersWithUserId._endTime,
          _commitmentParametersWithUserId._stake,
          _commitmentParametersWithUserId._depositAmount,
          _commitmentParametersWithUserId._userId,
          { gasLimit: 5000000 }
        );
      } else {
        await dai.approve(
          singlePlayerCommit.address,
          _commitmentParametersWithUserId._stake
        );
        tx = await singlePlayerCommit.depositAndCommit(
          _commitmentParametersWithUserId._activityKey,
          _commitmentParametersWithUserId._goalValue,
          _commitmentParametersWithUserId._startTime,
          _commitmentParametersWithUserId._endTime,
          _commitmentParametersWithUserId._stake,
          _commitmentParametersWithUserId._depositAmount,
          _commitmentParametersWithUserId._userId,
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
