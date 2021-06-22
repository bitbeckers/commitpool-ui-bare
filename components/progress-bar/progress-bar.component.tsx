import React from "react";
import ProgressBar from "react-native-progress/Bar";
import { StyleSheet } from "react-native";

interface CustomProgressBar {
  size: number
}

const CustomProgressBar = ({ size }: CustomProgressBar) => {
  return (
    <ProgressBar
      progress={size}
      width={200}
      height={100}
      borderRadius={15}
      color={"#ABE9A6"}
      unfilledColor={"white"}
      style={styles.progressBar}
    />
  );
};

const styles = StyleSheet.create({
  progressBar: {
    flex: 1,
    marginTop: 20,
    maxHeight: 32,
    alignItems: "stretch",
    justifyContent: "center",
  },
});

export default CustomProgressBar;
