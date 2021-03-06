import React from "react";
import { StyleSheet, View } from "react-native";

interface LayoutContainer {
  children?: React.ReactNode;
}

const LayoutContainer = ({ children }: LayoutContainer) => {
  return <View style={styles.layoutContainer}>{children}</View>;
};

const styles = StyleSheet.create({
  layoutContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(212, 84, 84, 1)",
  },
});

export default LayoutContainer;
