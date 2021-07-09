import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "..";
import { LayoutContainer, Text, Button } from "../../components";
import strings from "../../resources/strings";

type TestPageNavigationProps = StackNavigationProp<
  RootStackParamList,
  'Test'
>;

type TestPageProps = {
  navigation: TestPageNavigationProps;
};

const TestPage = ({ navigation }: TestPageProps) => {
  return (
    <LayoutContainer>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerOne} text="Hold Yourself Accountable" />
        </View>
        <View style={styles.content}>
          <Text text={copy.intro} />
        </View>
        <View style={styles.footer}>
          <Button
            text={strings.login.select.metamask}
            onPress={() => console.log("Log in using MetaMask")}
          />
        </View>
      </View>
    </LayoutContainer>
  );
};

const copy = {
  intro: `You have personal goals, but sticking to them is hard. CommitPool is here to help.

Here’s how it works;
1. Set a short term goal and make a commitment to yourself -- e.g. I’m going to bike 50 miles in the next week

2. Stake some money on your ability to keep your commitment -- e.g. $10 

3. Get going -- e .g. get biking!

If you complete your goal, you get your money back. But if you come up short of your goal, you lose your money.`,
}

const styles = StyleSheet.create({
  headerOne: {
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 36,
    lineHeight: 42,
    alignItems: "flex-end",
    textAlign: "center",
    color: "#FFFFFF"
  },
  container:{
    flexDirection: 'column',
    width: "100%",
    height: "100%",
    padding: 14
  },
  header:{
    marginBottom: 37
  },
  content: {},
  footer:{
    alignSelf: "flex-end"
  }
});

export default TestPage;
