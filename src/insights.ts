import { AppData } from "./store";

const DAY = 86400000;
const dateKey = (value: string | Date) => {
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return String(value).slice(0, 10);
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
};
const startOfDay = (date: Date) => { const d = new Date(date); d.setHours(0, 0, 0, 0); return d; };
const daysAgo = (now: Date, n: number) => { const d = startOfDay(now); d.setDate(d.getDate() - n); return d; };

export type WeeklyReport = {
  workouts: number; previousWorkouts: number; minutes: number;
  mealLogs: number; habitCheckIns: number; activeDays: number; exerciseVariety: number;
};
export function getWeeklyReport(data: AppData, now = new Date()): WeeklyReport {
  const currentStart = daysAgo(now, 6), previousStart = daysAgo(now, 13), today = startOfDay(now);
  const inRange = (value: string, start: Date, end: Date) => {
    const d = new Date(value);
    return !Number.isNaN(d.getTime()) && d >= start && d < end;
  };
  const currentWorkouts = data.workouts.filter(w => inRange(w.date, currentStart, new Date(today.getTime() + DAY)));
  const previousWorkouts = data.workouts.filter(w => inRange(w.date, previousStart, currentStart));
  const currentMeals = data.meals.filter(m => {
    const d = new Date(m.date + "T12:00:00");
    return !Number.isNaN(d.getTime()) && d >= currentStart && d < new Date(today.getTime() + DAY);
  });
  const habitDates = [...new Set(data.habits.flatMap(h => h.doneDates).filter(d => {
    const value = new Date(d + "T12:00:00");
    return !Number.isNaN(value.getTime()) && value >= currentStart && value < new Date(today.getTime() + DAY);
  }))];
  const activeDates = new Set([
    ...currentWorkouts.map(w => dateKey(w.date)),
    ...currentMeals.map(m => dateKey(m.date)),
    ...habitDates
  ]);
  return {
    workouts: currentWorkouts.length,
    previousWorkouts: previousWorkouts.length,
    minutes: currentWorkouts.reduce((n, w) => n + (Number(w.duration) || 0), 0),
    mealLogs: currentMeals.length,
    habitCheckIns: data.habits.reduce((n, h) => n + h.doneDates.filter(d => habitDates.includes(d)).length, 0),
    activeDays: activeDates.size,
    exerciseVariety: new Set(currentWorkouts.flatMap(w => w.sets.map(set => set.exercise.trim().toLowerCase()).filter(Boolean))).size
  };
}

export function getMomentumScore(report: WeeklyReport, weeklyGoal = 4): number {
  const workouts = Math.min(1, report.workouts / Math.max(1, weeklyGoal));
  const habits = Math.min(1, report.activeDays / 7);
  const variety = Math.min(1, report.exerciseVariety / 5);
  return Math.round(workouts * 55 + habits * 30 + variety * 15);
}

export function getTrainingGuidance(report: WeeklyReport): { title: string; detail: string } {
  if (report.workouts === 0) return {
    title: "Restart at your pace",
    detail: "No workouts are logged this week. If you want to return, start with one comfortable 20–30 minute session and build from there."
  };
  if (report.workouts >= 5) return {
    title: "Make room for recovery",
    detail: "You logged " + report.workouts + " workouts this week. Consider an easier day or mobility session before adding more volume."
  };
  if (report.workouts >= 3) return {
    title: "Keep a balanced rhythm",
    detail: "You logged " + report.workouts + " workouts this week. Keep a rest day between harder sessions and vary the exercises you practice."
  };
  return {
    title: "Build a steady cadence",
    detail: "You logged " + report.workouts + " workout" + (report.workouts === 1 ? "" : "s") + " this week. Another manageable session when you feel ready can help build consistency."
  };
}
