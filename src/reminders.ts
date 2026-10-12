import { Platform } from "react-native";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true
  })
});

export type ReminderResult = { ids: string[]; permissionGranted: boolean };
export async function scheduleWorkoutReminders(days: number[], time: string, previousIds: string[]): Promise<ReminderResult> {
  const uniqueDays = [...new Set(days)].sort();
  if (uniqueDays.length) {
    const match = /^(\d{2}):(\d{2})$/.exec(time);
    if (!match || Number(match[1]) > 23 || Number(match[2]) > 59) throw new Error("Enter a reminder time in 24-hour format, such as 18:30.");
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("workout-reminders", {
        name: "Workout reminders",
        importance: Notifications.AndroidImportance.DEFAULT
      });
    }
    let { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") status = (await Notifications.requestPermissionsAsync()).status;
    if (status !== "granted") return { ids: previousIds, permissionGranted: false };
  }
  await Promise.all(previousIds.map(id => Notifications.cancelScheduledNotificationAsync(id).catch(() => undefined)));
  if (!uniqueDays.length) return { ids: [], permissionGranted: true };
  const match = /^(\d{2}):(\d{2})$/.exec(time)!;
  const ids: string[] = [];
  try {
    for (const day of uniqueDays) {
      if (!Number.isInteger(day) || day < 0 || day > 6) continue;
      // App preferences use Monday=0; Expo's calendar triggers use Sunday=1.
      const weekday = ((day + 1) % 7) + 1;
      ids.push(await Notifications.scheduleNotificationAsync({
        content: {
          title: "A little progress today",
          body: "Your planned workout is here when you are ready.",
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
          weekday,
          hour: Number(match[1]),
          minute: Number(match[2]),
          channelId: "workout-reminders"
        }
      }));
    }
    return { ids, permissionGranted: true };
  } catch (error) {
    await Promise.all(ids.map(id => Notifications.cancelScheduledNotificationAsync(id).catch(() => undefined)));
    throw error;
  }
}
