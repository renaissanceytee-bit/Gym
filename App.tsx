import React, { useMemo, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";

type Tab = "Today" | "Train" | "Fuel" | "Progress";
const lime = "#C4F36B";
const bg = "#10110F";
const panel = "#191B17";

function Card({ children, style }: { children: React.ReactNode; style?: object }) {
  return <View style={[styles.card, style]}>{children}</View>;
}
function SectionTitle({ eyebrow, title, action }: { eyebrow: string; title: string; action?: string }) {
  return <View style={styles.sectionTitle}><View><Text style={styles.eyebrow}>{eyebrow}</Text><Text style={styles.h2}>{title}</Text></View>{action ? <Text style={styles.action}>{action}</Text> : null}</View>;
}

export default function App() {
  const [tab, setTab] = useState<Tab>("Today");
  const [done, setDone] = useState([false, false, false]);
  const [workouts, setWorkouts] = useState(3);
  const missionCount = useMemo(() => done.filter(Boolean).length, [done]);
  const toggle = (i: number) => setDone(current => current.map((v, index) => index === i ? !v : v));
  const tabs: Tab[] = ["Today", "Train", "Fuel", "Progress"];

  return (
    <SafeAreaView style={styles.safe}>
      <ExpoStatusBar style="light" />
      <StatusBar barStyle="light-content" backgroundColor={bg} />
      <View style={styles.header}>
        <View style={styles.brand}><Text style={styles.brandMark}>A</Text><Text style={styles.brandText}>ASCEND</Text></View>
        <TouchableOpacity accessibilityLabel="Profile" style={styles.avatar}><Text style={styles.avatarText}>J</Text></TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {tab === "Today" ? <>
          <Text style={styles.eyebrow}>YOUR PERSONAL COMMAND CENTER</Text>
          <Text style={styles.title}>Good morning, Jordan <Text style={{ color: lime }}>✳</Text></Text>
          <Text style={styles.subhead}>A little progress each day adds up.</Text>
          <View style={styles.statRow}>
            <Card style={styles.stat}><Text style={styles.eyebrow}>THIS WEEK</Text><Text style={styles.statNumber}>{workouts}<Text style={styles.statUnit}> / 4</Text></Text><Text style={styles.caption}>workouts</Text></Card>
            <Card style={styles.stat}><Text style={styles.eyebrow}>STREAK</Text><Text style={styles.statNumber}>7<Text style={styles.statUnit}> days</Text></Text><Text style={styles.caption}>you’re showing up</Text></Card>
          </View>
          <Card>
            <SectionTitle eyebrow="MAKE TODAY COUNT" title="Daily missions" action={missionCount + "/3"} />
            {[["🏋️","Move with intention","Log a workout · +50 XP"],["🥗","Fuel your goals","Log a meal · +30 XP"],["◇","Show up for yourself","Complete a habit · +20 XP"]].map((item, i) => (
              <TouchableOpacity key={item[1]} accessibilityRole="checkbox" accessibilityState={{ checked: done[i] }} onPress={() => toggle(i)} style={styles.mission}>
                <View style={[styles.checkbox, done[i] && styles.checked]}><Text style={styles.checkText}>{done[i] ? "✓" : ""}</Text></View>
                <Text style={styles.emoji}>{item[0]}</Text>
                <View style={{ flex: 1 }}><Text style={styles.missionTitle}>{item[1]}</Text><Text style={styles.caption}>{item[2]}</Text></View>
              </TouchableOpacity>
            ))}
            <Text style={styles.bonus}>✦ Complete all three to earn a 50 XP bonus</Text>
          </Card>
          <Card>
            <SectionTitle eyebrow="YOUR MOMENTUM" title="Progress this week" action="Details →" />
            <View style={styles.progressRow}><Text style={styles.progressBig}>78</Text><View style={{ flex: 1 }}><Text style={styles.missionTitle}>ASCEND Score</Text><Text style={styles.caption}>A reflection of your recent consistency.</Text><View style={styles.progressTrack}><View style={[styles.progressFill, { width: "78%" }]} /></View></View></View>
            <Text style={styles.disclaimer}>Personal progress summary · not a health measure</Text>
          </Card>
          <Card>
            <SectionTitle eyebrow="PICK UP WHERE YOU LEFT OFF" title="Recent training" action="See all →" />
            <View style={styles.workout}><Text style={styles.workoutIcon}>↗</Text><View><Text style={styles.missionTitle}>Upper body strength</Text><Text style={styles.caption}>Yesterday · 48 min</Text></View><Text style={styles.xp}>+120 XP</Text></View>
            <View style={styles.workout}><Text style={styles.workoutIcon}>⌁</Text><View><Text style={styles.missionTitle}>Easy recovery run</Text><Text style={styles.caption}>Wednesday · 32 min</Text></View><Text style={styles.xp}>+85 XP</Text></View>
          </Card>
          <TouchableOpacity style={styles.startButton} onPress={() => setWorkouts(n => n + 1)}><Text style={styles.startText}>＋  Log a workout</Text></TouchableOpacity>
          <Text style={styles.demoNote}>EARLY MOBILE PREVIEW · DATA IS TEMPORARY</Text>
        </> : <View style={styles.placeholder}><Text style={styles.eyebrow}>{tab.toUpperCase()}</Text><Text style={styles.title}>{tab === "Train" ? "Your training" : tab === "Fuel" ? "Nutrition" : "Progress & reflection"}</Text><Text style={styles.subhead}>This mobile section is the next build step. Your design reference is ready.</Text><TouchableOpacity style={styles.startButton} onPress={() => setTab("Today")}><Text style={styles.startText}>Back to Today</Text></TouchableOpacity></View>}
      </ScrollView>
      <View style={styles.tabBar}>{tabs.map(t => <TouchableOpacity key={t} onPress={() => setTab(t)} style={styles.tab}><Text style={[styles.tabIcon, tab === t && styles.tabActive]}>{t === "Today" ? "◫" : t === "Train" ? "↗" : t === "Fuel" ? "◉" : "✳"}</Text><Text style={[styles.tabText, tab === t && styles.tabActive]}>{t}</Text></TouchableOpacity>)}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: bg },
  header: { height: 58, paddingHorizontal: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomWidth: 1, borderBottomColor: "#282B26" },
  brand: { flexDirection: "row", alignItems: "center", gap: 9 },
  brandMark: { width: 27, height: 27, borderRadius: 8, backgroundColor: lime, color: "#17200F", textAlign: "center", textAlignVertical: "center", overflow: "hidden", fontWeight: "900", fontSize: 16 },
  brandText: { color: "#F2F3ED", fontSize: 13, fontWeight: "800", letterSpacing: 2.2 },
  avatar: { width: 31, height: 31, borderRadius: 18, backgroundColor: "#4A5044", alignItems: "center", justifyContent: "center" },
  avatarText: { color: "#FFF", fontWeight: "700" },
  content: { padding: 20, paddingBottom: 32, gap: 14 },
  eyebrow: { color: "#969C8E", fontSize: 9, letterSpacing: 1.1, fontWeight: "700" },
  title: { color: "#F2F3ED", fontSize: 25, lineHeight: 32, fontWeight: "800", letterSpacing: -0.7, marginTop: 8 },
  subhead: { color: "#999F92", fontSize: 12, lineHeight: 18, marginTop: 5, marginBottom: 2 },
  card: { backgroundColor: panel, borderWidth: 1, borderColor: "#2B2E28", borderRadius: 12, padding: 15, marginTop: 2 },
  statRow: { flexDirection: "row", gap: 10 },
  stat: { flex: 1, minHeight: 104, justifyContent: "center" },
  statNumber: { color: "#F4F6EF", fontSize: 27, fontWeight: "800", marginTop: 9 },
  statUnit: { color: "#9CA292", fontSize: 12, fontWeight: "500" },
  caption: { color: "#899083", fontSize: 10, lineHeight: 15, marginTop: 3 },
  sectionTitle: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  h2: { color: "#F1F3EC", fontSize: 15, fontWeight: "700", marginTop: 4 },
  action: { color: lime, fontSize: 10, fontWeight: "700" },
  mission: { minHeight: 57, borderBottomWidth: 1, borderBottomColor: "#292C26", flexDirection: "row", alignItems: "center", gap: 10 },
  checkbox: { width: 18, height: 18, borderWidth: 1, borderColor: "#59604F", borderRadius: 5, alignItems: "center", justifyContent: "center" },
  checked: { backgroundColor: lime, borderColor: lime },
  checkText: { color: "#18200F", fontSize: 11, fontWeight: "900" },
  emoji: { width: 24, textAlign: "center", fontSize: 16 },
  missionTitle: { color: "#E9EBE3", fontSize: 11, fontWeight: "600" },
  bonus: { color: "#B8C4A8", fontSize: 9, backgroundColor: "#22281B", borderRadius: 7, padding: 10, marginTop: 11 },
  progressRow: { flexDirection: "row", alignItems: "center", gap: 14, marginTop: 6 },
  progressBig: { color: lime, fontSize: 42, fontWeight: "800" },
  progressTrack: { height: 4, backgroundColor: "#34392E", borderRadius: 4, marginTop: 9, overflow: "hidden" },
  progressFill: { height: "100%", backgroundColor: lime },
  disclaimer: { color: "#767D70", fontSize: 8, marginTop: 12 },
  workout: { minHeight: 54, flexDirection: "row", alignItems: "center", gap: 10, borderTopWidth: 1, borderTopColor: "#292C26" },
  workoutIcon: { width: 28, height: 28, borderRadius: 7, textAlign: "center", textAlignVertical: "center", overflow: "hidden", color: lime, backgroundColor: "#2A3020", fontSize: 16 },
  xp: { color: "#BCC5AF", fontSize: 9, marginLeft: "auto" },
  startButton: { minHeight: 48, borderRadius: 9, backgroundColor: lime, justifyContent: "center", alignItems: "center", marginTop: 2 },
  startText: { color: "#17200F", fontSize: 12, fontWeight: "800" },
  demoNote: { color: "#636A5E", fontSize: 8, letterSpacing: 1, textAlign: "center", marginTop: 4 },
  placeholder: { minHeight: 380, justifyContent: "center", gap: 10 },
  tabBar: { height: 66, borderTopWidth: 1, borderTopColor: "#282B26", backgroundColor: "#141512", flexDirection: "row", justifyContent: "space-around", alignItems: "center", paddingBottom: 4 },
  tab: { flex: 1, alignItems: "center", gap: 3 },
  tabIcon: { color: "#8C9286", fontSize: 17 },
  tabText: { color: "#8C9286", fontSize: 9, fontWeight: "600" },
  tabActive: { color: lime }
});