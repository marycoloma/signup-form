import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Background from "../components/Background";
import { colors } from "../theme";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  function handleSignIn() {
    router.replace("/");
  }

  function handleSignUp() {
    router.push("/signup");
  }

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>✦</Text>
          </View>
          <Text style={styles.title}>Welcome to Our App</Text>
          <Text style={styles.subtitle}>Please sign in to continue</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={colors.muted}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={colors.muted}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleSignIn}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </Pressable>

          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>New here?</Text>
            <View style={styles.line} />
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.secondaryPressed,
            ]}
            onPress={handleSignUp}
          >
            <Text style={styles.secondaryText}>Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 24,
    shadowColor: colors.primaryDark,
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 16,
  },
  logoText: { fontSize: 30, color: colors.primary },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 6,
    textAlign: "center",
    color: colors.text,
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 24,
    textAlign: "center",
    color: colors.muted,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    backgroundColor: colors.background,
    fontSize: 16,
    color: colors.text,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 4,
  },
  buttonPressed: { backgroundColor: colors.primaryDark },
  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 18,
  },
  line: { flex: 1, height: 1, backgroundColor: colors.border },
  dividerText: { marginHorizontal: 10, color: colors.muted, fontSize: 13 },
  secondaryButton: {
    borderWidth: 2,
    borderColor: colors.primary,
    padding: 13,
    borderRadius: 12,
    alignItems: "center",
  },
  secondaryPressed: { backgroundColor: colors.primaryLight },
  secondaryText: {
    color: colors.primary,
    fontSize: 17,
    fontWeight: "bold",
  },
});
