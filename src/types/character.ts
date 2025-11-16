// 캐릭터 타입 정의
export interface Character {
  id: string;
  name: string;
  description: string;
  avatar: string;
  personality?: string;
  category?: string;
  systemPrompt?: string;
}

// 메시지 타입 정의
export interface Message {
  id: string;
  characterId: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
  isLoading?: boolean;
}

// 채팅 세션 타입
export interface ChatSession {
  characterId: string;
  messages: Message[];
  lastMessageAt: number;
}
