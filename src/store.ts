import AsyncStorage from "@react-native-async-storage/async-storage";

export type WorkoutType = "strength" | "cardio" | "mobility";
export type WorkoutSet = { exercise: string; sets: number; reps: number; weight: number };
export type Workout = { id: string; name: string; type: WorkoutType; date: string; duration: number; sets: WorkoutSet[]; notes: string; xp: number };
export type Meal = { id: string; name: string; type: string; date: string; protein: number; calories: number; carbs: number; fat: number; notes: string };
export type Habit = { id: string; name: string; doneDates: string[] };
export type AppData = { name: string; xp: number; workouts: Workout[]; meals: Meal[]; habits: Habit[]; missions: Record<string, string[]>; unlockedBadgeIds: string[]; journeyStart: string; reflections: Record<string, string>; units: "lb" | "kg"; weeklyWorkoutGoal: number; preferredTrainingDays: number[]; trainingReminderTime: string; trainingReminderIds: string[] };
export const STORAGE_KEY = "ascend-mobile-v1";
export const today = () => new Date().toISOString().slice(0, 10);
export const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
export const initialData: AppData = {
  name: "Jordan", xp: 0, workouts: [], meals: [],
  habits: [
    { id: "move", name: "Move my body", doneDates: [] },
    { id: "water", name: "Drink water", doneDates: [] },
    { id: "sleep", name: "Wind down on time", doneDates: [] }
  ],
  missions: {}, unlockedBadgeIds: [], journeyStart: today(), reflections: {}, units: "lb", weeklyWorkoutGoal: 4, preferredTrainingDays: [], trainingReminderTime: "18:00", trainingReminderIds: []
};
export async function loadData(): Promise<AppData> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return initialData;
    const parsed = JSON.parse(raw);
    return {
      ...initialData, ...parsed,
      workouts: Array.isArray(parsed.workouts) ? parsed.workouts.map((w: any) => ({ ...w, type: w.type || "strength" })) : [],
      meals: Array.isArray(parsed.meals) ? parsed.meals.map((m: any) => ({ ...m, protein: Number(m.protein) || 0, calories: Number(m.calories) || 0, carbs: Number(m.carbs) || 0, fat: Number(m.fat) || 0 })) : [],
      habits: Array.isArray(parsed.habits) ? parsed.habits : initialData.habits,
      missions: parsed.missions || {},
      unlockedBadgeIds: Array.isArray(parsed.unlockedBadgeIds) ? parsed.unlockedBadgeIds : [],
      reflections: parsed.reflections || {},
      weeklyWorkoutGoal: Math.min(14, Math.max(1, Number(parsed.weeklyWorkoutGoal) || 4)),
      preferredTrainingDays: Array.isArray(parsed.preferredTrainingDays) ? parsed.preferredTrainingDays.filter((n: any) => Number.isInteger(n) && n >= 0 && n <= 6) : [],
      trainingReminderTime: typeof parsed.trainingReminderTime === "string" && /^(\d{2}):(\d{2})$/.test(parsed.trainingReminderTime) ? parsed.trainingReminderTime : initialData.trainingReminderTime,
      trainingReminderIds: Array.isArray(parsed.trainingReminderIds) ? parsed.trainingReminderIds.filter((id: any) => typeof id === "string") : []
    };
  } catch { return initialData; }
}
export async function saveData(data: AppData): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
export async function clearData(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
}
