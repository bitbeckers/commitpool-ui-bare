import React from "react";

import { useAppDispatch } from "../../redux/store";

import { StyleSheet, View } from "react-native";
import { Text, DropDownPicker } from "..";
import { updateCommitment } from "../../redux/commitpool/commitpoolSlice";
import useActivities from "../../hooks/useActivities";

interface ActivitySelectorProps {
  text: string;
}

const ActivitySelector = ({ text }: ActivitySelectorProps) => {
  const { formattedActivities } = useActivities();
  const dispatch = useAppDispatch();

  const onSelect = (activityKey: string) => {
    dispatch(updateCommitment({ activityKey }));
  };

  return (
    <View style={styles.activitySelector}>
      <Text text={text} />
      <DropDownPicker itemsToSelect={formattedActivities as DropdownItem[]} onSelect={onSelect} />
    </View>
  );
};

const styles = StyleSheet.create({
  activitySelector: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    margin: 18
  },
});

export default ActivitySelector;
