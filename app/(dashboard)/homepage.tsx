import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeIcon, BookOpenIcon, Cog6ToothIcon, PlusIcon } from "react-native-heroicons/outline";
import { router } from "expo-router";

export interface Note {
  id?: string;
  title: string;
  description: string;
  date: string;
  createdAt: string;
}

const sampleNotes: Note[] = [
  {
    id: "1",
    title: "A Day of Reflection",
    description: "Today, I spent some time reflecting on my goals and aspirations. It's important to take a step back and assess where I'm headed.",
    date: new Date().toDateString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Nature's Embrace",
    description: "I took a walk in the park today and felt a sense of peace. Nature has a way of grounding me and reminding me of the simple joys in life.",
    date: new Date().toDateString(),
    createdAt: new Date().toISOString(),
  },
];

export default function DiaryApp() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="flex-row items-center justify-between p-4">
        <View className="w-12" />
        <Text className="text-xl font-bold text-gray-900 flex-1 text-center">My Diary</Text>
        <TouchableOpacity className="w-12 items-end">
          <Cog6ToothIcon size={28} color="#111418" />
        </TouchableOpacity>
      </View>

      {/* Recent Entries */}
      <ScrollView className="flex-1">
        <Text className="text-2xl font-bold text-gray-900 px-4 pt-2">Recent Entries</Text>

        {sampleNotes.map((note) => (
          <View key={note.id} className="px-4 py-2">
            <View className="flex-row items-start gap-4 bg-white p-4 rounded-xl shadow">
              <View className="flex-1">
                <Text className="text-lg font-bold text-gray-900">{note.title}</Text>
                <Text className="text-base text-gray-500 mt-1">{note.description}</Text>
                <Text className="text-xs text-gray-400 mt-1">{note.date}</Text>
              </View>
              <Image
                source={{ uri: "https://via.placeholder.com/80" }}
                className="w-20 h-20 rounded-lg"
              />
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity
        className="absolute bottom-20 right-5 bg-blue-600 w-16 h-16 rounded-full items-center justify-center shadow-lg"
        onPress={() => router.push("/(dashboard)/note/addNotepage")}
      >
        <PlusIcon size={32} color="white" />
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View className="flex-row border-t border-gray-200 bg-white px-4 py-2">
        <TouchableOpacity className="flex-1 items-center">
          <HomeIcon size={24} color="#1173d4" />
          <Text className="text-xs font-bold text-[#1173d4]">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 items-center">
          <BookOpenIcon size={24} color="#617589" />
          <Text className="text-xs text-gray-500">Entries</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 items-center">
          <Cog6ToothIcon size={24} color="#617589" />
          <Text className="text-xs text-gray-500">Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
