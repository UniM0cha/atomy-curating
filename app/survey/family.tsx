import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/Button";
import { Illustration } from "@/components/Illustration";
import { OptionCard } from "@/components/OptionCard";
import { Colors } from "@/constants/colors";
import { useStore } from "@/store/useStore";

const FAMILY_OPTIONS = [
  { value: "1", label: "1인" },
  { value: "2", label: "2인" },
  { value: "3", label: "3인" },
  { value: "4", label: "4인" },
  { value: "5+", label: "5인 이상" },
];

export default function FamilySurveyScreen() {
  const router = useRouter();
  const { survey, setSurvey } = useStore();

  const handleSelect = (value: string) => {
    setSurvey("familySize", value);
  };

  const handleNext = () => {
    router.push("/survey/age");
  };

  const handleSkip = () => {
    setSurvey("familySize", null);
    router.push("/survey/age");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 고정 헤더 */}
      <View style={styles.header}>
        {/* 진행 상태 */}
        <View style={styles.progress}>
          <View style={[styles.progressDot, styles.activeDot]} />
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
        </View>

        {/* 일러스트 */}
        <View style={styles.illustrationContainer}>
          <Illustration type="family" size="small" />
        </View>

        {/* 질문 */}
        <Text style={styles.question}>가족 구성원은{"\n"}몇 명인가요?</Text>
        <Text style={styles.hint}>(선택사항)</Text>
      </View>

      {/* 스크롤 가능한 선택지 */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.options}>
          {FAMILY_OPTIONS.map((option) => (
            <OptionCard
              key={option.value}
              title={option.label}
              selected={survey.familySize === option.value}
              onPress={() => handleSelect(option.value)}
            />
          ))}
        </View>
      </ScrollView>

      {/* 하단 버튼 */}
      <View style={styles.footer}>
        <Button title="다음" onPress={handleNext} fullWidth disabled={!survey.familySize} />
        <Button title="건너뛰기" onPress={handleSkip} variant="text" fullWidth />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  progress: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 32,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
  },
  activeDot: {
    backgroundColor: Colors.button,
    width: 24,
  },
  illustrationContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  question: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 8,
    lineHeight: 34,
  },
  hint: {
    fontSize: 14,
    color: Colors.textMuted,
    marginBottom: 24,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  options: {
    gap: 8,
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    gap: 8,
  },
});
