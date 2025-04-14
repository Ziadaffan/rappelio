import { ThemedText, ThemedView } from "@/components/Themed";
import { StyleSheet } from "react-native";

export default function SignInComponent() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>SignIn</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
