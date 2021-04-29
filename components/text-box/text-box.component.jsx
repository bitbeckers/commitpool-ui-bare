import React from "react";
import { StyleSheet, Text } from "react-native";

const TextBox = ({ text }) => {
  return <Text style={styles.text}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 22,
    letterSpacing: 1,
    textAlign: "left",
    fontFamily: "OpenSans_400Regular",
    paddingRight: 10,
    paddingLeft: 10,
  },
});

export default TextBox;
