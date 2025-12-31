import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Shadows } from '../constants/colors';

interface Props {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  highlight?: boolean;
}

export function ResultCard({ icon, label, value, highlight = false }: Props) {
  return (
    <View style={[styles.card, highlight && styles.highlightCard]}>
      <View style={[styles.iconContainer, highlight && styles.highlightIconContainer]}>
        <Ionicons
          name={icon}
          size={24}
          color={highlight ? Colors.background : Colors.button}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.value, highlight && styles.highlightValue]}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    ...Shadows.card,
  },
  highlightCard: {
    backgroundColor: Colors.button,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E3F7FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  highlightIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  content: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 4,
  },
  value: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
  },
  highlightValue: {
    color: Colors.background,
  },
});
