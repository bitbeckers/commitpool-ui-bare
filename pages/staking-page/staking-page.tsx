import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";

import { StyleSheet, View, TextInput } from "react-native";
import {
  LayoutContainer,
  Footer,
  Button,
  Text,
  ProgressBar,
  DialogPopUp,
  StakeBox,
} from "../../components";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "..";

import strings from "../../resources/strings";

type StakingPageNavigationProps = StackNavigationProp<
  RootStackParamList,
  "Staking"
>;

type StakingPageProps = {
  navigation: StakingPageNavigationProps;
};

const StakingPage = ({ navigation }: StakingPageProps) => {
  const [popUpVisible, setPopUpVisible] = useState<boolean>(false);
  const stake: number = useSelector(
    (state: RootState) => state.commitment.stake
  );

  return (
    <LayoutContainer>
      <DialogPopUp
        visible={popUpVisible}
        onTouchOutside={() => setPopUpVisible(false)}
        text={strings.staking.alert}
      />
      <ProgressBar size={3 / 6} />
      <View style={styles.text}>
        <Text text={strings.staking.text} />
        <StakeBox />
      </View>

      <Footer>
        <Button
          text={strings.footer.back}
          onPress={() => navigation.goBack()}
        />
        <Button
          text={strings.footer.next}
          onPress={() => {
            validStake(stake)
              ? navigation.navigate("Confirmation")
              : setPopUpVisible(true);
          }}
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

const validStake = (stake: number) => {
  return stake > 0;
};

const styles = StyleSheet.create({
  text: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  helpButton: {
    width: 50,
    maxWidth: 50,
  },
});

export default StakingPage;
