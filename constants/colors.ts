// 애터미 큐레이팅 앱 색상 시스템
export const Colors = {
  // 메인 색상
  primary: '#5BC0DE',
  button: '#00B4D8',

  // 배경 색상
  background: '#FFFFFF',
  card: '#F5F5F5',

  // 텍스트 색상
  text: '#333333',
  textLight: '#666666',
  textMuted: '#999999',

  // 상태 색상
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FF9800',

  // 테두리 색상
  border: '#E5E5E5',
  borderLight: '#F0F0F0',

  // 체크박스/선택 색상
  selected: '#00B4D8',
  unselected: '#CCCCCC',
} as const;

// 그림자 스타일 (카드용)
export const Shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
} as const;
