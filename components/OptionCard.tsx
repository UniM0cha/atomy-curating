import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors, Shadows } from "@/constants/colors";

interface Props {
  title: string;
  selected: boolean;
  onPress: () => void;
}

export function OptionCard({ title, selected, onPress }: Props) {
  return (
    <TouchableOpacity style={[styles.card, selected && styles.selectedCard]} onPress={onPress} activeOpacity={0.7}>
      <Text style={[styles.title, selected && styles.selectedTitle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    borderWidth: 2,
    borderColor: Colors.border,
    ...Shadows.card,
  },
  selectedCard: {
    borderColor: Colors.selected,
    backgroundColor: "#E3F7FA",
  },
  title: {
    fontSize: 16,
    color: Colors.text,
    textAlign: "center",
    fontWeight: "500",
  },
  selectedTitle: {
    color: Colors.selected,
    fontWeight: "600",
  },
});
