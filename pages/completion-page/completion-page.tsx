import React, { useState } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View } from "react-native";

import { LayoutContainer, Footer, Text, Button } from "../../components";
import { RootState } from "../../redux/store";
import { RootStackParamList } from "..";
import { StackNavigationProp } from "@react-navigation/stack";

type CompletionPageNavigationProps = StackNavigationProp<
  RootStackParamList,
  "Completion"
>;

type CompletionPageProps = {
  navigation: CompletionPageNavigationProps;
};

const CompletionPage = ({ navigation }: CompletionPageProps) => {
  const commitment: Commitment = useSelector(
    (state: RootState) => state.commitment
  );

  return (
    <LayoutContainer>
      <View style={styles.completionPage}>
        {commitment.complete ? (
          <Text text={"Congrats!"} />
        ) : (
          <Text text={"Try again.."} />
        )}
      </View>
      <Footer>
        <Button text={"Back"} onPress={() => navigation.goBack()} />
        <Button
          text={"Restart"}
          onPress={() => navigation.navigate("ActivityGoal")}
        />
      </Footer>
    </LayoutContainer>
  );
};

const styles = StyleSheet.create({
  completionPage: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

export default CompletionPage;
