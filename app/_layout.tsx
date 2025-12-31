import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#FFFFFF' },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="survey/family" />
        <Stack.Screen name="survey/age" />
        <Stack.Screen name="survey/experience" />
        <Stack.Screen name="select" />
        <Stack.Screen name="result" />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}
