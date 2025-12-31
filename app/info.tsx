import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';

export default function InfoScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="close" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>캐쉬백 안내</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* PV 설명 섹션 */}
        <View style={styles.section}>
          <View style={styles.sectionIcon}>
            <Ionicons name="diamond-outline" size={32} color={Colors.button} />
          </View>
          <Text style={styles.sectionTitle}>애터미 PV란?</Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>
              <Text style={styles.bold}>PV (Point Value)</Text>는 애터미 제품 구매 시 적립되는 포인트입니다.
            </Text>
            <Text style={styles.cardText}>
              모든 애터미 제품에는 가격과 함께 PV가 부여되어 있으며, 제품을 구매할 때마다 해당 PV가 누적됩니다.
            </Text>
          </View>
        </View>

        {/* 캐쉬백 조건 섹션 */}
        <View style={styles.section}>
          <View style={styles.sectionIcon}>
            <Ionicons name="cash-outline" size={32} color={Colors.button} />
          </View>
          <Text style={styles.sectionTitle}>캐쉬백 조건</Text>
          <View style={styles.highlightCard}>
            <View style={styles.highlightRow}>
              <Text style={styles.highlightLabel}>필요 PV</Text>
              <Text style={styles.highlightValue}>300,000 PV</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.highlightRow}>
              <Text style={styles.highlightLabel}>캐쉬백 금액</Text>
              <Text style={styles.highlightValueBig}>60,000원</Text>
            </View>
          </View>
          <Text style={styles.noteText}>
            * 30만 PV를 달성할 때마다 6만원의 캐쉬백을 받을 수 있습니다
          </Text>
        </View>

        {/* 마트체인지 설명 섹션 */}
        <View style={styles.section}>
          <View style={styles.sectionIcon}>
            <Ionicons name="swap-horizontal-outline" size={32} color={Colors.button} />
          </View>
          <Text style={styles.sectionTitle}>마트체인지란?</Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>
              <Text style={styles.bold}>마트체인지</Text>는 기존에 일반 마트에서 구매하던 생활용품, 식품, 화장품 등을 애터미 제품으로 바꾸는 것을 말합니다.
            </Text>
            <Text style={styles.cardText}>
              동일한 품질의 제품을 합리적인 가격에 구매하면서, PV 적립을 통해 캐쉬백까지 받을 수 있는 스마트한 소비 방법입니다.
            </Text>
          </View>
        </View>

        {/* 소비자 네트워크 섹션 */}
        <View style={styles.section}>
          <View style={styles.sectionIcon}>
            <Ionicons name="people-outline" size={32} color={Colors.button} />
          </View>
          <Text style={styles.sectionTitle}>소비자 네트워크</Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>
              애터미는 <Text style={styles.bold}>소비자 중심의 네트워크 마케팅</Text> 회사입니다.
            </Text>
            <Text style={styles.cardText}>
              회원 가입 후 제품을 구매하고 PV를 적립하면, 캐쉬백 혜택을 받을 수 있습니다. 또한 지인에게 애터미를 소개하고 함께 구매하면 더 많은 혜택을 누릴 수 있습니다.
            </Text>
          </View>
        </View>

        {/* 캐쉬백 예시 */}
        <View style={styles.section}>
          <View style={styles.sectionIcon}>
            <Ionicons name="calculator-outline" size={32} color={Colors.button} />
          </View>
          <Text style={styles.sectionTitle}>캐쉬백 계산 예시</Text>
          <View style={styles.exampleCard}>
            <View style={styles.exampleRow}>
              <Text style={styles.exampleLabel}>월 평균 구매 PV</Text>
              <Text style={styles.exampleValue}>50,000 PV</Text>
            </View>
            <View style={styles.exampleRow}>
              <Text style={styles.exampleLabel}>연간 누적 PV</Text>
              <Text style={styles.exampleValue}>600,000 PV</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.exampleRow}>
              <Text style={styles.exampleLabel}>연간 캐쉬백 횟수</Text>
              <Text style={styles.exampleValue}>2회</Text>
            </View>
            <View style={styles.exampleRow}>
              <Text style={styles.exampleLabelBold}>연간 총 캐쉬백</Text>
              <Text style={styles.exampleValueBold}>120,000원</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.text,
  },
  placeholder: {
    width: 32,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingVertical: 24,
    paddingBottom: 40,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: `${Colors.button}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
  },
  cardText: {
    fontSize: 14,
    color: Colors.textLight,
    lineHeight: 22,
    marginBottom: 8,
  },
  bold: {
    fontWeight: '600',
    color: Colors.text,
  },
  highlightCard: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 20,
  },
  highlightRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  highlightLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  highlightValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  highlightValueBig: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginVertical: 12,
  },
  noteText: {
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 8,
  },
  exampleCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
  },
  exampleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  exampleLabel: {
    fontSize: 14,
    color: Colors.textLight,
  },
  exampleValue: {
    fontSize: 14,
    color: Colors.text,
  },
  exampleLabelBold: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  exampleValueBold: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.button,
  },
});
