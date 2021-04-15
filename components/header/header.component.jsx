import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText} >CommitPool</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "rgba(212, 84, 84, 1)",
    fontSize: 42,
    letterSpacing: 0,
    textAlign: "center",
    fontFamily: "rubik-mono-one, Roboto, sans-serif",
    fontWeight: "bold",
  },
});

export default Header;
