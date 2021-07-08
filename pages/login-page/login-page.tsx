import { StackNavigationProp } from "@react-navigation/stack";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "..";
import {
  LayoutContainer,
  Footer,
  Text,
  Button,
  DialogPopUp,
} from "../../components";

import { useTorusLogin } from "./hooks";
import strings from "../../resources/strings";
import { RootState, useAppDispatch } from "../../redux/store";
import { ethers } from "ethers";
import { updateActivities, updateCommitment } from "../../redux/commitpool/commitpoolSlice";

type LoginPageNavigationProps = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

type LoginPageProps = {
  navigation: LoginPageNavigationProps;
};

const LoginPage = ({ navigation }: LoginPageProps) => {
  const [isLoggedIn, handleLogin] = useTorusLogin();
  const [popUpVisible, setPopUpVisible] = useState(false);
  const dispatch = useAppDispatch();

  const account: string = useSelector(
    (state: RootState) => state.web3?.account
  );

  const {activitySet, stakeSet} = useSelector(
    (state: RootState) => state.commitpool
  );

  const activities: Activity[] = useSelector(
    (state: RootState) => state.commitpool.activities
  );

  const singlePlayerCommit = useSelector(
    (state: RootState) => state.web3.contracts.singlePlayerCommit
  );

  //When account has an active commitment, write to state
  useEffect(() => {
    if (isAddress(account)) {
      const getCommitmentAndRoute = async () => {
        console.log("Checking for commitment");
        const commitment = await singlePlayerCommit.commitments(account);
        console.log("Commitment found: ", commitment);
        if (commitment.exists) {
          const _commitment = parseCommitment(commitment);
          dispatch(updateCommitment({ ..._commitment}))
          navigation.navigate("Track");
        }
      };

      getCommitmentAndRoute();
    }
  }, [account]);

  const onNext = () => {
    if (isLoggedIn && activitySet && stakeSet) {
      navigation.navigate("Confirmation");
    } else if (isLoggedIn && !activitySet && !stakeSet) {
      navigation.navigate("ActivityGoal");
    } else {
      setPopUpVisible(true);
    }
  };

  return (
    <LayoutContainer>
      <DialogPopUp
        visible={popUpVisible}
        onTouchOutside={() => setPopUpVisible(false)}
        text={strings.login.alert}
      />
      <View style={styles.loginPage}>
        {isLoggedIn ? (
          <View>
            <Text text={`You're logged in to ${account}`} />
            <Button text="Log out" onPress={() => handleLogin()} />
          </View>
        ) : (
          <Fragment>
            <Text text={strings.login.text} />
            <Button
              text={strings.login.select.torus}
              onPress={() => handleLogin()}
            />
            <Button
              text={strings.login.select.metamask}
              onPress={() => console.log("Log in using MetaMask")}
            />
          </Fragment>
        )}
      </View>
      <Footer>
        <Button
          text={strings.footer.back}
          onPress={() => navigation.goBack()}
        />
        <Button text={strings.footer.next} onPress={() => onNext()} />
        <Button
          text={strings.footer.help}
          onPress={() => navigation.navigate("Faq")}
          style={styles.helpButton}
        />
      </Footer>
    </LayoutContainer>
  );
};

//TODO check validCommitment, setup utils for universal use
const parseCommitment = (commitment) => {
  try {
    const _commitment: Commitment = {
      activityKey: commitment.activityKey,
      goalValue: Number.parseFloat(commitment.goalValue),
      reportedValue: Number.parseFloat(commitment.reportedValue),
      endTime: Number.parseFloat(commitment.endTime.toString()),
      startTime: Number.parseFloat(commitment.startTime.toString()),
      stake: Number.parseFloat(ethers.utils.formatEther(commitment.stake)),
      exists: commitment.exists,
      met: commitment.met,
      unit: "mi",
    }
    console.log("Parsed commitment: ", _commitment)
    return _commitment
  } catch (e) {
    console.log(e)
  }
}

const isAddress = (account: string) => {
  try {
    ethers.utils.getAddress(account);
    return true;
  } catch (e) {
    return false;
  }
};

const styles = StyleSheet.create({
  loginPage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  helpButton: {
    width: 50,
    maxWidth: 50,
  },
});

export default LoginPage;
