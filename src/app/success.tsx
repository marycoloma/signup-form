import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function SuccessScreen() {
  const { firstName } = useLocalSearchParams<{ firstName: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Success!</Text>
      <Text style={styles.message}>Account created for {firstName}!</Text>
      <Text style={styles.subtext}>
        Your sign-up form was submitted successfully.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: "#16a34a",
    marginBottom: 12,
  },
  message: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  subtext: { fontSize: 15, color: "#555", textAlign: "center" },
});
