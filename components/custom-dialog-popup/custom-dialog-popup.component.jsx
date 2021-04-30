import React from "react";
import { StyleSheet, Text } from "react-native";
import Dialog, { DialogContent } from "react-native-popup-dialog";

const dialogPopUp = ({ visible, text, onTouchOutside }) => {
  return (
    <Dialog visible={visible} onTouchOutside={onTouchOutside}>
      <DialogContent>
        <Text>{text}</Text>
      </DialogContent>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "black",
    fontSize: 22,
    textAlign: "center",
    fontFamily: "OpenSans_400Regular",
    padding: 10,
  },
});

export default dialogPopUp;
