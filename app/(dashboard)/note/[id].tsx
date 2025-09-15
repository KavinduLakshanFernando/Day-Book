import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { fetchNoteById, updateNote } from "@/services/noteService";
import { Note } from "@/type/note";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";

const EditNoteLight = () => {
  const { id } = useLocalSearchParams();
  const scale = useRef(new Animated.Value(1)).current;

  const [note, setNote] = useState<Note>({
    id: "",
    title: "",
    description: "",
    date: "",
    createdAt: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetchingNote, setFetchingNote] = useState(true);

  useEffect(() => {
    const loadNote = async () => {
      if (!id || typeof id !== "string") {
        Toast.show({ type: "error", text1: "Invalid note ID" });
        router.back();
        return;
      }
      try {
        setFetchingNote(true);
        const fetchedNote = await fetchNoteById(id);
        if (fetchedNote) setNote(fetchedNote);
        else {
          Toast.show({ type: "error", text1: "Note not found" });
          router.back();
        }
      } catch (error) {
        console.error(error);
        Toast.show({ type: "error", text1: "Failed to load note" });
        router.back();
      } finally {
        setFetchingNote(false);
      }
    };
    loadNote();
  }, [id]);

  const handleChange = (key: keyof Note, value: string) => {
    setNote(prev => ({ ...prev, [key]: value }));
  };

  const handleUpdate = async () => {
    if (!note.title.trim() || !note.description.trim()) {
      Toast.show({ type: "error", text1: "Please fill in all fields" });
      return;
    }

    try {
      setLoading(true);
      await updateNote(note.id!, {
        title: note.title.trim(),
        description: note.description.trim(),
        date: note.date,
        createdAt: note.createdAt,
      });
      Toast.show({ type: "success", text1: "Note updated successfully" });
      router.back();
    } catch (error) {
      console.error(error);
      Toast.show({ type: "error", text1: "Failed to update note" });
    } finally {
      setLoading(false);
    }
  };

  if (fetchingNote) {
    return (
        <LinearGradient colors={["#FFFFFF", "#F9FAFB"]} style={{ flex: 1 }}>
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#2563EB" />
            <Text className="text-gray-400 mt-2">Loading note...</Text>
          </View>
        </LinearGradient>
    );
  }

  return (
      <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1 bg-white"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
          {/* Header */}
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-3xl font-bold text-gray-900">Edit Note</Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close" size={28} color="#374151" />
            </TouchableOpacity>
          </View>

          {/* Title Input */}
          <Text className="text-gray-700 font-medium mb-2">Title</Text>
          <TextInput
              value={note.title}
              onChangeText={text => handleChange("title", text)}
              placeholder="Enter note title"
              className="border border-gray-300 rounded-xl p-4 mb-4 bg-gray-50 text-gray-900 shadow-sm"
              placeholderTextColor="#9CA3AF"
              editable={!loading}
          />

          {/* Description Input */}
          <Text className="text-gray-700 font-medium mb-2">Note</Text>
          <TextInput
              value={note.description}
              onChangeText={text => handleChange("description", text)}
              placeholder="Write your note..."
              multiline
              className="border border-gray-300 rounded-xl p-4 h-40 mb-4 bg-gray-50 text-gray-900 shadow-sm"
              placeholderTextColor="#9CA3AF"
              editable={!loading}
          />

          {/* Created Date */}
          <Text className="text-gray-400 mb-4 text-sm">📅 Created: {note.date}</Text>

          {/* Buttons */}
          <View className="flex-row space-x-4">
            <TouchableOpacity
                onPress={() => router.back()}
                className="flex-1 border border-gray-300 rounded-xl p-4 items-center justify-center bg-white shadow"
                disabled={loading}
            >
              <Text className="text-gray-700 font-semibold text-lg">Cancel</Text>
            </TouchableOpacity>

            <TouchableWithoutFeedback
                onPress={() => handleUpdate()}
                disabled={loading}
                onPressIn={() => Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start()}
                onPressOut={() => Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start()}
            >
              <Animated.View style={{ transform: [{ scale }], flex: 1 }}>
                <LinearGradient
                    colors={["#2563EB", "#1D4ED8"]}
                    className="rounded-xl p-4 items-center justify-center shadow"
                >
                  {loading ? (
                      <ActivityIndicator size="small" color="#fff" />
                  ) : (
                      <Text className="text-white font-semibold text-lg">Update Note</Text>
                  )}
                </LinearGradient>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </ScrollView>

        {/* Toast */}
        <Toast position="top" />
      </KeyboardAvoidingView>
  );
};

export default EditNoteLight;
