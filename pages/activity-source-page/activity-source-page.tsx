import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import {
  LayoutContainer,
  Footer,
  Button,
  ProgressBar,
  Text,
  DialogPopUp,
} from "../../components";
import { useStravaLogin } from "./hooks";
import { RootState } from "../../redux/store";
import { RootStackParamList } from "..";

import strings from "../../resources/strings";

type ActivitySourcePageNavigationProps = StackNavigationProp<
  RootStackParamList,
  "ActivitySource"
>;

type ActivitySourcePageProps = {
  navigation: ActivitySourcePageNavigationProps;
};

const ActivitySourcePage = ({ navigation }: ActivitySourcePageProps) => {
  const [stravaIsLoggedIn, handleStravaLogin] = useStravaLogin();
  const [popUpVisible, setPopUpVisible] = useState<boolean>(false);
  const stravaAthlete: Athlete = useSelector(
    (state: RootState) => state.strava.athlete
  );

  const web3IsLoggedIn: boolean = useSelector(
    (state: RootState) => state.web3.isLoggedIn
  );

  const commitment: Commitment = useSelector(
    (state: RootState) => state.commitpool.commitment
  );

  return (
    <LayoutContainer>
      <ProgressBar size={2 / 6} />
      <DialogPopUp
        visible={popUpVisible}
        onTouchOutside={() => setPopUpVisible(false)}
        text={strings.activitySource.alert}
      />
      <View style={styles.intro}>
        {stravaIsLoggedIn ? (
          <Fragment>
            <Text
              text={`${strings.activitySource.loggedIn.text} ${stravaAthlete?.firstname}`}
            />
            <Image
              style={styles.tinyAvatar}
              source={{ uri: stravaAthlete?.profile_medium }}
            />
            <Button
              text={strings.activitySource.loggedIn.button}
              onPress={() => handleStravaLogin()}
            />
          </Fragment>
        ) : (
          <Fragment>
            <Text text={strings.activitySource.notLoggedIn.text} />
            <Button
              text={strings.activitySource.notLoggedIn.button}
              onPress={() => handleStravaLogin()}
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
          onPress={() => {
            if(commitment.exists && stravaIsLoggedIn && web3IsLoggedIn) {
              navigation.navigate("Track");
            } else if (stravaIsLoggedIn && web3IsLoggedIn) {
              navigation.navigate("Confirmation");
            } else if (stravaIsLoggedIn && !web3IsLoggedIn) {
              navigation.navigate("Login");
            } else {
              setPopUpVisible(true);
            }
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
  intro: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tinyAvatar: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  helpButton: {
    width: 50,
    maxWidth: 50,
  },
});

export default ActivitySourcePage;
