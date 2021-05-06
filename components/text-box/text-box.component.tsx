import React from "react";
import { StyleSheet, StyleProp, Text, TextStyle } from "react-native";

interface TextBox {
  text: string;
  style?: StyleProp<TextStyle>;
}

interface Styles {
  text: TextStyle;
}

const TextBox: React.FC<TextBox> = ({ text, style }: TextBox) => {
  return <Text style={[styles.text, style]}>{text}</Text>;
};

const styles = StyleSheet.create<Styles>({
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
