import React, { Fragment, useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";

import { LayoutContainer, Footer, Text, Button } from "../../components";
import { RootStackParamList } from "..";
import { StackNavigationProp } from "@react-navigation/stack";

import strings from "../../resources/strings";
import useCommitment from "../../hooks/useCommitment";
import useContracts from "../../hooks/useContracts";
import useWeb3 from "../../hooks/useWeb3";
import { Contract } from "ethers";

type CompletionPageNavigationProps = StackNavigationProp<
  RootStackParamList,
  "Completion"
>;

type CompletionPageProps = {
  navigation: CompletionPageNavigationProps;
};

//TODO add link to transaction on polygonscan
const CompletionPage = ({ navigation }: CompletionPageProps) => {
  const { commitment, activityName } = useCommitment();
  const { singlePlayerCommit } = useContracts();
  const { web3LoggedIn, account } = useWeb3();
  const [loading, setLoading] = useState<boolean>(true);
  const [success, setSuccess] = useState<boolean>(false);
  const [txSent, setTxSent] = useState<boolean>(false);

  //Check is commitment was met
  useEffect(() => {
    if (loading) {
      const _success: boolean =
        commitment.reportedValue > 0 && commitment.reportedValue >= commitment.goalValue;
      setSuccess(_success);
      setLoading(false);
    }
  }, [commitment, loading]);

  const achievement: string = `You managed to ${activityName} for ${commitment.reportedValue} miles. You committed to ${commitment.goalValue} miles`;

  const onProcess = async () => {
    if (web3LoggedIn) {
      console.log("Web3 logged in, calling processCommitmentUser()")
      const tx = await singlePlayerCommit.processCommitmentUser();
      setTxSent(true);
    } else {
      console.log("Web3 not logged in, routing to login")
      navigation.navigate("Login");
    }
  };

  const listenForCommitmentSettlement = (_singlePlayerCommit: Contract) => {
    _singlePlayerCommit.on(
      "CommitmentEnded",
      async (committer: string, met: boolean, amountPenalized: number) => {
        if (committer.toLowerCase() === account.toLowerCase()) {
          navigation.navigate("ActivityGoal");
        }
      }
    );
  };

  listenForCommitmentSettlement(singlePlayerCommit);

  return (
    <LayoutContainer>
      {success ? (
              <ConfettiCannon count={100} origin={{ x: 100, y: 0 }} />
          ) : undefined}
      {loading ? (
        <View style={styles.completionPage}>
          <Text text="Loading" />
        </View>
      ) : (
        <View style={styles.completionPage}>
          {success ? (
            <Fragment>
              <Text text={strings.completion.success} />
            </Fragment>
          ) : (
            <Text text={strings.completion.fail} />
          )}
          <Text text={achievement} />
        </View>
      )}
      {txSent ? (
        <Fragment>
          <Text text="Awaiting transaction processing" />
          <ActivityIndicator size="large" color="#ffffff" />
        </Fragment>
      ) : (
        <Button text="Process commitment" onPress={() => onProcess()} />
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
