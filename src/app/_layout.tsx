import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Welcome" }} />
      <Stack.Screen name="signup" options={{ title: "Sign Up" }} />
      <Stack.Screen name="success" options={{ title: "Success" }} />
    </Stack>
  );
}
