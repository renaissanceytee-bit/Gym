export type Badge = { id: string; category: string; name: string; tier: string; threshold: number; metric: string; icon: string; description: string };
const families: { category: string; names: string[]; metric: Badge["metric"]; icon: string }[] = [
 { category:"Training", metric:"exercise", icon:"↗", names:["First Workout","Squat","Deadlift","Bench Press","Overhead Press","Push-Up","Pull-Up","Row","Lunge","Plank","Leg Press","Romanian Deadlift","Hip Thrust","Dumbbell Press","Lat Pulldown","Dip","Kettlebell Swing","Burpee","Box Jump","Calf Raise"] },
 { category:"Training", metric:"workouts", icon:"✦", names:["Workout Days","Weekly Consistency","Early Riser","Weekend Warrior","Comeback","Personal Records","Training Hours","Strength Builder","Cardio Builder","Mobility Practice"] },
 { category:"Nutrition", metric:"meals", icon:"◉", names:["First Meal","Breakfast Logger","Lunch Logger","Dinner Logger","Balanced Plate","Protein Focus","Home Cook","Mindful Logger","Colorful Plate","Nutrition Rhythm"] },
 { category:"Habits", metric:"habits", icon:"◇", names:["Habit Starter","Water Habit","Sleep Routine","Reading Habit","Stretching Habit","Daily Check-In","Habit Streak","Mindful Moment","Plan Ahead","Consistent Week"] },
 { category:"Consistency", metric:"streak", icon:"✳", names:["Three-Day Streak","One-Week Streak","Two-Week Streak","Monthly Momentum","Quarterly Rhythm","Mission Focus","Journey Milestone","Consistency","Personal Best","90-Day Journey"] }
];
export const badges: Badge[] = families.flatMap(f => f.names.flatMap(name => [1,5,10,25,50].map((threshold, i) => ({
 id: f.category + ":" + name + ":" + i, category:f.category, name,
 tier:["Bronze","Silver","Gold","Platinum","Diamond"][i], threshold,
 metric:name === "First Workout" ? "workouts" : f.metric === "exercise" ? "exercise:" + name.toLowerCase() : f.metric, icon:f.icon,
 description:`Reach ${threshold} ${f.metric === "workouts" ? "workouts" : f.metric === "meals" ? "meal logs" : f.metric === "habits" ? "habit check-ins" : "streak days"}`
}))));
export function badgeCount(metric: string, data: {workouts:any[];meals:any[];habits:{doneDates:string[]}[]}) {
 if(metric==="workouts") return data.workouts.length;\n if(metric.startsWith("exercise:")) { const exercise=metric.slice(9); return data.workouts.reduce((n,w)=>n+(w.sets||[]).filter((set:any)=>String(set.exercise).trim().toLowerCase()===exercise).length,0); }
 if(metric==="meals") return data.meals.length;
 if(metric==="habits") return data.habits.reduce((n,h)=>n+h.doneDates.length,0);
 const dates=data.habits.flatMap(h=>h.doneDates);
 let n=0,d=new Date(); d.setHours(0,0,0,0);
 while(dates.includes(d.toISOString().slice(0,10))){n++;d.setDate(d.getDate()-1)}
 if(!n){d=new Date();d.setDate(d.getDate()-1);d.setHours(0,0,0,0);while(dates.includes(d.toISOString().slice(0,10))){n++;d.setDate(d.getDate()-1)}}
 return n;
}
