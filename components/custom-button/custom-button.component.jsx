import React from "react";
import { StyleSheet, View, Text, Platform, Pressable } from "react-native";

const CustomButton = ({ text, ...props }) => {
  return (
    <Pressable {...props} style={styles.button}>
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    maxWidth: 252,
    maxHeight: 66,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0,0,0, .7)",
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
      default: {
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      },
    }),
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    backgroundColor: "rgba(212, 84, 84, 1)",
    margin: 10,
  },
  buttonText: {
    justifyContent: "center",
    alignItems: "stretch",
    color: "rgba(255, 255, 255, 1)",
    fontSize: 37,
    letterSpacing: 0,
    textAlign: "center",
    fontFamily: "Rubik One, sans-serif",
  },
});

export default CustomButton;
