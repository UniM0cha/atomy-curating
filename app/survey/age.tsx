import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/Button';
import { Illustration } from '../../components/Illustration';
import { OptionCard } from '../../components/OptionCard';
import { Colors } from '../../constants/colors';
import { useStore } from '../../store/useStore';

const AGE_OPTIONS = [
  { value: '20s', label: '20대' },
  { value: '30s', label: '30대' },
  { value: '40s', label: '40대' },
  { value: '50s', label: '50대' },
  { value: '60+', label: '60대 이상' },
];

export default function AgeSurveyScreen() {
  const router = useRouter();
  const { survey, setSurvey } = useStore();

  const handleSelect = (value: string) => {
    setSurvey('ageGroup', value);
  };

  const handleNext = () => {
    router.push('/survey/experience');
  };

  const handleSkip = () => {
    setSurvey('ageGroup', null);
    router.push('/survey/experience');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 고정 헤더 */}
      <View style={styles.header}>
        {/* 진행 상태 */}
        <View style={styles.progress}>
          <View style={styles.progressDot} />
          <View style={[styles.progressDot, styles.activeDot]} />
          <View style={styles.progressDot} />
        </View>

        {/* 일러스트 */}
        <View style={styles.illustrationContainer}>
          <Illustration type="age" size="small" />
        </View>

        {/* 질문 */}
        <Text style={styles.question}>연령대가{'\n'}어떻게 되시나요?</Text>
        <Text style={styles.hint}>(선택사항)</Text>
      </View>

      {/* 스크롤 가능한 선택지 */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.options}>
          {AGE_OPTIONS.map((option) => (
            <OptionCard
              key={option.value}
              title={option.label}
              selected={survey.ageGroup === option.value}
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
          disabled={!survey.ageGroup}
        />
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
