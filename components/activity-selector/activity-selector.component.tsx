import React, { useEffect, useState } from "react";

import { Contract } from "ethers";
import { useAppDispatch } from "../../redux/store";

import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { Text, DropDownPicker } from "..";
import { updateActivity } from "../../redux/commitment/commitmentSlice";
import { RootState } from "../../redux/store";

interface ActivitySelectorProps {
  text: string;
}

//TODO any[] can be prettier
//TODO store activites in global state
const ActivitySelector = ({ text }: ActivitySelectorProps) => {
  const [activities, setActivities] = useState<any[]>([]);
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
        let loading = true;
        let index = 0;

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

        return localActivities;
      };

      buildActivityArray().then((activityArray) => {
        if (activityArray) {
          setActivities(activityArray);
        }
      });
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

      return _formattedActivities;
    };

    const formattedActivities = formatActivities(activities);
    setFormattedActivities(formattedActivities)
  }, [activities]);

  const onSelect = (activityKey: string) => {
    const selectedActivity: Activity = activities.find(
      ({ key }) => key === activityKey
    );
    dispatch(updateActivity(selectedActivity));
  };

  return (
    <View style={styles.activitySelector}>
      <Text text={text} />
      <DropDownPicker itemsToSelect={formattedActivities as []} onSelect={onSelect} />
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
