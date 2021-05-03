import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View } from "react-native";
import { DateTime } from "luxon";

import {
  LayoutContainer,
  Footer,
  Text,
  Button,
  ProgressBar,
} from "../../components";

const ConfirmationPage = ({ navigation }) => {
  const commitment = useSelector((state) => state.commitment);

  //TODO Modal for invalid commitment
  return (
    <LayoutContainer>
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
          />{" "}
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
              ? navigation.navigate("Confirm")
              : setPopUpVisible(true)
          }
        />
      </Footer>
    </LayoutContainer>
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
