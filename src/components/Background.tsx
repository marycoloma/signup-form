import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../theme";

export default function Background({ children }: { children: ReactNode }) {
  return (
    <View style={styles.container}>
      <View style={[styles.circle, styles.circleTop]} />
      <View style={[styles.circle, styles.circleBottom]} />
      <View style={[styles.circle, styles.circleSmall]} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    overflow: "hidden",
  },
  circle: {
    position: "absolute",
    borderRadius: 999,
  },
  circleTop: {
    width: 320,
    height: 320,
    top: -140,
    right: -100,
    backgroundColor: colors.accent,
    opacity: 0.35,
  },
  circleBottom: {
    width: 280,
    height: 280,
    bottom: -120,
    left: -110,
    backgroundColor: colors.primary,
    opacity: 0.2,
  },
  circleSmall: {
    width: 90,
    height: 90,
    top: "40%",
    left: -30,
    backgroundColor: colors.accent,
    opacity: 0.25,
  },
});
