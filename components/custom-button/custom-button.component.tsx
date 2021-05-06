import React from "react";
import { StyleSheet, Text, Platform, Pressable } from "react-native";

interface CustomButtonProps {
  text: string,
  onPress: () => any 
}

const CustomButton = ({ text, onPress }: CustomButtonProps) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: 250,
    maxWidth: 300,
    maxHeight: 42,
    backgroundColor: "rgba(212, 84, 84, 1)",
    margin: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
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

  },
  text: {
    color: "white",
    fontFamily: 'OpenSans_400Regular',
  },
});

export default CustomButton;
