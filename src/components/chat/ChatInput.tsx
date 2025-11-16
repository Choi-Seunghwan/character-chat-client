import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled = false }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const canSend = message.trim() && !disabled;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <View style={[styles.container, isDark && styles.containerDark]}>
        <View style={[styles.inputContainer, isDark && styles.inputContainerDark]}>
          <TextInput
            style={[styles.input, isDark && styles.inputDark]}
            placeholder="메시지를 입력하세요..."
            placeholderTextColor="#999"
            value={message}
            onChangeText={setMessage}
            multiline
            maxLength={1000}
            editable={!disabled}
            onSubmitEditing={handleSend}
          />
        </View>

        <TouchableOpacity
          onPress={handleSend}
          disabled={!canSend}
          style={[
            styles.sendButton,
            canSend ? styles.sendButtonActive : [styles.sendButtonInactive, isDark && styles.sendButtonInactiveDark],
          ]}
        >
          <Ionicons
            name="send"
            size={20}
            color={canSend ? '#fff' : '#999'}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  containerDark: {
    backgroundColor: '#111',
    borderTopColor: '#27272a',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  inputContainerDark: {
    backgroundColor: '#18181b',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    maxHeight: 100,
  },
  inputDark: {
    color: '#fff',
  },
  sendButton: {
    marginLeft: 8,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonActive: {
    backgroundColor: '#3b82f6',
  },
  sendButtonInactive: {
    backgroundColor: '#d1d5db',
  },
  sendButtonInactiveDark: {
    backgroundColor: '#27272a',
  },
});
