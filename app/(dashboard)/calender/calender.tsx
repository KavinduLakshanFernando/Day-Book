import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableWithoutFeedback, Animated, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { saveNote } from "@/services/noteService";
import { Note } from "@/type/note";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";

const CalendarScreenLight = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [note, setNote] = useState<Note>({
    id: "",
    title: "",
    description: "",
    date: "",
    createdAt: "",
  });
  const [loading, setLoading] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;

  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    setNote({ ...note, date: day.dateString });
    setShowForm(true);
  };

  const handleChange = (field: keyof Note, value: string) => {
    setNote({ ...note, [field]: value });
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.description.trim()) {
      Toast.show({ type: "error", text1: "Please fill in all fields" });
      return;
    }

    try {
      setLoading(true);
      const response = await saveNote(note);
      Toast.show({ type: "success", text1: "Note saved successfully!" });
      router.push("/(dashboard)/homepage");
    } catch (error) {
      console.error(error);
      Toast.show({ type: "error", text1: "Failed to save note" });
    } finally {
      setLoading(false);
    }
  };

  return (
      <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1 bg-white"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
          {!showForm ? (
              <View className="flex-1">
                <Text className="text-3xl italic text-gray-900 mb-6">Select a Date</Text>
                <Calendar
                    onDayPress={handleDayPress}
                    markedDates={{
                      [selectedDate]: { selected: true, marked: true, selectedColor: "#2563EB" },
                    }}
                    theme={{
                      backgroundColor: "#FFFFFF",
                      calendarBackground: "#FFFFFF",
                      textSectionTitleColor: "#374151",
                      selectedDayBackgroundColor: "#2563EB",
                      selectedDayTextColor: "#FFFFFF",
                      todayTextColor: "#2563EB",
                      dayTextColor: "#374151",
                      textDisabledColor: "#9CA3AF",
                      dotColor: "#2563EB",
                      selectedDotColor: "#FFFFFF",
                      arrowColor: "#2563EB",
                      monthTextColor: "#374151",
                    }}
                />
                {selectedDate && (
                    <Text className="text-gray-500 text-center mt-4">Selected Date: {selectedDate}</Text>
                )}
              </View>
          ) : (
              <View className="flex-1">
                <View className="flex-row items-center justify-between mb-6">
                  <Text className="text-3xl font-bold text-gray-900">Add Note</Text>
                  <TouchableWithoutFeedback onPress={() => setShowForm(false)}>
                    <Ionicons name="close" size={28} color="#374151" />
                  </TouchableWithoutFeedback>
                </View>

                {/* Title */}
                <Text className="text-gray-700 mb-2 font-medium">Title</Text>
                <TextInput
                    value={note.title}
                    onChangeText={(text) => handleChange("title", text)}
                    placeholder="Enter note title"
                    placeholderTextColor="#9CA3AF"
                    className="border border-gray-300 rounded-xl p-4 mb-4 bg-gray-50 text-gray-900 shadow-sm"
                />

                {/* Description */}
                <Text className="text-gray-700 mb-2 font-medium">Note</Text>
                <TextInput
                    value={note.description}
                    onChangeText={(text) => handleChange("description", text)}
                    placeholder="Write your note..."
                    placeholderTextColor="#9CA3AF"
                    multiline
                    className="border border-gray-300 rounded-xl p-4 h-40 mb-4 bg-gray-50 text-gray-900 shadow-sm"
                />

                {/* Date */}
                <Text className="text-gray-400 mb-4 text-sm">📅 {note.date}</Text>

                {/* Buttons */}
                <View className="flex-row space-x-4">
                  <TouchableOpacity
                      onPress={() => setShowForm(false)}
                      className="flex-1 border border-gray-300 rounded-xl p-4 items-center justify-center bg-white shadow"
                      disabled={loading}
                  >
                    <Text className="text-gray-700 font-semibold text-lg">Cancel</Text>
                  </TouchableOpacity>

                  <TouchableWithoutFeedback
                      onPress={handleSave}
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
                            <Text className="text-white font-semibold text-lg">Save Note</Text>
                        )}
                      </LinearGradient>
                    </Animated.View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
          )}
        </ScrollView>

        <View className="flex-row border-t border-gray-200 bg-white px-4 py-2" >
          <TouchableOpacity className="flex-1 items-center" onPress={() => router.push("/(dashboard)/homepage")}>
            <Ionicons name="home" size={24} color="#9CA3AF" />
            <Text className="text-xs text-gray-400">Home</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 items-center" onPress={() => router.push("/calender/calender")}>
            <Ionicons name="calendar-outline" size={24} color="#2563EB" />
            <Text className="text-xs font-bold text-blue-600">Calendar</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 items-center" onPress={() => router.push("/profile/profile")}>
            <Ionicons name="person-outline" size={24} color="#9CA3AF" />
            <Text className="text-xs text-gray-400">Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Toast */}
        <Toast position="top" />
      </KeyboardAvoidingView>
  );
};

export default CalendarScreenLight;
