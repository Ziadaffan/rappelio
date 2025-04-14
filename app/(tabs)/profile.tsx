import { View } from "@/components/Themed";
import {
  Text,
  StyleSheet,
  useColorScheme,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors, Spacing, BorderRadius, FontSize } from "@/constants/Colors";
import { useTranslation } from "react-i18next";
import { useGetUser } from "@/hooks/useGetUser";
import { useEffect, useState } from "react";
import { User } from "@/services/user";
import { formatDate } from "./utils/profile.utils";
import * as Localization from "expo-localization";

export default function Profile() {
  const { t } = useTranslation();
  const locale = Localization.locale.split("-")[0];
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const [user, setUser] = useState<User>();
  const { data, isLoading, error } = useGetUser();
  const isDark = colorScheme === "dark";

  useEffect(() => {
    setUser(data);
  }, [data]);

  return (
    <ScrollView
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          backgroundColor: isDark
            ? Colors.dark.background
            : Colors.light.background,
        },
      ]}
      contentContainerStyle={isLoading ? styles.scrollContentCentered : null}
    >
      {data && (
        <View>
          {/* Header Section */}
          <View
            style={[
              styles.header,
              {
                backgroundColor: isDark
                  ? Colors.dark.background
                  : Colors.light.background,
              },
            ]}
          >
            <View style={styles.profileImageContainer}>
              <Image
                source={{
                  uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || '')}&background=007AFF&color=fff&size=200&bold=true&format=png`,
                }}
                style={styles.profileImage}
              />
            </View>
            <Text
              style={[
                styles.name,
                { color: isDark ? Colors.dark.text : Colors.light.text },
              ]}
            >
              {user?.name}
            </Text>
          </View>

          {/* Stats Section */}
          <View
            style={[
              styles.statsContainer,
              {
                backgroundColor: isDark
                  ? Colors.dark.background
                  : Colors.background.paper,
              },
            ]}
          >
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: Colors.primary.main }]}>
                {user?.tasksCompleted || 0}
              </Text>
              <Text
                style={[
                  styles.statLabel,
                  { color: isDark ? Colors.dark.icon : Colors.text.secondary },
                ]}
              >
                {t("tabs.profile.tasksCompleted")}
              </Text>
            </View>
            <View
              style={[
                styles.statDivider,
                {
                  backgroundColor: isDark
                    ? Colors.dark.border
                    : Colors.border.light,
                },
              ]}
            />
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: Colors.primary.main }]}>
                {user?.projectsActive || 0}
              </Text>
              <Text
                style={[
                  styles.statLabel,
                  { color: isDark ? Colors.dark.icon : Colors.text.secondary },
                ]}
              >
                {t("tabs.profile.projectsActive")}
              </Text>
            </View>
          </View>

          {/* Info Section */}
          <View
            style={[
              styles.infoContainer,
              {
                backgroundColor: isDark
                  ? Colors.dark.background
                  : Colors.light.background,
              },
            ]}
          >
            <View style={styles.infoItem}>
              <Ionicons
                name="mail-outline"
                size={24}
                color={isDark ? Colors.dark.icon : Colors.light.icon}
              />
              <Text
                style={[
                  styles.infoText,
                  { color: isDark ? Colors.dark.text : Colors.light.text },
                ]}
              >
                {user?.email}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons
                name="calendar-outline"
                size={24}
                color={isDark ? Colors.dark.icon : Colors.light.icon}
              />
              <Text
                style={[
                  styles.infoText,
                  { color: isDark ? Colors.dark.text : Colors.light.text },
                ]}
              >
                {t("tabs.profile.dateOfBirth")}
                {" : "}
                {formatDate(user?.dateOfBirth, locale)}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.settingsContainer,
              {
                backgroundColor: isDark
                  ? Colors.dark.background
                  : Colors.light.background,
              },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.settingItem,
                {
                  borderBottomColor: isDark
                    ? Colors.dark.border
                    : Colors.border.light,
                },
              ]}
            >
              <Ionicons
                name="log-out-outline"
                size={24}
                color={isDark ? Colors.dark.icon : Colors.light.icon}
              />
              <Text
                style={[
                  styles.settingText,
                  { color: isDark ? Colors.dark.text : Colors.light.text },
                ]}
              >
                {t("logout.title")}
              </Text>
              <Ionicons
                name="chevron-forward"
                size={24}
                color={isDark ? Colors.dark.icon : Colors.light.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary.main} />
        </View>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {typeof error === "string"
              ? error
              : error.message || "An error occurred"}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContentCentered: {
    flexGrow: 1,
    justifyContent: "center",
  },
  loadingContainer: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    padding: Spacing.lg,
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: Spacing.md,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: BorderRadius.round,
  },
  editImageButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary.main,
    width: 36,
    height: 36,
    borderRadius: BorderRadius.round,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: FontSize.xl,
    fontWeight: "bold",
    marginBottom: Spacing.xs,
  },
  role: {
    fontSize: FontSize.md,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: Spacing.lg,
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: FontSize.xl,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: FontSize.sm,
    marginTop: Spacing.xs,
  },
  statDivider: {
    width: 1,
  },
  infoContainer: {
    padding: Spacing.lg,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  infoText: {
    marginLeft: Spacing.md,
    fontSize: FontSize.md,
  },
  settingsContainer: {
    padding: Spacing.lg,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
  },
  settingText: {
    flex: 1,
    marginLeft: Spacing.md,
    fontSize: FontSize.md,
  },
  errorContainer: {
    padding: Spacing.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: Colors.error.main,
    fontSize: FontSize.md,
  },
});
