import { ethers } from "ethers";

const getActivityName = (activityKey: string, activities: Activity[]) => {
  const activity = activities.find((activity) => activity.key === activityKey);
  return activity?.name;
};

const parseCommitmentFromContract = (commitment): Commitment => {
  let _commitment: Partial<Commitment> = {
    exists: false,
  };

  try {
    _commitment = {
      activityKey: commitment.activityKey,
      goalValue: Number.parseFloat(commitment.goalValue),
      reportedValue: Number.parseFloat(commitment.reportedValue),
      endTime: Number.parseFloat(commitment.endTime.toString()),
      startTime: Number.parseFloat(commitment.startTime.toString()),
      stake: Number.parseFloat(ethers.utils.formatEther(commitment.stake)),
      exists: commitment.exists,
      met: commitment.met,
      unit: "mi",
    };
    console.log("Parsed commitment: ", _commitment);
  } catch (e) {
    console.log(e);
  }

  return _commitment as Commitment;
};

const validActivityKey = (commitment: Commitment, activities: Activity[]): boolean => {
  return (
    activities.find((activity) => activity.key === commitment.activityKey) !==
    undefined
  );
};

const validActivityParameters = (commitment: Commitment, activities: Activity[]): boolean => {
  return (
    validActivityKey(commitment, activities) &&
    validStartEndTimestamps(commitment) &&
    commitment.goalValue > 0
  );
};

const validStartEndTimestamps = (commitment: Commitment): boolean => {
  const nowInSeconds = new Date().getTime() / 1000;

  return (
    commitment.endTime > commitment.startTime &&
    commitment.endTime > nowInSeconds
  );
};

const validCommitmentRequest = (commitment: Commitment, activities: Activity[]): boolean => {
  return validActivityParameters(commitment, activities) && commitment.stake > 0;
};

const getCommitmentRequestParameters = (commitment: Commitment) => {
  const _activityKey: string = commitment.activityKey;
  const _goalValue: number = Math.floor(commitment.goalValue);
  const _startTime: number = Math.ceil(commitment.startTime);
  const _endTime: number = Math.ceil(commitment.endTime);
  const _stake = ethers.utils.parseEther(commitment.stake.toString());
  const _depositAmount = _stake;
  return {
    _activityKey,
    _goalValue,
    _startTime,
    _endTime,
    _stake,
    _depositAmount,
  };
};

export {
  getActivityName,
  getCommitmentRequestParameters,
  parseCommitmentFromContract,
  validCommitmentRequest,
  validActivityParameters,
};
