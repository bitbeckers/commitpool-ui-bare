interface Commitment {
  activityKey: string;
  complete: boolean;
  currency: string;
  distance: number;
  endDate: number;
  progress: number;
  stake: number;
  startDate: number;
  unit: string;
}

interface Athlete {
  firstname?: string;
  id: number;
  lastname?: number;
  profile_medium?: number;
  username?: string;
}

interface Activity {
  key: string
  name: string;
  oracle: string;
  allowed: boolean;
  exists: boolean;
}
