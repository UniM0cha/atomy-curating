import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

type IllustrationType = 'welcome' | 'family' | 'age' | 'experience';

interface IllustrationProps {
  type: IllustrationType;
  size?: 'small' | 'large';
}

// 일러스트 타입별 아이콘 구성
const ILLUSTRATION_CONFIG: Record<IllustrationType, {
  icon: keyof typeof Ionicons.glyphMap;
  secondaryIcons?: (keyof typeof Ionicons.glyphMap)[];
}> = {
  welcome: {
    icon: 'cart-outline',
    secondaryIcons: ['cash-outline', 'trending-up-outline', 'gift-outline'],
  },
  family: {
    icon: 'people-outline',
    secondaryIcons: ['home-outline', 'heart-outline'],
  },
  age: {
    icon: 'person-outline',
    secondaryIcons: ['calendar-outline', 'happy-outline'],
  },
  experience: {
    icon: 'sparkles-outline',
    secondaryIcons: ['star-outline', 'ribbon-outline'],
  },
};

export function Illustration({ type, size = 'large' }: IllustrationProps) {
  const config = ILLUSTRATION_CONFIG[type];
  const isLarge = size === 'large';

  const containerSize = isLarge ? 150 : 100;
  const mainIconSize = isLarge ? 60 : 40;
  const secondaryIconSize = isLarge ? 24 : 18;

  return (
    <View style={[styles.container, { width: containerSize, height: containerSize }]}>
      {/* 배경 원 */}
      <View style={[styles.mainCircle, { width: containerSize, height: containerSize, borderRadius: containerSize / 2 }]}>
        {/* 메인 아이콘 */}
        <Ionicons name={config.icon} size={mainIconSize} color={Colors.button} />
      </View>

      {/* 보조 아이콘들 */}
      {config.secondaryIcons && config.secondaryIcons.map((iconName, index) => {
        const positions = [
          { top: -5, right: isLarge ? 15 : 5 },
          { bottom: isLarge ? 15 : 10, left: -5 },
          { bottom: -5, right: isLarge ? 30 : 15 },
        ];
        const position = positions[index] || positions[0];

        return (
          <View
            key={iconName}
            style={[
              styles.secondaryCircle,
              position,
              {
                width: isLarge ? 40 : 30,
                height: isLarge ? 40 : 30,
                borderRadius: isLarge ? 20 : 15
              }
            ]}
          >
            <Ionicons name={iconName} size={secondaryIconSize} color="#FFFFFF" />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  mainCircle: {
    backgroundColor: `${Colors.primary}30`,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Colors.primary,
  },
  secondaryCircle: {
    position: 'absolute',
    backgroundColor: Colors.button,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
});
