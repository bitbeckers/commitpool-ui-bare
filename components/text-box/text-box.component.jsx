import React from "react";
import { StyleSheet, Text } from "react-native";

const TextBox = ({ text }) => {
  return <Text style={styles.text}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 22,
    letterSpacing: 0,
    textAlign: "left",
    fontFamily: 'OpenSans_400Regular',    
    justifyContent: "center",
    alignItems: "stretch",
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

export default TextBox;
