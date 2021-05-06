import React, { useState } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View } from "react-native";
import { DateTime } from "luxon";

import {
  LayoutContainer,
  Footer,
  Text,
  Button,
  ProgressBar,
  DialogPopUp
} from "../../components";
import { RootState } from "../../redux/store";
import { RootStackParamList } from "..";
import { StackNavigationProp } from "@react-navigation/stack";

type ConfirmationPageNavigationProps = StackNavigationProp<
  RootStackParamList,
  'Confirmation'
>;

type ConfirmationPageProps = {
  navigation: ConfirmationPageNavigationProps;
};

const ConfirmationPage = ({ navigation }: ConfirmationPageProps) => {
  const [popUpVisible, setPopUpVisible] = useState<boolean>(false);
  const commitment: Commitment = useSelector((state: RootState) => state.commitment);

  return (
    <LayoutContainer>
      <DialogPopUp
        visible={popUpVisible}
        onTouchOutside={() => setPopUpVisible(false)}
        text={"Something is wrong with your commitment, please check values"}
      />
      <ProgressBar size={4 / 6} />
      <View style={styles.commitment}>
        <Text text={"You set up the following commitment:"} />
        <View style={styles.commitmentValues}>
          <Text text={`Activity ${commitment.activity}`} />
          <Text text={`Distance ${commitment.distance} ${commitment.unit}`} />
          <Text
            text={`Starting date ${DateTime.fromSeconds(
              commitment.startDate
            ).toFormat("yyyy MMMM dd")}`}
          />
          <Text
            text={`End date ${DateTime.fromSeconds(commitment.endDate).toFormat(
              "yyyy MMMM dd"
            )}`}
          />
        </View>
        <View style={styles.commitmentValues}>
          <Text text={"And are staking the following amount:"} />

          <Text text={`${commitment.stake} DAI`} />
        </View>
      </View>
      <Footer>
        <Button text={"Back"} onPress={() => navigation.goBack()} />
        <Button
          text={"Continue"}
          onPress={() =>
            validCommitment(commitment)
              ? navigation.navigate("Track")
              : setPopUpVisible(true)
          }
        />
      </Footer>
    </LayoutContainer>
  );
};

const validCommitment = (commitment: Commitment) => {
  const nowInSeconds = new Date().getTime() / 1000;

  return (
    commitment.activity !== "" &&
    commitment.distance > 0  &&
    commitment.endDate > commitment.startDate &&
    commitment.endDate > nowInSeconds &&
    commitment.stake > 0 &&
    commitment.progress === 0 && 
    commitment.complete === false
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
    alignItems: "center"
  },
});

export default ConfirmationPage;