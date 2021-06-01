import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
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
import { Contract, ethers } from "ethers";

type LoginPageNavigationProps = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

type LoginPageProps = {
  navigation: LoginPageNavigationProps;
};

const { nativeToken } = getEnvVars();

//TODO check for open commitments to determine redirect
const LoginPage = ({ navigation }: LoginPageProps) => {
  const [isLoggedIn, handleLogin] = useTorusLogin();
  const [popUpVisible, setPopUpVisible] = useState(false);
  const [daiBalance, setDaiBalance] = useState("0");
  const [nativeTokenBalance, setNativeTokenBalance] = useState("0");

  const provider = useSelector((state: RootState) => state.web3.provider);
  const  daiContract: Contract = useSelector(
    (state: RootState) => state.web3?.contracts?.dai
  );
  
  const account: string | undefined = useSelector(
    (state: RootState) => state.web3?.account
  );

  useEffect(() => {
    console.log(account)
    if (account !== undefined) {
      const getDaiBalance = async () => {
        const daiBalance = await daiContract.balanceOf(account[0]);
        setDaiBalance(daiBalance.toString());
      };

      const getNativeTokenBalance = async () => {
        const nativeTokenBalance = await provider.getBalance(account[0]);
        setNativeTokenBalance(nativeTokenBalance.toString());
      };
      getDaiBalance();

      getNativeTokenBalance();
    }
  }, [account]);

  return (
    <LayoutContainer>
      <DialogPopUp
        visible={popUpVisible}
        onTouchOutside={() => setPopUpVisible(false)}
        text={strings.login.alert}
      />
      <View style={styles.loginPage}>
        <Text text={strings.login.text} />
        <Button
          text={strings.login.select.torus}
          onPress={() => handleLogin()}
        />
        <Button
          text={strings.login.select.metamask}
          onPress={() => console.log("Log in using MetaMask")}
        />
      </View>
      {isLoggedIn ? (
        <View>
          <Text text={`${ethers.utils.formatEther(daiBalance)} DAI`} />
          <Text text={`${ethers.utils.formatEther(nativeTokenBalance)} ${nativeToken}`} />
        </View>
      ) : (
        <Text text="NOT LOGGED IN" />
      )}
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
});

export default LoginPage;
