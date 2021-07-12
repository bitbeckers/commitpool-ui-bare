import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Header {
  children?: React.ReactNode;
}

const Header = ({children}: Header) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>CommitPool</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    background: "none",
    flex: 1,
    flexDirection: "column",
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "rgba(212, 84, 84, 1)",
    fontSize: 57,
    letterSpacing: 0,
    textAlign: "center",
    fontFamily: 'Rubik_700Bold',
    fontWeight: "bold",
    marginTop: 90
  },
});

export default Header;
