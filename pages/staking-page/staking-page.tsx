import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState} from "../../redux/store";

import { StyleSheet, View } from "react-native";
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

  const stakeSet: boolean = useSelector(
    (state: RootState) => state.commitpool.stakeSet
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
            stakeSet
              ? navigation.navigate("ActivitySource")
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
