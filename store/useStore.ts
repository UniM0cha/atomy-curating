import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AppState, SurveyData } from '../types';

// 초기 상태
const initialState: Pick<AppState, 'survey' | 'selectedProductIds'> = {
  survey: {
    familySize: null,
    ageGroup: null,
    atomyExperience: null,
  },
  selectedProductIds: [],
};

// Zustand 스토어
export const useStore = create<AppState>()(
  persist(
    (set) => ({
      ...initialState,

      // 설문 응답 설정
      setSurvey: <K extends keyof SurveyData>(key: K, value: SurveyData[K]) => {
        set((state) => ({
          survey: {
            ...state.survey,
            [key]: value,
          },
        }));
      },

      // 제품 선택 토글
      toggleProduct: (productId: string) => {
        set((state) => {
          const isSelected = state.selectedProductIds.includes(productId);
          return {
            selectedProductIds: isSelected
              ? state.selectedProductIds.filter((id) => id !== productId)
              : [...state.selectedProductIds, productId],
          };
        });
      },

      // 카테고리 전체 선택
      selectAllInCategory: (_categoryId: string, productIds: string[]) => {
        set((state) => {
          const newSelectedIds = new Set(state.selectedProductIds);
          productIds.forEach((id) => newSelectedIds.add(id));
          return {
            selectedProductIds: Array.from(newSelectedIds),
          };
        });
      },

      // 카테고리 전체 해제
      clearAllInCategory: (productIds: string[]) => {
        set((state) => ({
          selectedProductIds: state.selectedProductIds.filter(
            (id) => !productIds.includes(id)
          ),
        }));
      },

      // 초기화
      reset: () => {
        set(initialState);
      },
    }),
    {
      name: 'atomy-curating-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
