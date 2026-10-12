export type Badge = { id: string; category: string; name: string; tier: string; threshold: number; metric: string; icon: string; description: string };
const tiers = [1, 5, 10, 25, 50];
const names: { category: string; icon: string; entries: [string, string, string][] }[] = [
 { category: "Training", icon: "↗", entries: [
  ["Workout Milestone", "workouts", "Complete workouts"], ["Squat", "exercise:squat", "Log squat sessions"], ["Deadlift", "exercise:deadlift", "Log deadlift sessions"], ["Bench Press", "exercise:bench press", "Log bench press sessions"], ["Overhead Press", "exercise:overhead press", "Log overhead press sessions"], ["Push-Up", "exercise:push-up", "Log push-up sessions"], ["Pull-Up", "exercise:pull-up", "Log pull-up sessions"], ["Row", "exercise:row", "Log row sessions"], ["Lunge", "exercise:lunge", "Log lunge sessions"], ["Plank", "exercise:plank", "Log plank sessions"], ["Leg Press", "exercise:leg press", "Log leg press sessions"], ["Romanian Deadlift", "exercise:romanian deadlift", "Log Romanian deadlift sessions"], ["Hip Thrust", "exercise:hip thrust", "Log hip thrust sessions"], ["Dumbbell Press", "exercise:dumbbell press", "Log dumbbell press sessions"], ["Lat Pulldown", "exercise:lat pulldown", "Log lat pulldown sessions"], ["Dip", "exercise:dip", "Log dip sessions"], ["Kettlebell Swing", "exercise:kettlebell swing", "Log kettlebell swing sessions"], ["Burpee", "exercise:burpee", "Log burpee sessions"], ["Box Jump", "exercise:box jump", "Log box jump sessions"], ["Calf Raise", "exercise:calf raise", "Log calf raise sessions"]
 ] },
 { category: "Training", icon: "✦", entries: [
  ["Workout Days", "training-days", "Train on separate days"], ["Weekly Consistency", "workout-weeks", "Train in separate calendar weeks"], ["Early Riser", "morning-workouts", "Train before 9 AM"], ["Weekend Warrior", "weekend-workouts", "Train on weekends"], ["Comeback", "comeback-workouts", "Return after a 7-day break"], ["Personal Records", "personal-records", "Set a new logged weight best"], ["Training Hours", "training-hours", "Accumulate training hours"], ["Strength Builder", "workout-type:strength", "Log strength workouts"], ["Cardio Builder", "workout-type:cardio", "Log cardio workouts"], ["Mobility Practice", "workout-type:mobility", "Log mobility workouts"]
 ] },
 { category: "Nutrition", icon: "◉", entries: [
  ["First Meal", "meals", "Log meals"], ["Breakfast Logger", "meal-type:breakfast", "Log breakfast meals"], ["Lunch Logger", "meal-type:lunch", "Log lunch meals"], ["Dinner Logger", "meal-type:dinner", "Log dinner meals"], ["Balanced Plate", "protein-meals", "Log meals with a protein estimate"], ["Protein Focus", "protein-grams", "Log grams of protein"], ["Home Cook", "home-cooked-meals", "Mark a meal as home cooked in its notes"], ["Mindful Logger", "meal-days", "Log meals on separate days"], ["Colorful Plate", "fruit-veg-meals", "Mention fruit or vegetables in a meal"], ["Nutrition Rhythm", "meal-weeks", "Log meals in separate calendar weeks"]
 ] },
 { category: "Habits", icon: "◇", entries: [
  ["Habit Starter", "habits", "Complete habit check-ins"], ["Water Habit", "habit-name:water", "Complete a habit with water in its name"], ["Sleep Routine", "habit-name:sleep", "Complete a habit with sleep or wind down in its name"], ["Reading Habit", "habit-name:read", "Complete a habit with reading in its name"], ["Stretching Habit", "habit-name:stretch", "Complete a habit with stretching in its name"], ["Daily Check-In", "habit-days", "Check in on separate days"], ["Habit Streak", "streak", "Build consecutive habit days"], ["Mindful Moment", "habit-name:mindful", "Complete a habit with mindful in its name"], ["Plan Ahead", "habit-name:plan", "Complete a habit with plan in its name"], ["Consistent Week", "habit-weeks", "Check in during separate calendar weeks"]
 ] },
 { category: "Consistency", icon: "✳", entries: [
  ["Three-Day Streak", "streak", "Build consecutive habit days"], ["One-Week Streak", "streak", "Build consecutive habit days"], ["Two-Week Streak", "streak", "Build consecutive habit days"], ["Monthly Momentum", "active-days", "Record activity on separate days"], ["Quarterly Rhythm", "active-weeks", "Record activity in separate calendar weeks"], ["Mission Focus", "mission-count", "Complete daily missions"], ["Journey Milestone", "journey-days", "Continue your 90-day journey"], ["Consistency", "active-days", "Record activity on separate days"], ["Personal Best", "personal-records", "Set a new logged weight best"], ["90-Day Journey", "journey-days", "Continue your 90-day journey"]
 ] }
];
export const badges: Badge[] = names.flatMap(group => group.entries.flatMap(([name, metric, action]) => tiers.map((threshold, i) => ({
 id: group.category + ":" + name + ":" + i, category: group.category, name,
 tier: ["Bronze", "Silver", "Gold", "Platinum", "Diamond"][i], threshold, metric, icon: group.icon,
 description: action + " · " + threshold
}))));

const unique = (values: string[]) => new Set(values.filter(Boolean)).size;
const localDate = (value: string) => {
 const d = new Date(value);
 return Number.isNaN(d.getTime()) ? value.slice(0, 10) : d.toLocaleDateString("en-CA");
};
const weekKey = (value: string) => {
 const d = new Date(value);
 if (Number.isNaN(d.getTime())) return value.slice(0, 10);
 d.setHours(0, 0, 0, 0);
 d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
 return localDate(d.toISOString());
};
const consecutiveDays = (days: string[]) => {
 const set = new Set(days);
 let d = new Date(); d.setHours(0, 0, 0, 0);
 let n = 0;
 while (set.has(localDate(d.toISOString()))) { n++; d.setDate(d.getDate() - 1); }
 if (!n) { d = new Date(); d.setDate(d.getDate() - 1); d.setHours(0, 0, 0, 0); while (set.has(localDate(d.toISOString()))) { n++; d.setDate(d.getDate() - 1); } }
 return n;
};
type MetricData = {
 workouts: any[]; meals: any[]; habits: { id: string; name: string; doneDates: string[] }[];
 missions?: Record<string, string[]>; journeyStart?: string;
};
export function badgeCount(metric: string, data: MetricData): number {
 const workouts = data.workouts || [], meals = data.meals || [], habits = data.habits || [];
 if (metric === "workouts") return workouts.length;
 if (metric.startsWith("exercise:")) { const exercise = metric.slice(9); return workouts.reduce((n, w) => n + ((w.sets || []).some((set: any) => String(set.exercise).trim().toLowerCase() === exercise) ? 1 : 0), 0); }
 if (metric === "training-days") return unique(workouts.map(w => localDate(w.date)));
 if (metric === "workout-weeks") return unique(workouts.map(w => weekKey(w.date)));
 if (metric === "morning-workouts") return workouts.filter(w => { const d = new Date(w.date); return !Number.isNaN(d.getTime()) && d.getHours() < 9; }).length;
 if (metric === "weekend-workouts") return workouts.filter(w => { const day = new Date(w.date).getDay(); return day === 0 || day === 6; }).length;
 if (metric === "comeback-workouts") { const sorted = [...workouts].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()); return sorted.reduce((n,w,i) => n + (i > 0 && (new Date(w.date).getTime() - new Date(sorted[i-1].date).getTime()) >= 7 * 86400000 ? 1 : 0), 0); }
 if (metric === "personal-records") { let count = 0; const best = new Map<string, number>(); [...workouts].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()).forEach(w => (w.sets || []).forEach((set: any) => { const key = String(set.exercise).trim().toLowerCase(), weight = Number(set.weight) || 0; if (key && weight > (best.get(key) || 0)) { if (best.has(key)) count++; best.set(key, weight); } })); return count; }
 if (metric === "training-hours") return Math.floor(workouts.reduce((n,w) => n + (Number(w.duration) || 0), 0) / 60);
 if (metric.startsWith("workout-type:")) return workouts.filter(w => String(w.type || "strength").toLowerCase() === metric.slice(13)).length;
 if (metric === "meals") return meals.length;
 if (metric.startsWith("meal-type:")) return meals.filter(m => String(m.type).toLowerCase() === metric.slice(10)).length;
 if (metric === "protein-meals") return meals.filter(m => Number(m.protein) > 0).length;
 if (metric === "protein-grams") return meals.reduce((n,m) => n + (Number(m.protein) || 0), 0);
 if (metric === "home-cooked-meals") return meals.filter(m => /home.?cook/i.test(String(m.notes || ""))).length;
 if (metric === "fruit-veg-meals") return meals.filter(m => /fruit|vegetable|veggie|salad/i.test(String(m.name + " " + m.notes))).length;
 if (metric === "meal-days") return unique(meals.map(m => localDate(m.date)));
 if (metric === "meal-weeks") return unique(meals.map(m => weekKey(m.date)));
 if (metric === "habits") return habits.reduce((n,h) => n + h.doneDates.length, 0);
 if (metric.startsWith("habit-name:")) { const hint = metric.slice(11); return habits.filter(h => String(h.name).toLowerCase().includes(hint)).reduce((n,h) => n + h.doneDates.length, 0); }
 const habitDays = unique(habits.flatMap(h => h.doneDates));
 if (metric === "habit-days") return habitDays;
 if (metric === "habit-weeks") return unique(habits.flatMap(h => h.doneDates.map(weekKey)));
 if (metric === "streak") return consecutiveDays(habits.flatMap(h => h.doneDates));
 const missionDays = Object.entries(data.missions || {}).filter(([key]) => /^\d{4}-\d{2}-\d{2}$/.test(key));
 if (metric === "mission-count") return missionDays.reduce((n,[,v]) => n + new Set(v).size, 0);
 if (metric === "journey-days") { const start = new Date(data.journeyStart || new Date().toISOString()); return Math.max(0, Math.floor((Date.now() - start.getTime()) / 86400000) + 1); }
 const activeDates = unique([...workouts.map(w => localDate(w.date)), ...meals.map(m => localDate(m.date)), ...habits.flatMap(h => h.doneDates)]);
 if (metric === "active-days") return activeDates;
 if (metric === "active-weeks") return unique([...workouts.map(w => weekKey(w.date)), ...meals.map(m => weekKey(m.date)), ...habits.flatMap(h => h.doneDates.map(weekKey))]);
 return 0;
}
