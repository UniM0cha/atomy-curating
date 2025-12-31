import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/Button";
import { CategorySection } from "@/components/CategorySection";
import { Colors } from "@/constants/colors";
import { categories } from "@/data/products";
import { useStore } from "@/store/useStore";

export default function SelectScreen() {
  const router = useRouter();
  const { selectedProductIds, toggleProduct, selectAllInCategory, clearAllInCategory } = useStore();

  const handleComplete = () => {
    router.push("/result");
  };

  // 총 선택된 제품 수
  const totalSelected = selectedProductIds.length;

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.title}>현재 구입하는{"\n"}제품을 선택해주세요</Text>
        <Text style={styles.selectedCount}>{totalSelected}개 선택됨</Text>
      </View>

      {/* 카테고리 목록 */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {categories.map((category) => (
          <CategorySection
            key={category.id}
            category={category}
            selectedIds={selectedProductIds}
            onToggleProduct={toggleProduct}
            onSelectAll={() =>
              selectAllInCategory(
                category.id,
                category.items.map((item) => item.id),
              )
            }
            onClearAll={() => clearAllInCategory(category.items.map((item) => item.id))}
          />
        ))}
      </ScrollView>

      {/* 하단 버튼 */}
      <View style={styles.footer}>
        <Button
          title={`작성완료 (${totalSelected}개)`}
          onPress={handleComplete}
          fullWidth
          disabled={totalSelected === 0}
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
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.text,
    lineHeight: 34,
    marginBottom: 8,
  },
  selectedCount: {
    fontSize: 14,
    color: Colors.button,
    fontWeight: "500",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
});
