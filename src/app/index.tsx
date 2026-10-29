import { Control } from "react-hook-form";
import { StyleSheet, Text, TextInputProps, View } from "react-native";
import { SignUpFormData } from "../schemas/signUpSchema";

type FormFieldProps = {
  control: Control<SignUpFormData>;
  name: keyof SignUpFormData;
  label: string;
  error?: string;
} & Omit<TextInputProps, "value" | "onChangeText" | "onBlur">;

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Edit src/app/index.tsx to edit this screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
