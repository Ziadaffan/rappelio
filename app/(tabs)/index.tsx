import { StyleSheet } from "react-native";

import { View } from "@/components/Themed";
import ComingSoonComponent from "@/components/ComingSoonComponent";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <ComingSoonComponent />
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
