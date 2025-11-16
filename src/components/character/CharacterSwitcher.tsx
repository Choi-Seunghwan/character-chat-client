import React from 'react';
import { View, Text, Modal, TouchableOpacity, FlatList, Pressable, StyleSheet, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Character } from '@/src/types/character';

interface CharacterSwitcherProps {
  visible: boolean;
  onClose: () => void;
  characters: Character[];
  currentCharacter: Character | null;
  onSelectCharacter: (character: Character) => void;
}

export const CharacterSwitcher: React.FC<CharacterSwitcherProps> = ({
  visible,
  onClose,
  characters,
  currentCharacter,
  onSelectCharacter,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleSelect = (character: Character) => {
    onSelectCharacter(character);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable
          style={[styles.modal, isDark && styles.modalDark]}
          onPress={(e) => e.stopPropagation()}
        >
          {/* 헤더 */}
          <View style={[styles.header, isDark && styles.headerDark]}>
            <Text style={[styles.title, isDark && styles.textDark]}>
              캐릭터 선택
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color={isDark ? '#999' : '#666'} />
            </TouchableOpacity>
          </View>

          {/* 캐릭터 목록 */}
          <FlatList
            data={characters}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => {
              const isSelected = currentCharacter?.id === item.id;
              return (
                <TouchableOpacity
                  onPress={() => handleSelect(item)}
                  style={[
                    styles.characterItem,
                    isSelected
                      ? [styles.characterItemSelected, isDark && styles.characterItemSelectedDark]
                      : [styles.characterItemDefault, isDark && styles.characterItemDefaultDark],
                  ]}
                >
                  <View style={[styles.characterAvatar, isDark && styles.characterAvatarDark]}>
                    <Text style={styles.characterAvatarText}>{item.avatar}</Text>
                  </View>
                  <View style={styles.characterInfo}>
                    <Text style={[styles.characterName, isDark && styles.textDark]}>
                      {item.name}
                    </Text>
                    <Text style={[styles.characterDescription, isDark && styles.textSecondaryDark]}>
                      {item.description}
                    </Text>
                  </View>
                  {isSelected && (
                    <Ionicons name="checkmark-circle" size={24} color="#3b82f6" />
                  )}
                </TouchableOpacity>
              );
            }}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
  },
  modalDark: {
    backgroundColor: '#111',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerDark: {
    borderBottomColor: '#27272a',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  textDark: {
    color: '#fff',
  },
  textSecondaryDark: {
    color: '#9ca3af',
  },
  list: {
    padding: 16,
  },
  characterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    borderRadius: 16,
  },
  characterItemDefault: {
    backgroundColor: '#f9fafb',
  },
  characterItemDefaultDark: {
    backgroundColor: '#18181b',
  },
  characterItemSelected: {
    backgroundColor: '#eff6ff',
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  characterItemSelectedDark: {
    backgroundColor: '#1e3a8a',
  },
  characterAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  characterAvatarDark: {
    backgroundColor: '#27272a',
  },
  characterAvatarText: {
    fontSize: 32,
  },
  characterInfo: {
    flex: 1,
  },
  characterName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  characterDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
});
