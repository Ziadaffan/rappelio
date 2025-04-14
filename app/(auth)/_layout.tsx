import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          title: "Login",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="signin"
        options={{
          title: "Sign In",
          headerShown: false,
        }}
      />
    </Stack>
  );
} 