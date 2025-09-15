import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {router, useRouter} from "expo-router";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/firebase";
import { deleteNote } from "@/services/noteService";
import { Note } from "@/type/note";
import Toast from "react-native-toast-message";
import { MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";

export default function DiaryAppHomePage() {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(collection(db, "notes"), (querySnapshot) => {
      const allNotes = querySnapshot.docs
          .filter((doc) => doc.data().uId === auth.currentUser?.uid)
          .map((doc) => ({ ...doc.data(), id: doc.id } as Note))
          .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

      setNotes(allNotes);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteNote(id);
      Toast.show({
        type: "success",
        text1: "Note Deleted",
        text2: "Your note has been removed 🗑️",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Delete Failed",
        text2: "Something went wrong ❌",
      });
    }
  };

  const handleEdit = (noteId: string) => {
    router.push(`/(dashboard)/note/${noteId}`);
  };

  return (
      <SafeAreaView className="flex-1 bg-white">
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 py-4 border-b border-gray-200">
          <Text className="text-xl italic text-gray-1000">📓 My Notebook</Text>
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={26} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Recent Entries */}
        <ScrollView className="flex-1 px-5">
          <Text className="text-2xl font-bold text-gray-800 mt-4 mb-3">Recent Notes</Text>

          {loading ? (
              <View className="flex-1 items-center mt-10">
                <ActivityIndicator size="large" color="#2563EB" />
                <Text className="text-gray-500 mt-2">Loading notes...</Text>
              </View>
          ) : notes.length === 0 ? (
              <View className="flex-1 items-center mt-10">
                <MaterialCommunityIcons name="notebook-outline" size={50} color="#9CA3AF" />
                <Text className="text-gray-500 mt-3 text-lg">No notes yet</Text>
                <Text className="text-gray-400 text-sm">Start by adding your first note ✏️</Text>
              </View>
          ) : (
              notes.map((note) => (
                  <View key={note.id} className="mb-4">
                    <TouchableOpacity
                        className="bg-gray-50 rounded-2xl p-4 shadow border border-gray-200"
                        activeOpacity={0.8}
                        onPress={() => handleEdit(note.id!)}
                    >
                      <Text className="text-lg font-bold text-gray-900">{note.title}</Text>
                      <Text className="text-sm text-gray-600 mt-1" numberOfLines={3}>
                        {note.description}
                      </Text>

                      <View className="flex-row justify-between items-center mt-3">
                        <Text className="text-xs text-gray-400">{note.date}</Text>
                        <View className="flex-row space-x-3">
                          <TouchableOpacity
                              onPress={(e) => {
                                e.stopPropagation();
                                handleEdit(note.id!);
                              }}
                          >
                            <Feather name="edit-2" size={20} color="#2563EB" />
                          </TouchableOpacity>
                          <TouchableOpacity
                              onPress={(e) => {
                                e.stopPropagation();
                                handleDelete(note.id!);
                              }}
                          >
                            <Feather name="trash-2" size={20} color="#EF4444" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
              ))
          )}
        </ScrollView>

        {/* Floating Add Button */}
        <TouchableOpacity
            className="absolute bottom-24 right-6 w-16 h-16 rounded-full shadow-lg bg-blue-500 items-center justify-center"
            onPress={() => router.push("/(dashboard)/note/new")}
        >
          <Ionicons name="add" size={32} color="white" />
        </TouchableOpacity>

        {/* Bottom Navigation */}
        <View className="flex-row border-t border-gray-200 bg-white px-4 py-2" >
          <TouchableOpacity className="flex-1 items-center" onPress={() => router.push("/(dashboard)/homepage")}>
            <Ionicons name="home" size={24} color="#2563EB" />
            <Text className="text-xs font-bold text-blue-600">Home</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 items-center" onPress={() => router.push("/calender/calender")}>
            <Ionicons name="calendar-outline" size={24} color="#9CA3AF" />
            <Text className="text-xs text-gray-400">Calendar</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 items-center" onPress={() => router.push("profile/profile")}>
            <Ionicons name="person-outline" size={24} color="#9CA3AF" />
            <Text className="text-xs text-gray-400">Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Toast */}
        <Toast />
      </SafeAreaView>
  );
}
