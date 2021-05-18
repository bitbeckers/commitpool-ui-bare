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

//TODO conversion between DAI USD
const StakingPage = ({ navigation }: StakingPageProps) => {
  const [popUpVisible, setPopUpVisible] = useState<boolean>(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const commitment: Commitment = useSelector(
    (state: RootState) => state.commitment
  );

  const dispatch = useAppDispatch();

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };
  const toggleOptions: string[] = ["USD", "DAI"];

  useEffect(() => {
    isEnabled
      ? dispatch(updateCurrency(toggleOptions[0]))
      : dispatch(updateCurrency(toggleOptions[1]));
  }, [isEnabled]);

  return (
    <LayoutContainer>
      <DialogPopUp
        visible={popUpVisible}
        onTouchOutside={() => setPopUpVisible(false)}
        text={
          strings.staking.alert
        }
      />
      <ProgressBar size={3 / 6} />
      <View style={styles.text}>
        <Text text={strings.staking.text} />
        <View style={styles.valueInput}>
          <TextInput
            keyboardType={"number-pad"}
            style={styles.textInput}
            onChangeText={(value) => dispatch(updateStake(value))}
          />
          <ValueToggle toggleOptions={toggleOptions} onToggle={toggleSwitch} />
        </View>
      </View>
      <Footer>
        <Button text={strings.footer.back} onPress={() => navigation.goBack()} />
        <Button
          text={strings.footer.next}
          onPress={() => {
            validStake(commitment)
              ? navigation.navigate("Confirmation")
              : setPopUpVisible(true);
          }}
        />
      </Footer>
    </LayoutContainer>
  );
};

const validStake = (commitment: Commitment) => {
  return commitment.stake > 0;
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
});

export default StakingPage;
