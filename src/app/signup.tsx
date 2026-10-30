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
import Background from "../components/Background";
import { colors } from "../theme";
import { signupSchema, SignupValues } from "../validation/signupValidation";

type FormFieldProps = {
  control: Control<SignupValues>;
  name: keyof SignupValues;
  label: string;
  error?: string;
} & Omit<TextInputProps, "value" | "onChangeText" | "onBlur">;

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
            placeholderTextColor={colors.muted}
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
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: SignupValues) => {
    console.log("Sign-up submitted:", {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    });

    router.push({
      pathname: "/success",
      params: { firstName: data.firstName },
    });
  };

  return (
    <Background>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            <Text style={styles.title}>Create an account</Text>
            <Text style={styles.subtitle}>
              Fill in your details to get started
            </Text>

            <FormField
              control={control}
              name="firstName"
              label="First name"
              error={errors.firstName?.message}
              placeholder="Alex"
              autoCapitalize="words"
              autoComplete="given-name"
            />
            <FormField
              control={control}
              name="lastName"
              label="Last name"
              error={errors.lastName?.message}
              placeholder="Smith"
              autoCapitalize="words"
              autoComplete="family-name"
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
              autoComplete="email"
            />
            <FormField
              control={control}
              name="password"
              label="Password"
              error={errors.password?.message}
              placeholder="At least 8 characters"
              secureTextEntry
              autoCapitalize="none"
              autoComplete="new-password"
            />
            <FormField
              control={control}
              name="confirmPassword"
              label="Confirm password"
              error={errors.confirmPassword?.message}
              placeholder="Re-enter your password"
              secureTextEntry
              autoCapitalize="none"
              autoComplete="new-password"
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
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Background>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    paddingBottom: 48,
  },
  card: {
    width: "100%",
    maxWidth: 460,
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
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: colors.muted,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 24,
  },
  field: { marginBottom: 16 },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: colors.primaryDark,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: colors.background,
    color: colors.text,
  },
  inputError: { borderColor: colors.error, backgroundColor: "#FEF2F2" },
  errorText: { color: colors.error, fontSize: 13, marginTop: 4 },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 8,
  },
  buttonPressed: { backgroundColor: colors.primaryDark },
  buttonText: { color: "#fff", fontSize: 17, fontWeight: "700" },
});
