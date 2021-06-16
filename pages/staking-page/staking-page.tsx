import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import {
  updateStake,
  updateCurrency,
} from "../../redux/commitment/commitmentSlice";

import { StyleSheet, View, TextInput } from "react-native";
import {
  LayoutContainer,
  Footer,
  Button,
  Text,
  ProgressBar,
  ValueToggle,
  DialogPopUp,
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

  const dispatch = useAppDispatch();

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
        <View style={styles.valueInput}>
          <TextInput
            defaultValue={stake?.toString()}
            keyboardType={"number-pad"}
            style={styles.textInput}
            onChangeText={(value) => dispatch(updateStake(value))}
          />
          <Text text={`DAI`} />
        </View>
        {stake >= 100 ? (
          <Text
            style={styles.textHighAlert}
            text={`You're staking ${stake.toString()} DAI. That's a big commitment!`}
          />
        ) : undefined}
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
  textInput: {
    backgroundColor: "white",
    fontSize: 14,
    height: 28,
    width: 75,
    textAlign: "center",
    borderRadius: 20,
  },
  valueInput: {
    flexDirection: "row",
    marginTop: 20,
  },
  textHighAlert: {
    marginTop: 25,
    fontWeight: "bold"
  }
});

export default StakingPage;
