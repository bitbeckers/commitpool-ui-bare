import React, { useEffect, useState } from "react";

import { Contract } from "ethers";
import { useAppDispatch } from "../../redux/store";

import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { Text, DropDownPicker } from "..";
import { updateActivityKey } from "../../redux/commitment/commitmentSlice";
import { RootState } from "../../redux/store";

interface ActivitySelectorProps {
  text: string;
}

const ActivitySelector = ({ text }: ActivitySelectorProps) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const dispatch = useAppDispatch();

  const spcContract: Contract = useSelector(
    (state: RootState) => state.web3?.contracts?.singlePlayerCommit
  );

  //TODO check on exists
  useEffect(() => {
    if (spcContract) {
      const buildActivityArray = async () => {
        const localActivities: any[] = [];
        let exists = true;
        let index = 0;

        while (exists) {
          try {
            const key = await spcContract.activityKeyList(index);
            const activity = await spcContract.activities(key);
            const clone = Object.assign({}, activity);
            clone.key = key;
            clone.label = activity.name;
            localActivities.push(clone as Activity);
            index++;
          } catch (error) {
            exists = false;
          }
        }

        return localActivities;
      };

      //TODO can be prettier?
      buildActivityArray().then((activityArray) => {
        if (activityArray) {
          setActivities(activityArray);
        }
      });
    }
  }, [spcContract]);

  const onSelect = (activityKey: string) => {
      dispatch(updateActivityKey(activityKey));
  };

  return (
    <View style={styles.activitySelector}>
      <Text text={text} />
      <DropDownPicker itemsToSelect={activities as []} onSelect={onSelect} />
    </View>
  );
};

const styles = StyleSheet.create({
  activitySelector: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ActivitySelector;
