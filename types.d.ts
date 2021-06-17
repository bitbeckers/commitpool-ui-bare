interface Commitment {
  activityKey: string;
  complete: boolean;
  distance: number;
  startDate: number;
  endDate: number;
  progress: number;
  stake: number;
  unit: string;
}

interface Athlete {
  username?: string;
  firstname?: string;
  id: number;
  profile_medium?: string;
  measurement_preference?: string
}

interface Activity {
  key: string
  name: string;
  oracle: string;
  allowed: boolean;
  exists: boolean;
}
