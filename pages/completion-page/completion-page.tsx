import React, { useState } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View } from "react-native";

import { LayoutContainer, Footer, Text, Button } from "../../components";
import { RootState } from "../../redux/store";
import { RootStackParamList } from "..";
import { StackNavigationProp } from "@react-navigation/stack";

import strings from "../../resources/strings"

type CompletionPageNavigationProps = StackNavigationProp<
  RootStackParamList,
  "Completion"
>;

type CompletionPageProps = {
  navigation: CompletionPageNavigationProps;
};

const CompletionPage = ({ navigation }: CompletionPageProps) => {
  const commitment: Commitment = useSelector(
    (state: RootState) => state.commitpool.commitment
  );

  return (
    <LayoutContainer>
      <View style={styles.completionPage}>
        {commitment.met ? (
          <Text text={strings.completion.success} />
        ) : (
          <Text text={strings.completion.fail} />
        )}
      </View>
      <Footer>
        <Button text={strings.footer.back} onPress={() => navigation.goBack()} />
        <Button
          text={strings.footer.restart}
          onPress={() => navigation.navigate("ActivityGoal")}
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

const styles = StyleSheet.create({
  completionPage: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  helpButton: {
    width: 50,
    maxWidth: 50,
  }
});

export default CompletionPage;
