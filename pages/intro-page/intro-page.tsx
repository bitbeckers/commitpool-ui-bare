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
       <View style={styles.container}>
        <View style={styles.header}>
          <Text text={strings.intro.text} />
        </View>
      </View>
      <View style={styles.footer}>
        <Button text={strings.footer.back} onPress={() => navigation.goBack()}/>
        <Button
          text={strings.footer.start}
          onPress={() => navigation.navigate("ActivityGoal")}
        />
      </View>
    </LayoutContainer>
  );
};

const styles = StyleSheet.create({
  container:{
    flexDirection: 'column',
    width: "100%",
    flex: 1,
    padding: 14
  },
  header:{
    marginBottom: 37
  },
  content: {},
  footer:{
    alignSelf: "flex-end",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  }
});

export default IntroPage;
