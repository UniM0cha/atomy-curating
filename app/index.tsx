import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/Button";
import { Illustration } from "@/components/Illustration";
import { Colors } from "@/constants/colors";
import { useStore } from "@/store/useStore";

export default function OnboardingScreen() {
  const router = useRouter();
  const reset = useStore((state) => state.reset);

  const handleStart = () => {
    // 시작 시 스토어 초기화
    reset();
    router.push("/survey/family");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* 로고/일러스트 영역 */}
        <View style={styles.imageContainer}>
          <Illustration type="welcome" size="large" />
        </View>

        {/* 타이틀 */}
        <Text style={styles.title}>애터미 큐레이팅</Text>
        <Text style={styles.subtitle}>소비가 소득이 된다!</Text>

        {/* 설명 */}
        <Text style={styles.description}>
          현재 사용 중인 제품을 애터미로 바꾸면{"\n"}
          얼마나 캐쉬백을 받을 수 있을까요?
        </Text>
      </View>

      {/* 하단 버튼 */}
      <View style={styles.footer}>
        <Button title="시작하기" onPress={handleStart} fullWidth />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  imageContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.button,
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    color: Colors.textLight,
    textAlign: "center",
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
});
