import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import LogInComponent from "@/components/authentification/login/LogInComponent";

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? '';
const API_KEY = process.env.EXPO_PUBLIC_API_KEY ?? '';

export default function TabOneScreen() {
  console.log(`API URL is ${API_URL}`);
  console.log(`API KEY is ${API_KEY}`);
  return (  
    <View style={styles.container}>
      <LogInComponent />
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
