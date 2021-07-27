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

import getEnvVars from "../../environment";
import { useWeb3ModalLogin } from "./hooks";
import { useTorusLogin } from "./hooks";
import strings from "../../resources/strings";
import { RootState, useAppDispatch } from "../../redux/store";
import { updateCommitment } from "../../redux/commitpool/commitpoolSlice";
import { parseCommitmentFromContract } from "../../utils/commitment";
import useContracts from "../../hooks/useContracts";
import useWeb3 from "../../hooks/useWeb3";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import useStravaAthlete from "../../hooks/useStravaAthlete";

type LoginPageNavigationProps = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

type LoginPageProps = {
  navigation: LoginPageNavigationProps;
};

const LoginPage = ({ navigation }: LoginPageProps) => {
  const [isLoggedIn, handleLogin] = useWeb3ModalLogin();
  const [popUpVisible, setPopUpVisible] = useState(false);
  const dispatch = useAppDispatch();

  const { account } = useWeb3();
  const { stravaIsLoggedIn} = useStravaAthlete();
  const { singlePlayerCommit } = useContracts();

  const { activitySet, stakeSet } = useSelector(
    (state: RootState) => state.commitpool
  );

  //When account has an commitment, write to state
  useEffect(() => {
    console.log("Account: ", account);
    if (ethers.utils.isAddress(account)) {
      const getCommitmentAndRoute = async () => {
        console.log(`Checking for commitment for account ${account}`);
        const commitment = await singlePlayerCommit.commitments(account);
        console.log("Commitment from contract: ", commitment);
        if (commitment.exists) {
          const _commitment: Commitment =
            parseCommitmentFromContract(commitment);
          dispatch(updateCommitment({ ..._commitment }));
          navigation.navigate("Track");
        }
      };

      getCommitmentAndRoute();
    }
  }, [account, singlePlayerCommit]);

  const onNext = () => {
    if (isLoggedIn && activitySet && stakeSet && stravaIsLoggedIn) {
      navigation.navigate("Confirmation");
    } else if (isLoggedIn && !activitySet && !stakeSet && !stravaIsLoggedIn) {
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
