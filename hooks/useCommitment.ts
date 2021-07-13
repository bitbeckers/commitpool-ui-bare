import { useSelector } from "react-redux";
import { updateCommitment } from "../redux/commitpool/commitpoolSlice";
import { RootState, useAppDispatch } from "../redux/store";

import { getActivityName } from "../utils/commitment";

import useActivities from "./useActivities";
import useContracts from "./useContracts";
import useWeb3 from "./useWeb3";

const useCommitment = () => {
  const dispatch = useAppDispatch();
  const { activities } = useActivities();
  const { singlePlayerCommit } = useContracts();
  const { account } = useWeb3();

  const commitment: Commitment = useSelector((state: RootState) => state.commitpool.commitment)

  const activityName: string = getActivityName(commitment.activityKey, activities) || "";

  const refreshCommitment = async () => {
    const _commitment = await singlePlayerCommit.commitments(account);
    dispatch(updateCommitment({..._commitment}))
  }

  return { commitment, activityName, refreshCommitment}

}

export default useCommitment;