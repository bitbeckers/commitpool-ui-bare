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

import { useTorusLogin } from "./hooks";
import strings from "../../resources/strings";
import { RootState } from "../../redux/store";
import { ethers } from "ethers";

type LoginPageNavigationProps = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

type LoginPageProps = {
  navigation: LoginPageNavigationProps;
};


//TODO check for open commitments to determine redirect
const LoginPage = ({ navigation }: LoginPageProps) => {
  const [isLoggedIn, handleLogin] = useTorusLogin();
  const [popUpVisible, setPopUpVisible] = useState(false);

  const account: string | undefined = useSelector(
    (state: RootState) => state.web3?.account
  );

  const singlePlayerCommit = useSelector(
    (state: RootState) => state.web3.contracts.singlePlayerCommit
  ); 

  //When account has active commitment, navigate to Track page
  useEffect(() => {
    if(account && isAddress(account)){
      console.log("ACCOUNT IS ADDRESS")
      const getCommitmentAndRoute = async () => {
        console.log("CHECKING FOR COMMITMENT")
        const commitment = await singlePlayerCommit.commitments(account);
        if(commitment.exists){
          navigation.navigate("Track")
        }
      }

      getCommitmentAndRoute()

    }
  }, [account])

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
        <Button
          text={strings.footer.next}
          onPress={() =>
            isLoggedIn
              ? navigation.navigate("ActivityGoal")
              : setPopUpVisible(true)
          }
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

const isAddress = (account: string) => {
  try {
    ethers.utils.getAddress(account);
  } catch (e) {
    return false;
  }
  return true;
}

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
