import React from "react";
import { StyleSheet, View } from "react-native";


interface LayoutContainer {
  children?: React.ReactNode;
}

const LayoutContainer = ({ children }: LayoutContainer) => {
  return (
    <View style={styles.layoutContainer}>
      <View style={styles.testPage}>
        <View style={styles.actionSection}>
          {children}
        </View>
      </View>
    </View>
  )

};

const styles = StyleSheet.create({
  layoutContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundPosition: "50% 50%",
    backgroundSize: "auto 100%",
    backgroundImage: "url('https://i.imgur.com/Q1NCXvz.png')",
  },
  testPage: {
    flex: 1,
    height: "100%",
    alignItems: "center",
  },
  actionSection: {
    width: "764px",
    height: "696px",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(0, 0, 0, 0.4)",
    backdropFilter: "blur(27px)",
    borderRadius: 10,
    top: 100
  },
});

export default LayoutContainer;
