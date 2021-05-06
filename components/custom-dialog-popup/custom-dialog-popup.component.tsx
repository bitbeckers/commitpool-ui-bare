import React from "react";
import { StyleSheet, Text } from "react-native";
import Dialog, { DialogContent } from "react-native-popup-dialog";

interface DialogPopUp {
  visible: boolean,
  text: string,
  onTouchOutside: () => void 
}

const DialogPopUp = ({ visible, text, onTouchOutside }: DialogPopUp) => {
  return (
    <Dialog visible={visible} onTouchOutside={onTouchOutside}>
      <DialogContent>
        <Text style={styles.text}>{text}</Text>
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

export default DialogPopUp;
