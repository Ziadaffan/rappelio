import { StyleSheet } from "react-native";
import { ThemedView, ThemedText } from "@/components/Themed";
import { TAB_CONTAINER_MARGIN_TOP } from "@/constants/Spacing";
import { TAB_TITLE_MARGIN_BOTTOM } from "@/constants/Spacing";
import { TAB_TITLE_MARGIN_LEFT } from "@/constants/Spacing";
import { TAB_CONTENT_CONTAINER_PADDING_HORIZONTAL } from "@/constants/Spacing";
import { useTranslation } from "react-i18next";

export default function DetailsScreen() {
  const { t } = useTranslation();
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.contentContainer}>
        <ThemedText type="title" style={styles.title}>
          {t("about.title")}
        </ThemedText>
        <ThemedText type="default" style={styles.description}>
          {t("about.description")}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: TAB_CONTAINER_MARGIN_TOP,
  },
  title: {
    marginBottom: TAB_TITLE_MARGIN_BOTTOM,
    marginLeft: TAB_TITLE_MARGIN_LEFT,
  },
  contentContainer: {
    paddingHorizontal: TAB_CONTENT_CONTAINER_PADDING_HORIZONTAL,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
});
