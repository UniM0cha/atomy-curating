import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';

interface Props {
  name: string;
  checked: boolean;
  onPress: () => void;
}

export function ProductCheckbox({ name, checked, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.container, checked && styles.checkedContainer]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.checkbox, checked && styles.checkedCheckbox]}>
        {checked && <Ionicons name="checkmark" size={16} color={Colors.background} />}
      </View>
      <Text style={[styles.name, checked && styles.checkedName]}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: Colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  checkedContainer: {
    borderColor: Colors.selected,
    backgroundColor: '#F0FAFC',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.unselected,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkedCheckbox: {
    backgroundColor: Colors.selected,
    borderColor: Colors.selected,
  },
  name: {
    fontSize: 15,
    color: Colors.text,
  },
  checkedName: {
    color: Colors.selected,
    fontWeight: '500',
  },
});
