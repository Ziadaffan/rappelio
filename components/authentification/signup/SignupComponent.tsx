import React, { useState, useRef, useEffect } from "react";
import {
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Animated,
  ActivityIndicator,
  View,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { ThemedText, ThemedView } from "@/components/Themed";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useTranslation } from "react-i18next";

export default function SignupComponent() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());

  const genderOptions = [
    { label: t("signup.male"), value: "male", icon: "face" as const },
    { label: t("signup.female"), value: "female", icon: "face" as const },
  ];

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    dateOfBirth: new Date(),
    gender: "male",
  });

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

  const handleSubmit = () => {
    // Handle form submission
    console.log(formData);
  };

  return (
    <SafeAreaView className={`flex-1 ${isDarkMode ? "bg-black" : "bg-white"}`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <Animated.View
            className="flex-1 px-6"
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            <ThemedText className="text-5xl font-bold mb-10">
              {t("signup.welcome")}
            </ThemedText>

            {/* Name Input */}
            <ThemedView className="flex-row items-center mb-6 rounded-lg border border-gray-200">
              <ThemedView className="pl-4 pr-2 justify-center">
                <MaterialIcons
                  name="person"
                  size={24}
                  color={isDarkMode ? "#fff" : "#000"}
                />
              </ThemedView>
              <TextInput
                className={`flex-1 h-14 pr-4 pb-2 text-base ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
                placeholder={t("signup.name")}
                placeholderTextColor={isDarkMode ? "#666" : "#999"}
                value={formData.name}
                onChangeText={(text) =>
                  setFormData({ ...formData, name: text })
                }
              />
            </ThemedView>

            {/* Email Input */}
            <ThemedView className="flex-row items-center mb-6 rounded-lg border border-gray-200">
              <ThemedView className="pl-4 pr-2 justify-center">
                <MaterialIcons
                  name="email"
                  size={24}
                  color={isDarkMode ? "#fff" : "#000"}
                />
              </ThemedView>
              <TextInput
                className={`flex-1 h-14 pr-4 pb-2 text-base ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
                placeholder={t("signup.email")}
                placeholderTextColor={isDarkMode ? "#666" : "#999"}
                keyboardType="email-address"
                value={formData.email}
                onChangeText={(text) =>
                  setFormData({ ...formData, email: text })
                }
              />
            </ThemedView>

            {/* Password Input */}
            <ThemedView className="flex-row items-center mb-6 rounded-lg border border-gray-200">
              <ThemedView className="pl-4 pr-2 justify-center">
                <MaterialIcons
                  name="lock"
                  size={24}
                  color={isDarkMode ? "#fff" : "#000"}
                />
              </ThemedView>
              <TextInput
                className={`flex-1 h-14 pr-4 pb-2 text-base ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
                placeholder={t("signup.password")}
                placeholderTextColor={isDarkMode ? "#666" : "#999"}
                secureTextEntry
                value={formData.password}
                onChangeText={(text) =>
                  setFormData({ ...formData, password: text })
                }
              />
            </ThemedView>

            {/* Date of Birth */}
            <ThemedView className="mb-6">
              <ThemedText
                className={`mb-2 text-sm font-medium ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                {t("signup.dateOfBirth")}
              </ThemedText>
              <TouchableOpacity
                onPress={() => {
                  setTempDate(formData.dateOfBirth);
                  setShowDatePicker(true);
                }}
                className="flex-row items-center h-14 px-4 rounded-lg border border-gray-300 bg-transparent"
              >
                <MaterialIcons
                  name="calendar-today"
                  size={24}
                  color={isDarkMode ? "#fff" : "#000"}
                />
                <ThemedText
                  className={`ml-3 text-base ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  {formData.dateOfBirth.toLocaleDateString()}
                </ThemedText>
              </TouchableOpacity>

              {/* Custom Date Picker Modal */}
              {showDatePicker && (
                <View className="mt-4 border rounded-lg border-gray-300 overflow-hidden justify-center items-center">
                  <DateTimePicker
                    value={tempDate}
                    mode="date"
                    display="spinner"
                    onChange={(event, selectedDate) => {
                      if (selectedDate) {
                        setTempDate(selectedDate);
                      }
                    }}
                  />
                  <TouchableOpacity
                    className="bg-blue-500 py-3 w-64 border rounded-lg items-center mb-3"
                    onPress={() => {
                      setFormData({ ...formData, dateOfBirth: tempDate });
                      setShowDatePicker(false);
                    }}
                  >
                    <ThemedText className="text-white font-bold">
                      {t("confirm.confirm")}
                    </ThemedText>
                  </TouchableOpacity>
                </View>
              )}
            </ThemedView>

            {/* Gender Input */}
            {/* Gender */}
            <ThemedView className="mb-6">
              <ThemedText
                className={`mb-2 text-sm font-medium ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                {t("signup.gender")}
              </ThemedText>
              <View className="flex-row space-x-4">
                {genderOptions.map((option) => {
                  const isSelected = formData.gender === option.value;
                  return (
                    <TouchableOpacity
                      key={option.value}
                      onPress={() =>
                        setFormData({ ...formData, gender: option.value })
                      }
                      className={`flex-1 flex-row items-center justify-center h-12 rounded-lg border 
                        ${
                          isSelected
                            ? "border-blue-500 bg-blue-100"
                            : "border-gray-300 bg-transparent"
                        }
                    `}
                    >
                      <MaterialIcons
                        name={option.icon}
                        size={20}
                        color={
                          isSelected ? "#2563eb" : isDarkMode ? "#fff" : "#000"
                        }
                      />
                      <ThemedText
                        className={`ml-2 ${
                          isSelected
                            ? "text-blue-600"
                            : isDarkMode
                            ? "text-white"
                            : "text-black"
                        }`}
                      >
                        {option.label}
                      </ThemedText>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ThemedView>

            {/* Submit Button */}
            <TouchableOpacity
              className="w-full h-14 bg-blue-500 rounded-lg justify-center items-center mt-6 mb-8"
              onPress={handleSubmit}
            >
              <ThemedText className="text-white text-base font-bold">
                {t("signup.signup")}
              </ThemedText>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
