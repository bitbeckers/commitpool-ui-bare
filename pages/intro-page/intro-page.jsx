import React from "react";
import { StyleSheet, View } from "react-native";
import LayoutContainer from "../../components/layout-container/layout-container.component.jsx";
import Button from "../../components/custom-button/custom-button.component";
import Text from "../../components/text-box/text-box.component";
import Footer from "../../components/footer/footer.component";

const IntroPage = ({ navigation }) => {
  return (
    <LayoutContainer>
      <View style={styles.introPage}>
        <Text text={"Intropaage"} />
      </View>
      <Footer>
        <Button
          text={"Get Started"}
          onPress={() => navigation.navigate("ActivityGoal")}
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
});

export default IntroPage;
