import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@/components/Button";
import { ResultCard } from "@/components/ResultCard";
import { Colors } from "@/constants/colors";
import { useStore } from "@/store/useStore";
import { calculateResult, formatCurrency, formatNumber, getCategoryCounts } from "@/utils/calculator";

// 외부 링크
const EXTERNAL_LINKS = {
  atomyMall: "https://www.atomy.kr",
  azaMall: "https://atomyaza.co.kr/",
};

export default function ResultScreen() {
  const router = useRouter();
  const { selectedProductIds, reset } = useStore();

  // 결과 계산
  const result = calculateResult(selectedProductIds);
  const categoryCounts = getCategoryCounts(selectedProductIds);

  const handleReset = () => {
    reset();
    router.dismissAll();
  };

  const handleOpenLink = (url: string) => {
    Linking.openURL(url);
  };

  const handleShowInfo = () => {
    router.push("/info");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* 감사 헤더 */}
        <View style={styles.thankYouHeader}>
          <Text style={styles.thankYouText}>설문에 참여해주셔서 감사합니다!</Text>
        </View>

        {/* 선택 요약 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>선택하신 제품</Text>
          <View style={styles.categoryList}>
            {categoryCounts.map((cat) => (
              <View key={cat.id} style={styles.categoryItem}>
                <Text style={styles.categoryName}>{cat.name}</Text>
                <Text style={styles.categoryCount}>{cat.count}개</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 애터미 쇼핑몰 섹션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>애터미 쇼핑몰에서 구매한다면?</Text>
          <View style={styles.priceCard}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>연간 예상 구매금액</Text>
              <Text style={styles.priceValue}>{formatCurrency(result.annualPrice)}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>연간 누적 PV</Text>
              <Text style={styles.priceValue}>{formatNumber(result.annualPV)} PV</Text>
            </View>
          </View>
        </View>

        {/* 혜택 섹션 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>내가 연간 받을 수 있는 혜택은?</Text>
            <TouchableOpacity onPress={handleShowInfo} style={styles.infoButton}>
              <Ionicons name="help-circle-outline" size={20} color={Colors.textLight} />
            </TouchableOpacity>
          </View>

          <View style={styles.benefitCards}>
            <ResultCard icon="repeat-outline" label="연간 캐쉬백 횟수" value={`${result.cashbackCount}회`} />
            <ResultCard
              icon="cash-outline"
              label="연간 총 캐쉬백"
              value={formatCurrency(result.totalCashback)}
              highlight
            />
          </View>
        </View>

        {/* 안내 메시지 */}
        <View style={styles.notice}>
          <Text style={styles.noticeText}>
            * 30만 PV 달성 시 6만원 캐쉬백{"\n"}* 실제 금액은 제품 구성에 따라 달라질 수 있습니다
          </Text>
        </View>

        {/* CTA 섹션 */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>선택하신 제품이 애터미에도 있어요!</Text>
          <Text style={styles.ctaSubtitle}>지금 바로 확인해보세요</Text>
        </View>

        {/* 외부 링크 */}
        <View style={styles.linksSection}>
          <Text style={styles.linksTitle}>더 많은 상품 보기</Text>
          <TouchableOpacity style={styles.linkButton} onPress={() => handleOpenLink(EXTERNAL_LINKS.atomyMall)}>
            <Ionicons name="storefront-outline" size={20} color={Colors.button} />
            <Text style={styles.linkButtonText}>애터미 공식 쇼핑몰</Text>
            <Ionicons name="chevron-forward" size={16} color={Colors.textLight} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkButton} onPress={() => handleOpenLink(EXTERNAL_LINKS.azaMall)}>
            <Ionicons name="cart-outline" size={20} color={Colors.button} />
            <Text style={styles.linkButtonText}>애터미 아자몰</Text>
            <Ionicons name="chevron-forward" size={16} color={Colors.textLight} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* 하단 버튼 */}
      <View style={styles.footer}>
        <Button title="처음으로" onPress={handleReset} fullWidth />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 24,
  },
  thankYouHeader: {
    backgroundColor: Colors.primary,
    paddingVertical: 20,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  thankYouText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  section: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 12,
  },
  infoButton: {
    padding: 4,
    marginBottom: 12,
  },
  categoryList: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
  },
  categoryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  categoryName: {
    fontSize: 14,
    color: Colors.text,
  },
  categoryCount: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.button,
  },
  priceCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: Colors.textLight,
  },
  priceValue: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },
  benefitCards: {
    gap: 12,
  },
  notice: {
    marginTop: 24,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: Colors.card,
    borderRadius: 8,
  },
  noticeText: {
    fontSize: 13,
    color: Colors.textMuted,
    lineHeight: 20,
  },
  ctaSection: {
    marginTop: 32,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
    textAlign: "center",
  },
  ctaSubtitle: {
    fontSize: 14,
    color: Colors.textLight,
    marginTop: 4,
  },
  linksSection: {
    marginTop: 20,
    paddingHorizontal: 24,
  },
  linksTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textLight,
    marginBottom: 12,
  },
  linkButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  linkButtonText: {
    flex: 1,
    fontSize: 15,
    color: Colors.text,
    marginLeft: 12,
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
});
