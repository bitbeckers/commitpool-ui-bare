import React, { Fragment, useState } from "react";
import { StyleSheet, Platform } from "react-native";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { DateTime } from "luxon";

import {
  LayoutContainer,
  Footer,
  Text,
  Button,
  ProgressBar,
  DialogPopUp,
} from "../../components";

import strings from "../../resources/strings";

interface CommitmentOverviewProps {
  editing: boolean;
}

const CommitmentOverview = ({ editing }: CommitmentOverviewProps) => {
  const commitment: Commitment = useSelector(
    (state: RootState) => state.commitment
  );

  return (
    <View style={styles.commitment}>
      {editing ? (
        <Fragment>
          <Text text="EDITING" />
        </Fragment>
      ) : (
        <Fragment>
          <Text text={strings.confirmation.commitment.text} />
          <View style={styles.commitmentValues}>
            <Text
              text={`${
                strings.confirmation.commitment.activity
              } ${commitment?.activity?.name.toLowerCase()}`}
            />
            <Text
              text={`${strings.confirmation.commitment.distance} ${commitment.distance} ${commitment.unit}`}
            />
            <Text
              text={`${
                strings.confirmation.commitment.startDate
              } ${DateTime.fromSeconds(commitment.startDate).toFormat(
                "yyyy MMMM dd"
              )}`}
            />
            <Text
              text={`${
                strings.confirmation.commitment.endDate
              } ${DateTime.fromSeconds(commitment.endDate).toFormat(
                "yyyy MMMM dd"
              )}`}
            />
          </View>
          <View style={styles.commitmentValues}>
            <Text text={strings.confirmation.commitment.stake} />

            <Text text={`${commitment.stake} DAI`} />
          </View>
        </Fragment>
      )}
    </View>
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
});

export default CommitmentOverview;
