import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

import { getActivityName } from "../utils/commitment";

import useActivities from "./useActivities";

const useCommitment = () => {
  const { activities } = useActivities();

  const commitment: Commitment = useSelector((state: RootState) => state.commitpool.commitment)

  const activityName: string = getActivityName(commitment.activityKey, activities) || "";

  return { commitment, activityName}

}

export default useCommitment;