import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "..";
import { LayoutContainer, Footer, Text, Button } from "../../components";
import strings from "../../resources/strings";

type FaqNavigationProps = StackNavigationProp<
  RootStackParamList,
  'Faq'
>;

type FaqPageProps = {
  navigation: FaqNavigationProps;
};

const FaqPage = ({ navigation }: FaqPageProps) => {
  return (
    <LayoutContainer>
      <View style={styles.faqPage}>
        <Text text={strings.faq.strava} />
      </View>
      <View style={styles.faqPage}>
        <Text text={strings.faq.dai} />
      </View>
      <View style={styles.faqPage}>
        <Text text={strings.faq.staking} />
      </View>
      <Footer>
        <Button text={strings.footer.back} onPress={() => navigation.goBack()}/>
      </Footer>
    </LayoutContainer>
  );
};

const styles = StyleSheet.create({
  faqPage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});

export default FaqPage;
