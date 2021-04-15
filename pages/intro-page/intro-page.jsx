import React from "react";
import { StyleSheet, View } from "react-native";
import { LayoutContainer, Footer, Text, Button } from "../../components";


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
