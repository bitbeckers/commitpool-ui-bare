import React, {useState} from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';

import {
  LayoutContainer,
  Footer,
  Button,
  ProgressBar,
  Text,
  DialogPopUp
} from "../../components";
import { useStravaLogin } from "./hooks";
import { RootState } from "../../redux/store";
import { RootStackParamList } from "..";

type ActivitySourcePageNavigationProps = StackNavigationProp<
  RootStackParamList,
  'ActivitySource'
>;

type ActivitySourcePageProps = {
  navigation: ActivitySourcePageNavigationProps;
};

const ActivitySourcePage = ({ navigation }: ActivitySourcePageProps) => {
  const [isLoggedIn, handleLogin] = useStravaLogin();
  const [popUpVisible, setPopUpVisible] = useState<boolean>(false);
  const stravaAthlete: Athlete = useSelector((state: RootState) => state.strava.athlete);

  return (
    <LayoutContainer>
      <ProgressBar size={2 / 6} />
      <DialogPopUp
        visible={popUpVisible}
        onTouchOutside={() => setPopUpVisible(false)}
        text={"Mmmmm... It appears you are not yet connected to Strava"}
      />
      <View style={styles.intro}>
        {isLoggedIn ? (
          <Text text={`Hello ${stravaAthlete?.firstname}`} />
        ) : (
          <Text text={"Please log in"} />
        )}
        {isLoggedIn ? (
          <Button text={"Change account"} onPress={() => handleLogin()} />
        ) : (
          <Button text={"Connect to Strava"} onPress={() => handleLogin()} />
        )}
      </View>
      <Footer>
        <Button text={"Back"} onPress={() => navigation.goBack()} />
        <Button
          text={"Continue"}
          onPress={() => isLoggedIn ? navigation.navigate("Staking") : setPopUpVisible(true)}
        />
      </Footer>
    </LayoutContainer>
  );
};

const styles = StyleSheet.create({
  intro: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ActivitySourcePage;
