import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Control, Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { signupSchema, SignupValues } from "../validation/signupValidation";

type FormFieldProps = {
  control: Control<SignupValues>;
  name: keyof SignupValues;
  label: string;
  error?: string;
} & Omit<TextInputProps, "value" | "onChangeText" | "onBlur">;

// Reusable labelled input wired to react-hook-form via Controller
function FormField({
  control,
  name,
  label,
  error,
  ...inputProps
}: FormFieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            style={[styles.input, error && styles.inputError]}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            {...inputProps}
          />
        )}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

export default function SignUpScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Only runs when the Zod schema passes; `data` holds the validated (trimmed) values
  const onSubmit = (data: SignupValues) => {
    console.log("Sign-up submitted:", {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    }); // passwords intentionally not logged

    router.push({
      pathname: "/success",
      params: { firstName: data.firstName },
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Create an account</Text>

        <FormField
          control={control}
          name="firstName"
          label="First name"
          error={errors.firstName?.message}
          placeholder="Alex"
          autoCapitalize="words"
        />
        <FormField
          control={control}
          name="lastName"
          label="Last name"
          error={errors.lastName?.message}
          placeholder="Smith"
          autoCapitalize="words"
        />
        <FormField
          control={control}
          name="email"
          label="Email"
          error={errors.email?.message}
          placeholder="alex@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <FormField
          control={control}
          name="password"
          label="Password"
          error={errors.password?.message}
          placeholder="At least 8 characters"
          secureTextEntry
          autoCapitalize="none"
        />
        <FormField
          control={control}
          name="confirmPassword"
          label="Confirm password"
          error={errors.confirmPassword?.message}
          placeholder="Re-enter your password"
          secureTextEntry
          autoCapitalize="none"
        />

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => handleSubmit(onSubmit)()}
          disabled={isSubmitting}
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: "#fff" },
  container: { padding: 24, paddingBottom: 48 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 24 },
  field: { marginBottom: 16 },
  label: { fontSize: 15, fontWeight: "600", marginBottom: 6, color: "#222" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  inputError: { borderColor: "#d32f2f" },
  errorText: { color: "#d32f2f", fontSize: 13, marginTop: 4 },
  button: {
    backgroundColor: "#2563eb",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  buttonPressed: { opacity: 0.8 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
