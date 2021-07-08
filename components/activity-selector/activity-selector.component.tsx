import React, { useEffect, useState } from "react";

import { Contract } from "ethers";
import { useAppDispatch } from "../../redux/store";

import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { Text, DropDownPicker } from "..";
import {
  updateActivities,
  updateCommitment,
} from "../../redux/commitpool/commitpoolSlice";
import { RootState } from "../../redux/store";

interface ActivitySelectorProps {
  text: string;
}

//TODO any[] can be prettier
//TODO load selected activity from state
const ActivitySelector = ({ text }: ActivitySelectorProps) => {
  const activities: Activity[] = useSelector(
    (state: RootState) => state.commitpool.activities
  );
  const [formattedActivities, setFormattedActivities] = useState<any[]>([]);
  const dispatch = useAppDispatch();

  const spcContract: Contract = useSelector(
    (state: RootState) => state.web3?.contracts?.singlePlayerCommit
  );

  // Get activities from contract
  useEffect(() => {
    if (spcContract) {
      const buildActivityArray = async () => {
        const localActivities: Activity[] = [];
        let loading: boolean = true;
        let index: number = 0;

        while (loading) {
          try {
            const key = await spcContract.activityKeyList(index);
            const activity = await spcContract.activities(key);
            if (activity.exists && activity.allowed) {
              const clone = Object.assign({}, activity);
              clone.key = key;
              clone.name = activity.name;
              localActivities.push(clone as Activity);
            }
            index++;
          } catch (error) {
            loading = false;
          }
        }

        dispatch(updateActivities(localActivities));
      };

      buildActivityArray();
    }
  }, [spcContract]);

  // Format activites for dropdown
  useEffect(() => {
    const formatActivities = (activities: Activity[]) => {
      const _formattedActivities = activities.map((act: Activity) => {
        console.log("formatting ", act);
        if (act.name === "Run") {
          return {
            label: "Run 🏃‍♂️",
            value: act.key,
          };
        } else if (act.name === "Ride") {
          return {
            label: "Ride 🚲",
            value: act.key,
          };
        } else {
          return {
            label: act.name,
            value: act.key,
          };
        }
      });

      setFormattedActivities(_formattedActivities);
    };

    if (activities.length > 0) {
      formatActivities(activities);
    }
  }, [activities]);

  const onSelect = (activityKey: string) => {
    dispatch(updateCommitment({ activityKey }));
  };
  
  return (
    <View style={styles.activitySelector}>
      <Text text={text} />
      <DropDownPicker
        itemsToSelect={formattedActivities as []}
        onSelect={onSelect}
      />
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
