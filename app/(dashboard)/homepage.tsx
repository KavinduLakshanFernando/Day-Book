import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeIcon, BookOpenIcon, Cog6ToothIcon, PlusIcon } from "react-native-heroicons/outline";
import { router } from "expo-router";
import { Edit2, Trash2 } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { fetchNotes } from "@/services/noteService";
import { Note } from "@/type/note";
import { auth } from "@/firebase";

export default function DiaryAppHomePage() {
  const bgGradient = ["#111827", "#1f2937"];
  const cardBg = "#1F2937";
  const cardBorder = "#374151";
  const textColor = "#F3F4F6";
  const textGray = "#D1D5DB";

  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(async (user) => {
    if (user) {
      try {
        const fetchedNotes = await fetchNotes(user.uid);
        setNotes(fetchedNotes);
      } catch (err) {
        console.error("Error fetching notes:", err);
      }
    } else {
      console.log("No user logged in");
      setNotes([]);
    }
  });

  return () => unsubscribe();
}, []);


  return (
    <SafeAreaView className="flex-1">
      <LinearGradient colors={bgGradient} style={{ flex: 1 }}>
        {/* Header */}
        <View className="flex-row items-center justify-between p-4">
          <Text className="text-xl font-bold text-white flex-1 text-center">My Diary</Text>
          <TouchableOpacity className="w-12 items-end">
            <Cog6ToothIcon size={28} color="#F3F4F6" />
          </TouchableOpacity>
        </View>

        {/* Recent Entries */}
        <ScrollView className="flex-1 px-4">
          <Text className="text-2xl font-bold mt-4 mb-2 text-white">Recent Entries</Text>

          {loading ? (
            <View className="flex-1 justify-center items-center mt-10">
              <ActivityIndicator size="large" color="#2563EB" />
              <Text className="text-gray-400 mt-2">Loading notes...</Text>
            </View>
          ) : notes.length === 0 ? (
            <Text className="text-gray-400 text-center mt-10">No notes yet. Start by adding one!</Text>
          ) : (
            notes.map((note) => (
              <View key={note.id} className="mb-4">
                <View
                  style={{ backgroundColor: cardBg, borderColor: cardBorder }}
                  className="rounded-3xl p-4 shadow-lg border"
                >
                  <Text style={{ color: textColor }} className="text-lg font-bold">{note.title}</Text>
                  <Text style={{ color: textGray }} className="text-sm mt-2 leading-5">{note.description}</Text>

                  <View className="flex-row justify-between items-center mt-3">
                    <Text style={{ color: textGray }} className="text-xs">{note.date}</Text>
                    <View className="flex-row space-x-4">
                      <TouchableOpacity onPress={() => console.log("Edit", note.id)}>
                        <Edit2 size={22} color="#3B82F6" />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => console.log("Delete", note.id)}>
                        <Trash2 size={22} color="#EF4444" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))
          )}
        </ScrollView>

        {/* Floating Add Button */}
        <TouchableOpacity
          className="absolute bottom-24 right-5 w-16 h-16 rounded-full shadow-lg"
          onPress={() => router.push("/(dashboard)/note/addNotepage")}
        >
          <LinearGradient
            colors={["#2563EB", "#1D4ED8"]}
            style={{ flex: 1, borderRadius: 32, alignItems: "center", justifyContent: "center" }}
          >
            <PlusIcon size={32} color="white" />
          </LinearGradient>
        </TouchableOpacity>

        {/* Bottom Navigation */}
        <View style={{ backgroundColor: "#111827" }} className="flex-row border-t border-gray-700 px-4 py-2">
          <TouchableOpacity className="flex-1 items-center">
            <HomeIcon size={24} color="#2563EB" />
            <Text className="text-xs font-bold text-blue-500">Home</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 items-center" onPress={() => router.push("/calender")}>
            <BookOpenIcon size={24} color="#9CA3AF" />
            <Text className="text-xs text-gray-400">Entries</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 items-center">
            <Cog6ToothIcon size={24} color="#9CA3AF" />
            <Text className="text-xs text-gray-400">Settings</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
