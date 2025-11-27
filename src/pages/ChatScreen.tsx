import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useChatStore } from '@/src/stores/useChatStore';
import { ChatMessage } from '@/src/components/chat/ChatMessage';
import { ChatInput } from '@/src/components/chat/ChatInput';
import { CharacterSwitcher } from '@/src/components/character/CharacterSwitcher';
import { Character, Message } from '@/src/types/character';

// 임시 목 데이터
const MOCK_CHARACTERS: Character[] = [
  {
    id: '1',
    name: 'Emma',
    description: '친절하고 유쾌한 일상 대화 파트너',
    avatar: '👩',
    personality: 'friendly',
    category: 'friend',
  },
  {
    id: '2',
    name: 'Marcus',
    description: '전문적인 조언을 제공하는 멘토',
    avatar: '👨‍💼',
    personality: 'professional',
    category: 'professional',
  },
  {
    id: '3',
    name: 'Luna',
    description: '창의적이고 예술적인 대화를 나누는 친구',
    avatar: '🎨',
    personality: 'creative',
    category: 'creative',
  },
];

export const ChatScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [showCharacterSwitcher, setShowCharacterSwitcher] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const {
    currentCharacter,
    characters,
    messagesByCharacter,
    setCurrentCharacter,
    setCharacters,
    addMessage,
    updateMessage,
  } = useChatStore();

  // 초기 데이터 로드
  useEffect(() => {
    setCharacters(MOCK_CHARACTERS);
    if (!currentCharacter && MOCK_CHARACTERS.length > 0) {
      setCurrentCharacter(MOCK_CHARACTERS[0]);
    }
  }, [currentCharacter, setCharacters, setCurrentCharacter]);

  // 현재 캐릭터의 메시지 가져오기
  const currentMessages = currentCharacter ? messagesByCharacter[currentCharacter.id] || [] : [];

  // 메시지 전송 처리
  const handleSendMessage = async (content: string) => {
    if (!currentCharacter) return;

    // 사용자 메시지 추가
    const userMessage: Message = {
      id: Date.now().toString(),
      characterId: currentCharacter.id,
      content,
      role: 'user',
      timestamp: Date.now(),
    };
    addMessage(currentCharacter.id, userMessage);

    // 로딩 메시지 추가
    const loadingMessageId = `${Date.now()}-loading`;
    const loadingMessage: Message = {
      id: loadingMessageId,
      characterId: currentCharacter.id,
      content: '',
      role: 'assistant',
      timestamp: Date.now(),
      isLoading: true,
    };
    addMessage(currentCharacter.id, loadingMessage);
    setIsTyping(true);

    // TODO: 실제 API 호출로 대체
    setTimeout(() => {
      updateMessage(currentCharacter.id, loadingMessageId, {
        content: `안녕하세요! ${currentCharacter.name}입니다. "${content}"라고 말씀하셨군요. 어떻게 도와드릴까요?`,
        isLoading: false,
      });
      setIsTyping(false);
    }, 1500);

    // 스크롤을 맨 아래로
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  // 캐릭터 선택 처리
  const handleSelectCharacter = (character: Character) => {
    setCurrentCharacter(character);
  };

  if (!currentCharacter) {
    return (
      <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, isDark && styles.textDark]}>캐릭터를 선택해주세요</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      {/* 헤더 */}
      <View style={[styles.header, isDark && styles.headerDark]}>
        <TouchableOpacity onPress={() => setShowCharacterSwitcher(true)} style={styles.headerButton}>
          <View style={[styles.avatar, isDark && styles.avatarDark]}>
            <Text style={styles.avatarText}>{currentCharacter.avatar}</Text>
          </View>
          <View style={styles.headerInfo}>
            <Text style={[styles.characterName, isDark && styles.textDark]}>{currentCharacter.name}</Text>
            <Text style={[styles.characterStatus, isDark && styles.textSecondaryDark]}>
              {isTyping ? '입력 중...' : currentCharacter.description}
            </Text>
          </View>
          <Ionicons name="chevron-down" size={20} color={isDark ? '#999' : '#666'} />
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="ellipsis-vertical" size={20} color={isDark ? '#999' : '#666'} />
        </TouchableOpacity> */}
      </View>

      {/* 메시지 리스트 */}
      {currentMessages.length === 0 ? (
        <View style={styles.emptyChat}>
          <Text style={styles.emptyAvatarLarge}>{currentCharacter.avatar}</Text>
          <Text style={[styles.emptyName, isDark && styles.textDark]}>{currentCharacter.name}</Text>
          <Text style={[styles.emptyDescription, isDark && styles.textSecondaryDark]}>
            {currentCharacter.description}
          </Text>
          <Text style={styles.emptyHint}>대화를 시작해보세요!</Text>
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={currentMessages}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messageList}
          renderItem={({ item }) => <ChatMessage message={item} characterAvatar={currentCharacter.avatar} />}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />
      )}

      {/* 입력 영역 */}
      <ChatInput onSend={handleSendMessage} disabled={isTyping} />

      {/* 캐릭터 전환 모달 */}
      <CharacterSwitcher
        visible={showCharacterSwitcher}
        onClose={() => setShowCharacterSwitcher(false)}
        characters={characters}
        currentCharacter={currentCharacter}
        onSelectCharacter={handleSelectCharacter}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  headerDark: {
    backgroundColor: '#111',
    borderBottomColor: '#222',
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarDark: {
    backgroundColor: '#27272a',
  },
  avatarText: {
    fontSize: 24,
  },
  headerInfo: {
    flex: 1,
  },
  characterName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  characterStatus: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  textDark: {
    color: '#fff',
  },
  textSecondaryDark: {
    color: '#9ca3af',
  },
  menuButton: {
    marginLeft: 8,
    padding: 8,
  },
  messageList: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#6b7280',
  },
  emptyChat: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyAvatarLarge: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  emptyHint: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
  },
});
