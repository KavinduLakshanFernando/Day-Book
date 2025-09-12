import { View, Text, Button, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import React from "react";

const Index = () => {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-white p-4">
      <Text className="text-2xl font-bold mb-6">Welcome Home Page</Text>

      <TouchableOpacity
        onPress={() => router.push("/(auth)/login")}
        className="w-48 py-3 bg-blue-600 rounded-xl shadow-md active:bg-blue-700"
      >
        <Text className="text-center text-white text-lg font-semibold">
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Index;
