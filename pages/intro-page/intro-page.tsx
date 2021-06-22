import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "..";
import { LayoutContainer, Footer, Text, Button } from "../../components";
import strings from "../../resources/strings";

type IntroPageNavigationProps = StackNavigationProp<
  RootStackParamList,
  'Intro'
>;

type IntroPageProps = {
  navigation: IntroPageNavigationProps;
};

const IntroPage = ({ navigation }: IntroPageProps) => {
  return (
    <LayoutContainer>
      <View style={styles.introPage}>
        <Text text={strings.intro.text} />
      </View>
      <Footer>
        <Button text={strings.footer.back} onPress={() => navigation.goBack()}/>
        <Button
          text={strings.footer.start}
          onPress={() => navigation.navigate("ActivityGoal")}
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
  introPage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  helpButton: {
    width: 50,
    maxWidth: 50,
  }
});

export default IntroPage;
