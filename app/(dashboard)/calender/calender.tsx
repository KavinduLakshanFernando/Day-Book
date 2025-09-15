import React, { useState } from "react";
import { View, Text, TextInput, TouchableWithoutFeedback, Animated, ActivityIndicator, Touchable } from "react-native";
import { Calendar } from "react-native-calendars";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { saveNote } from "@/services/noteService";
import { Note } from "@/type/note";

const CalendarScreen = () => {
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
  const scale = new Animated.Value(1);

  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    setNote({ ...note, date: day.dateString });
    setShowForm(true); // show your dark form
  };

  const handleChange = (field: string, value: string) => {
    setNote({ ...note, [field]: value });
  };

  const handleSave = async () => {
      if (note.title && note.description) {
        try {
          setLoading(true);
          let response = await saveNote(note);
          console.log("Note saved with ID:", response?.id);
          router.push("/(dashboard)/homepage");
        } catch (error) {
          console.error("Error saving note:", error);
          alert("Failed to save note.");
        } finally {
          setLoading(false);
        }
      } else {
        alert("Please fill in all fields.");
      }
    };
  
  

  return (
    <LinearGradient colors={["#111827", "#1F2937", "#1E293B"]} style={{ flex: 1 }}>
      {!showForm ? (
        <View style={{ flex: 1, padding: 16, marginTop: 40 }}>
          <Calendar
            onDayPress={handleDayPress}
            markedDates={{
              [selectedDate]: { selected: true, marked: true, selectedColor: "#2563EB" },
            }}
            theme={{
              backgroundColor: "#111827",
              calendarBackground: "#111827",
              textSectionTitleColor: "#FFFFFF",
              selectedDayBackgroundColor: "#2563EB",
              selectedDayTextColor: "#FFFFFF",
              todayTextColor: "#03DAC6",
              dayTextColor: "#FFFFFF",
              textDisabledColor: "#555555",
              dotColor: "#2563EB",
              selectedDotColor: "#FFFFFF",
              arrowColor: "#BB86FC",
              monthTextColor: "#FFFFFF",
            }}
          />
          {selectedDate ? (
            <Text style={{ color: "#9CA3AF", textAlign: "center", marginTop: 20 }}>
              Selected Date: {selectedDate}
            </Text>
          ) : null}
        </View>
      ) : (
        <View style={{ flex: 1, padding: 20, marginTop: 40 }}>
          <Text style={{ color: "#FFFFFF", fontSize: 28, fontWeight: "bold", marginBottom: 16 }}>
            Add New Note
          </Text>

          {/* Title */}
          <Text style={{ color: "#9CA3AF", marginBottom: 4 }}>Title</Text>
          <TextInput
            value={note.title}
            onChangeText={(text) => handleChange("title", text)}
            placeholder="Enter note title"
            placeholderTextColor="#6B7280"
            style={{
              borderWidth: 1,
              borderColor: "#374151",
              borderRadius: 12,
              padding: 12,
              marginBottom: 12,
              color: "#FFFFFF",
              backgroundColor: "#1F2937",
            }}
          />

          {/* Note */}
          <Text style={{ color: "#9CA3AF", marginBottom: 4 }}>Note</Text>
          <TextInput
            value={note.description}
            onChangeText={(text) => handleChange("description", text)}
            placeholder="Write your note..."
            multiline
            placeholderTextColor="#6B7280"
            style={{
              borderWidth: 1,
              borderColor: "#374151",
              borderRadius: 12,
              padding: 12,
              height: 120,
              marginBottom: 12,
              color: "#FFFFFF",
              backgroundColor: "#1F2937",
              textAlignVertical: "top",
            }}
          />

          {/* Date */}
          <Text style={{ color: "#9CA3AF", marginBottom: 12 }}>📅 {note.date}</Text>

          {/* Save Button */}
          <TouchableWithoutFeedback
            onPress={handleSave}
            disabled={loading}
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
                  <Text style={{ color: "#FFFFFF", fontSize: 18, fontWeight: "600" }}>Save Note</Text>
                )}
              </LinearGradient>
            </Animated.View>
          </TouchableWithoutFeedback>

          {/* Cancel */}
          <TouchableWithoutFeedback
            onPress={() => setShowForm(false)}
          >
            <Text style={{ color: "#9CA3AF", textAlign: "center", marginTop: 12 }}>Cancel</Text>
          </TouchableWithoutFeedback>
        </View>
      )}
    </LinearGradient>
  );
};

export default CalendarScreen;
