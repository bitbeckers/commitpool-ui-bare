import React, { Fragment, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";

import { LayoutContainer, Footer, Text, Button } from "../../components";
import { RootStackParamList } from "..";
import { StackNavigationProp } from "@react-navigation/stack";

import strings from "../../resources/strings";
import useCommitment from "../../hooks/useCommitment";

type CompletionPageNavigationProps = StackNavigationProp<
  RootStackParamList,
  "Completion"
>;

type CompletionPageProps = {
  navigation: CompletionPageNavigationProps;
};

const CompletionPage = ({ navigation }: CompletionPageProps) => {
  const { commitment, activityName } = useCommitment();
  const [loading, setLoading] = useState<boolean>(true);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (loading) {
      const _success: boolean = commitment.reportedValue >= commitment.goalValue;
      setSuccess(_success);
      setLoading(false);
    }
  }, [commitment]);

  const achievement: string = `You managed to ${activityName} for ${commitment.reportedValue} miles. You committed to ${commitment.goalValue} miles`;

  return (
    <LayoutContainer>
      {loading ? (
        <View style={styles.completionPage}>
          <Text text="Loading" />
        </View>
      ) : (
        <View style={styles.completionPage}>
          {success ? (
            <Fragment>
              <Text text={strings.completion.success} />
              <ConfettiCannon count={100} origin={{ x: 100, y: 0 }} />
            </Fragment>
          ) : (
            <Text text={strings.completion.fail} />
          )}
          <Text text={achievement} />
        </View>
      )}
      <Footer>
        <Button
          text={strings.footer.back}
          onPress={() => navigation.goBack()}
        />
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
  },
});

export default CompletionPage;
