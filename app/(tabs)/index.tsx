import { StyleSheet } from "react-native";

import { View } from "@/components/Themed";
import HomeComponent from "@/components/home/HomeComponent";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <HomeComponent />
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
