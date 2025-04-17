import { ThemedText, ThemedView } from "@/components/Themed";
import {
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Animated,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRef, useEffect } from "react";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useLogin } from "@/hooks/useLogin";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
    <SafeAreaView className={`flex-1 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <Animated.View
          className="flex-1 px-6 py-8"
          style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
        >
          <ThemedText className="text-5xl font-bold mb-10">{t("login.welcome")}</ThemedText>

          {error ? <ThemedText className="text-red-500 mb-4 text-center">{error}</ThemedText> : null}
          {success ? <ThemedText className="text-green-500 mb-4 text-center">{success}</ThemedText> : null}

          <ThemedView className="flex-row items-center mb-6 rounded-lg border border-gray-200">
            <ThemedView className="pl-4 pr-2 justify-center">
              <MaterialIcons
                name="email"
                size={24}
                color={isDarkMode ? "#fff" : "#000"}
              />
            </ThemedView>
            <TextInput
              className={`flex-1 h-14 pr-4 pb-2 text-base ${isDarkMode ? 'text-white' : 'text-black'}`}
              placeholder={t("login.email")}
              placeholderTextColor={isDarkMode ? "#666" : "#999"}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </ThemedView>

          <ThemedView className="flex-row items-center mb-6 rounded-lg border border-gray-200">
            <ThemedView className="pl-4 pr-2 justify-center">
              <MaterialIcons
                name="lock"
                size={24}
                color={isDarkMode ? "#fff" : "#000"}
              />
            </ThemedView>
            <TextInput
              className={`flex-1 h-14 pr-4 pb-2 text-base ${isDarkMode ? 'text-white' : 'text-black'}`}
              placeholder={t("login.password")}
              placeholderTextColor={isDarkMode ? "#666" : "#999"}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </ThemedView>

          <TouchableOpacity
            className={`w-full h-14 bg-blue-500 rounded-lg justify-center items-center mt-6 ${isLoading ? 'opacity-50' : ''}`}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <ThemedText className="text-white text-base font-bold">{t("login.login")}</ThemedText>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            className="mt-6 items-center"
            onPress={() => router.push("/signup")}
          >
            <ThemedText className="text-blue-500 text-sm">
              {t("login.dontHaveAccount")}
            </ThemedText>
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
