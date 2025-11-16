import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { Message } from '@/src/types/character';

interface ChatMessageProps {
  message: Message;
  characterAvatar?: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, characterAvatar }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const isUser = message.role === 'user';

  return (
    <View style={[styles.container, isUser ? styles.containerUser : styles.containerAssistant]}>
      {/* AI 캐릭터 아바타 */}
      {!isUser && characterAvatar && (
        <View style={[styles.avatar, isDark && styles.avatarDark]}>
          <Text style={styles.avatarText}>{characterAvatar}</Text>
        </View>
      )}

      {/* 메시지 버블 */}
      <View
        style={[
          styles.bubble,
          isUser
            ? styles.bubbleUser
            : [styles.bubbleAssistant, isDark && styles.bubbleAssistantDark],
        ]}
      >
        {message.isLoading ? (
          <View style={styles.loadingContainer}>
            <View style={styles.loadingDot} />
            <View style={styles.loadingDot} />
            <View style={styles.loadingDot} />
          </View>
        ) : (
          <Text
            style={[
              styles.messageText,
              isUser ? styles.messageTextUser : [styles.messageTextAssistant, isDark && styles.messageTextDark],
            ]}
          >
            {message.content}
          </Text>
        )}
      </View>

      {/* 사용자 아바타 */}
      {isUser && (
        <View style={styles.userAvatar}>
          <Text style={styles.userAvatarText}>나</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  containerUser: {
    justifyContent: 'flex-end',
  },
  containerAssistant: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  avatarDark: {
    backgroundColor: '#27272a',
  },
  avatarText: {
    fontSize: 18,
  },
  bubble: {
    maxWidth: '75%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
  },
  bubbleUser: {
    backgroundColor: '#3b82f6',
    borderTopRightRadius: 4,
  },
  bubbleAssistant: {
    backgroundColor: '#e5e7eb',
    borderTopLeftRadius: 4,
  },
  bubbleAssistantDark: {
    backgroundColor: '#27272a',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  messageTextUser: {
    color: '#fff',
  },
  messageTextAssistant: {
    color: '#000',
  },
  messageTextDark: {
    color: '#fff',
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  userAvatarText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  loadingContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#9ca3af',
  },
});
