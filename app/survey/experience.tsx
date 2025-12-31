import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/Button';
import { Illustration } from '../../components/Illustration';
import { OptionCard } from '../../components/OptionCard';
import { Colors } from '../../constants/colors';
import { useStore } from '../../store/useStore';

const EXPERIENCE_OPTIONS = [
  { value: 'yes', label: '예, 사용해본 적 있어요' },
  { value: 'no', label: '아니요, 처음이에요' },
  { value: 'skip', label: '선택 안함' },
];

export default function ExperienceSurveyScreen() {
  const router = useRouter();
  const { survey, setSurvey } = useStore();

  const handleSelect = (value: string) => {
    setSurvey('atomyExperience', value);
  };

  const handleNext = () => {
    router.push('/select');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 고정 헤더 */}
      <View style={styles.header}>
        {/* 진행 상태 */}
        <View style={styles.progress}>
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
          <View style={[styles.progressDot, styles.activeDot]} />
        </View>

        {/* 일러스트 */}
        <View style={styles.illustrationContainer}>
          <Illustration type="experience" size="small" />
        </View>

        {/* 질문 */}
        <Text style={styles.question}>애터미 제품을{'\n'}사용해 보신 적 있나요?</Text>
      </View>

      {/* 스크롤 가능한 선택지 */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.options}>
          {EXPERIENCE_OPTIONS.map((option) => (
            <OptionCard
              key={option.value}
              title={option.label}
              selected={survey.atomyExperience === option.value}
              onPress={() => handleSelect(option.value)}
            />
          ))}
        </View>
      </ScrollView>

      {/* 하단 버튼 */}
      <View style={styles.footer}>
        <Button
          title="다음"
          onPress={handleNext}
          fullWidth
          disabled={!survey.atomyExperience}
        />
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
    flexDirection: 'row',
    justifyContent: 'center',
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
    alignItems: 'center',
    marginBottom: 24,
  },
  question: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 24,
    lineHeight: 34,
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
  },
});
