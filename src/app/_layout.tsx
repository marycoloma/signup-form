import { Stack } from "expo-router";
import { colors } from "../theme";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "700" },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Welcome" }} />
      <Stack.Screen name="signup" options={{ title: "Sign Up" }} />
      <Stack.Screen name="success" options={{ title: "Success" }} />
    </Stack>
  );
}
