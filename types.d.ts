interface Commitment {
  activity?: Activity;
  complete: boolean;
  distance: number;
  startDate: number;
  endDate: number;
  progress: number;
  stake: number;
  unit: string;
  activitySet: boolean;
  stakeSet: boolean;
}

interface Athlete {
  username?: string;
  firstname?: string;
  id: number;
  profile_medium?: string;
}

interface Activity {
  key: string
  name: string;
  oracle: string;
  allowed: boolean;
  exists: boolean;
}
