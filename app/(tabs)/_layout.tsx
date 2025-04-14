import React from "react";
import { Tabs } from "expo-router";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground.ios";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Platform } from "react-native";
import { useTranslation } from "react-i18next";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("tabs.home"),
          tabBarIcon: ({ color }) => <IconSymbol name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: t("tabs.about"),
          tabBarIcon: ({ color }) => <IconSymbol name="info.circle.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t("tabs.profile.title"),
          tabBarIcon: ({ color }) => <IconSymbol name="person.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
