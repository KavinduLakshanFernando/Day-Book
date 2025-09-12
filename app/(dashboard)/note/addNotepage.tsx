import { saveNote } from "@/services/noteService";
import { Note } from "@/type/note";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

const AddNote = () => {
  const [note, setNote] = useState<Note>({
    id: "",
    title: "",
    description: "",
    date: (() => {
      const d = new Date();
      return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
    })(),
    createdAt: new Date().toISOString(),
  });



  const handleChange = (key: keyof Note, value: string) => {
    setNote((prevNote) => ({
      ...prevNote,
      [key]: value,
    }));
  };

  const handleSave = async() => {
    // Logic to save the note (e.g., call a service or API)
    console.log("Note saved:", note);

    if (note.title && note.description) {
      try {
        let respone = await saveNote(note);
        console.log("Note saved with ID:", respone?.id);
        alert("Note saved successfully!");

      } catch (error) {
        console.error("Error saving note:", error);
        alert("Failed to save note.");
      }
    } else {
      alert("Please fill in all fields.");
    }
       
  }

  return (
    <View className="flex-1 bg-white p-5">
      <Text className="text-2xl font-bold mb-4">Add New Note</Text>

      <Text className="text-gray-700 mb-1">Title</Text>
      <TextInput
        value={note.title}
        onChangeText={(text) => handleChange("title", text)}
        placeholder="Enter note title"
        className="border border-gray-300 rounded-lg p-3 mb-4"
      />

      <Text className="text-gray-700 mb-1">Note</Text>
      <TextInput
        value={note.description}
        onChangeText={(text) => handleChange("description", text)}
        placeholder="Write your note..."
        multiline
        className="border border-gray-300 rounded-lg p-3 h-32 mb-4"
      />

      <Text className="text-gray-500 mb-4">📅 {note.date}</Text>

      <TouchableOpacity
        className="bg-blue-600 p-4 rounded-lg items-center"
        onPress={handleSave}
      >
        <Text className="text-white text-lg font-semibold">Save Note</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddNote;
