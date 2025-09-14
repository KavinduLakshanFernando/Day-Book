import { saveNote } from "@/services/noteService";
import { Note } from "@/type/note";
import React, { useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Animated, TouchableWithoutFeedback, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

const AddNoteDark = () => {
  const scale = useRef(new Animated.Value(1)).current;

  const [note, setNote] = useState<Note>({
    id: "",
    title: "",
    description: "",
    date: (() => {
      const d = new Date();
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(d.getDate()).padStart(2, "0")} ${String(
        d.getHours()
      ).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
    })(),
    createdAt: new Date().toISOString(),
  });

  const handleChange = (key: keyof Note, value: string) => {
    setNote((prevNote) => ({
      ...prevNote,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    if (note.title && note.description) {
      try {
        let response = await saveNote(note);
        console.log("Note saved with ID:", response?.id);
        router.push("/(dashboard)/homepage");
      } catch (error) {
        console.error("Error saving note:", error);
        alert("Failed to save note.");
      }
    } else {
      alert("Please fill in all fields.");
    }
  };
  const [loading, setLoading] = useState(false);

  const onPress = async () => {
    if (loading) return;
    setLoading(true);
    await handleSave();
    setLoading(false);
  }

  return (
    <LinearGradient
      colors={["#111827", "#1F2937", "#1E293B"]} // dark gradient
      style={{ flex: 1 }}
    >
      <View className="flex-1 p-5 mt-12">
        <Text className="text-3xl font-extrabold text-white mb-6">
          Add New Note
        </Text>

        {/* Title */}
        <Text className="text-gray-300 font-medium mb-1">Title</Text>
        <TextInput
          value={note.title}
          onChangeText={(text) => handleChange("title", text)}
          placeholder="Enter note title"
          className="border border-gray-600 rounded-xl p-3 mb-4 bg-gray-800 text-white shadow-sm"
          placeholderTextColor="#9CA3AF"
        />

        {/* Note */}
        <Text className="text-gray-300 font-medium mb-1">Note</Text>
        <TextInput
          value={note.description}
          onChangeText={(text) => handleChange("description", text)}
          placeholder="Write your note..."
          multiline
          className="border border-gray-600 rounded-xl p-3 h-32 mb-4 bg-gray-800 text-white shadow-sm"
          placeholderTextColor="#9CA3AF"
        />

        {/* Date */}
        <Text className="text-gray-400 mb-4">📅 {note.date}</Text>

        {/* Save Button */}
        <TouchableWithoutFeedback
            onPress={onPress}
            disabled={loading} // disable button while loading
            onPressIn={() => Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start()}
            onPressOut={() => Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start()}
          >
            <Animated.View style={{ transform: [{ scale }] }}>
              <LinearGradient
                colors={["#2563EB", "#1D4ED8"]}
                style={{ padding: 16, borderRadius: 12, alignItems: "center", justifyContent: "center", minWidth: 150 }}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text className="text-white text-lg font-semibold">Save Note</Text>
                )}
              </LinearGradient>
            </Animated.View>
    </TouchableWithoutFeedback>

      </View>
    </LinearGradient>
  );
};

export default AddNoteDark;
