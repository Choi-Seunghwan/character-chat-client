import { create } from 'zustand';
import { Character, Message } from '@/src/types/character';

interface ChatState {
  // 현재 선택된 캐릭터
  currentCharacter: Character | null;

  // 모든 캐릭터 목록
  characters: Character[];

  // 각 캐릭터별 메시지 (characterId를 키로 사용)
  messagesByCharacter: Record<string, Message[]>;

  // Actions
  setCurrentCharacter: (character: Character) => void;
  setCharacters: (characters: Character[]) => void;
  addMessage: (characterId: string, message: Message) => void;
  updateMessage: (characterId: string, messageId: string, updates: Partial<Message>) => void;
  clearMessages: (characterId: string) => void;
  getMessages: (characterId: string) => Message[];
}

export const useChatStore = create<ChatState>((set, get) => ({
  currentCharacter: null,
  characters: [],
  messagesByCharacter: {},

  setCurrentCharacter: (character) => set({ currentCharacter: character }),

  setCharacters: (characters) => set({ characters }),

  addMessage: (characterId, message) =>
    set((state) => ({
      messagesByCharacter: {
        ...state.messagesByCharacter,
        [characterId]: [...(state.messagesByCharacter[characterId] || []), message],
      },
    })),

  updateMessage: (characterId, messageId, updates) =>
    set((state) => ({
      messagesByCharacter: {
        ...state.messagesByCharacter,
        [characterId]: state.messagesByCharacter[characterId]?.map((msg) =>
          msg.id === messageId ? { ...msg, ...updates } : msg
        ) || [],
      },
    })),

  clearMessages: (characterId) =>
    set((state) => ({
      messagesByCharacter: {
        ...state.messagesByCharacter,
        [characterId]: [],
      },
    })),

  getMessages: (characterId) => get().messagesByCharacter[characterId] || [],
}));
