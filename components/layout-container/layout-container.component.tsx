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
    backgroundPosition: "50% 50%",
    backgroundSize: "auto 100%",
    backgroundImage: "url('https://i.imgur.com/Q1NCXvz.png')",
  },
});

export default LayoutContainer;
