import { apiClient } from './client';
import { SendMessageRequest, SendMessageResponse, ApiResponse } from '@/src/types/api';
import { Character } from '@/src/types/character';

export const chatApi = {
  // 캐릭터 목록 조회
  getCharacters: async (): Promise<Character[]> => {
    const response = await apiClient.get<ApiResponse<Character[]>>('/characters');
    return response.data.data;
  },

  // 메시지 전송
  sendMessage: async (request: SendMessageRequest): Promise<SendMessageResponse> => {
    const response = await apiClient.post<ApiResponse<SendMessageResponse>>(
      '/chat/message',
      request
    );
    return response.data.data;
  },

  // 대화 히스토리 조회
  getChatHistory: async (characterId: string) => {
    const response = await apiClient.get(`/chat/history/${characterId}`);
    return response.data.data;
  },
};
