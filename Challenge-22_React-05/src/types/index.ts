export enum WorkoutTypeName {
  Swimming = "Swimming",
  Running = "Running",
  HIIT = "HIIT",
  Yoga = "Yoga",
  Pilates = "Pilates",
  Cardio = "Cardio",
  Flexibility = "Flexibility",
  StrengthTraining = "Strength Training",
  CrossFit = "CrossFit",
}

export interface WorkoutType {
  name: WorkoutTypeName;
  id: string;
  description: string;
}

export enum Intensity {
  Low = "Low",
  Medium = "Medium",
  High = "High",
}

export type IntensityString = keyof typeof Intensity;

export interface Workout {
  id: string;
  type: WorkoutTypeName;
  duration: number;
  intensity: Intensity;
}
