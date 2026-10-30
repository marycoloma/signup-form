import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Background from "../components/Background";
import { colors } from "../theme";

export default function SuccessScreen() {
  const { firstName } = useLocalSearchParams<{ firstName: string }>();
  const router = useRouter();

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.checkCircle}>
            <Text style={styles.check}>✓</Text>
          </View>
          <Text style={styles.heading}>Success!</Text>
          <Text style={styles.message}>Account created for {firstName}!</Text>
          <Text style={styles.subtext}>
            Your sign-up form was submitted successfully.
          </Text>

          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => router.replace("/")}
          >
            <Text style={styles.buttonText}>Back to Welcome</Text>
          </Pressable>
        </View>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  card: {
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 28,
    shadowColor: colors.primaryDark,
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  checkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  check: { color: "#fff", fontSize: 40, fontWeight: "700" },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.primaryDark,
    marginBottom: 10,
  },
  message: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
    color: colors.text,
  },
  subtext: {
    fontSize: 15,
    color: colors.muted,
    textAlign: "center",
    marginBottom: 24,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignSelf: "stretch",
    alignItems: "center",
  },
  buttonPressed: { backgroundColor: colors.primaryDark },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
