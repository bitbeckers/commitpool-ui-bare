interface Commitment {
  activityKey: string;
  exists: boolean;
  met: boolean;
  goalValue: number;
  startTime: number;
  endTime: number;
  reportedValue: number;
  stake: number;
  unit: string;
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
