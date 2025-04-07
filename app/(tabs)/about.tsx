import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";

export default function DetailsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Welcome to Rappelio !</Text>
        <Text style={styles.description}>
          This app helps you remember your daily chores and shopping tasks.
          Quickly add what you need to do or buy, and get reminders so you never
          forget anything again. Simple, fast, and made to keep you on track
          every day.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 50,
  },
  contentContainer: {
    width: "100%",
    maxWidth: 600,
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
});
