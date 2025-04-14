import { ThemedText, ThemedView } from "@/components/Themed";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Animated,
  ActivityIndicator,
} from "react-native";
import { useRef, useEffect } from "react";
import { useRouter } from "expo-router";
import { ContainerStyle } from "@/constants/Spacing";
import { Colors, Spacing, BorderRadius, FontSize } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useLogin } from "@/hooks/useLogin";

export default function LogInComponent() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    handleLogin,
    success,
  } = useLogin();
  
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const router = useRouter();

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={ContainerStyle()}
    >
      <Animated.View
        style={[
          styles.formContainer,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <ThemedText style={styles.title}>Welcome Back</ThemedText>

        {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}
        {success ? <ThemedText style={styles.success}>{success}</ThemedText> : null}

        <ThemedView style={styles.inputContainer}>
          <MaterialIcons
            name="email"
            size={24}
            color={isDarkMode ? Colors.dark.icon : Colors.light.icon}
            style={styles.inputIcon}
          />
          <TextInput
            style={[
              styles.input,
              { color: isDarkMode ? Colors.dark.text : Colors.light.text },
            ]}
            placeholder="Email"
            placeholderTextColor={
              isDarkMode ? Colors.dark.icon : Colors.light.icon
            }
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </ThemedView>

        <ThemedView style={styles.inputContainer}>
          <MaterialIcons
            name="lock"
            size={24}
            color={isDarkMode ? Colors.dark.icon : Colors.light.icon}
            style={styles.inputIcon}
          />
          <TextInput
            style={[
              styles.input,
              { color: isDarkMode ? Colors.dark.text : Colors.light.text },
            ]}
            placeholder="Password"
            placeholderTextColor={
              isDarkMode ? Colors.dark.icon : Colors.light.icon
            }
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </ThemedView>

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={Colors.background.default} />
          ) : (
            <ThemedText style={styles.buttonText}>Log In</ThemedText>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => router.push("/")}
        >
          <ThemedText style={styles.linkText}>
            Don't have an account? Sign up
          </ThemedText>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
  },
  title: {
    fontSize: FontSize.title,
    fontWeight: "bold",
    marginBottom: Spacing.xl,
    paddingTop: Spacing.xxl,
    marginTop: Spacing.xxl,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  inputIcon: {
    padding: Spacing.md,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: Spacing.md,
    fontSize: 16,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: Colors.primary.main,
    borderRadius: BorderRadius.md,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Spacing.lg,
  },
  buttonDisabled: {
    backgroundColor: Colors.primary.light,
  },
  buttonText: {
    color: Colors.background.default,
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: Colors.error.main,
    marginBottom: Spacing.md,
    textAlign: "center",
  },
  success: {
    color: Colors.success.main,
    marginBottom: Spacing.md,
    textAlign: "center",
  },
  linkButton: {
    marginTop: Spacing.lg,
    alignItems: "center",
  },
  linkText: {
    color: Colors.primary.main,
    fontSize: 14,
  },
});
