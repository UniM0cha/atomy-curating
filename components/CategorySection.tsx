import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";
import type { Category } from "@/types";
import { ProductCheckbox } from "@/components/ProductCheckbox";

interface Props {
  category: Category;
  selectedIds: string[];
  onToggleProduct: (productId: string) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
}

export function CategorySection({ category, selectedIds, onToggleProduct, onSelectAll, onClearAll }: Props) {
  // 카테고리 내 선택된 제품 수
  const selectedCount = category.items.filter((item) => selectedIds.includes(item.id)).length;
  const isAllSelected = selectedCount === category.items.length;

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.categoryName}>{category.name}</Text>
        <TouchableOpacity onPress={isAllSelected ? onClearAll : onSelectAll} activeOpacity={0.7}>
          <Text style={styles.selectButton}>{isAllSelected ? "전체 해제" : "전체 선택"}</Text>
        </TouchableOpacity>
      </View>

      {/* 제품 목록 */}
      <View style={styles.products}>
        {category.items.map((product) => (
          <ProductCheckbox
            key={product.id}
            name={product.name}
            checked={selectedIds.includes(product.id)}
            onPress={() => onToggleProduct(product.id)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
  },
  selectButton: {
    fontSize: 14,
    color: Colors.button,
    fontWeight: "500",
  },
  products: {
    gap: 8,
  },
});
