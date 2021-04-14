import React from "react";
import { StyleSheet, View } from "react-native";
import LayoutContainer from "../../components/layout-container/layout-container.component.jsx";
import Button from "../../components/custom-button/custom-button.component";
import Text from "../../components/text-box/text-box.component";
import Footer from "../../components/footer/footer.component";

const IntroPage = ({ navigation }) => {
  return (
    <LayoutContainer>
      <View style={styles.intro}>
        <Text text={"Activity goal page"}>Intro Page</Text>
      </View>
      <Footer>
        <Button
          text={"Back"}
          onPress={() => navigation.goBack()}
        />
        <Button
          text={"Continue"}
          onPress={() => navigation.navigate("ActivitySource")}
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

export default IntroPage;
