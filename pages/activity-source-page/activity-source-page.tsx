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
  const [isLoggedIn, handleLogin] = useStravaLogin();
  const [popUpVisible, setPopUpVisible] = useState<boolean>(false);
  const stravaAthlete: Athlete = useSelector(
    (state: RootState) => state.strava.athlete
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
        {isLoggedIn ? (
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
              onPress={() => handleLogin()}
            />
          </Fragment>
        ) : (
          <Fragment>
            <Text text={strings.activitySource.notLoggedIn.text} />
            <Button
              text={strings.activitySource.notLoggedIn.button}
              onPress={() => handleLogin()}
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
              ? navigation.navigate("Confirmation")
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
