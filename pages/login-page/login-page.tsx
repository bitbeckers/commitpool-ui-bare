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
import { updateCommitment } from "../../redux/commitpool/commitpoolSlice";
import { parseCommitmentFromContract } from "../../utils/commitment";
import { isAddress } from "../../utils/web3helper";
import { ethers } from "ethers";
import Clipboard from "@react-native-community/clipboard";


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
  const [daiBalance, setDaiBalance] = useState("n/a");
  const dispatch = useAppDispatch();

  const account: string = useSelector(
    (state: RootState) => state.web3?.account
  );

  const { activitySet, stakeSet } = useSelector(
    (state: RootState) => state.commitpool
  );

  const singlePlayerCommit = useSelector(
    (state: RootState) => state.web3.contracts.singlePlayerCommit
  );

  const dai = useSelector((state: RootState) => state.web3.contracts.dai);

  //When account has an commitment, write to state
  useEffect(() => {
    if (isAddress(account)) {
      const getCommitmentAndRoute = async () => {
        console.log("Checking for commitment");
        const commitment = await singlePlayerCommit.commitments(account);
        console.log("Commitment from contract: ", commitment);
        if (commitment.exists) {
          const _commitment: Commitment =
            parseCommitmentFromContract(commitment);
          dispatch(updateCommitment({ ..._commitment }));
          navigation.navigate("Track");
        }
      };

      const getDaiBalance = async () => {
        console.log(`Calling DAI balance for ${account}`);
        let balance = await dai.balanceOf(account);
        balance = ethers.utils.formatEther(balance);
        console.log(`${balance} DAI in wallet`);
        return balance;
      };

      getCommitmentAndRoute();
      getDaiBalance().then((balance) => setDaiBalance(balance));
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

  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
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
            <Text
              text={`You're logged in to ${account}`}
              // onPress={copyToClipboard(account)}
            />
            <Text text={`Your DAI balance ${daiBalance}`} />
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
