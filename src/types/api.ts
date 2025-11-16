// API 요청/응답 타입

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface SendMessageRequest {
  characterId: string;
  message: string;
  conversationHistory?: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}

export interface SendMessageResponse {
  id: string;
  content: string;
  characterId: string;
  timestamp: number;
}
