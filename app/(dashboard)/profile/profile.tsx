import React, { useState, useRef } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    Animated,
    ActivityIndicator,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Image,
    TouchableOpacity
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import {router} from "expo-router";

const ProfileScreen = () => {
    const scale = useRef(new Animated.Value(1)).current;

    const [user, setUser] = useState({
        name: "John Doe",
        email: "johndoe@example.com",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (field: keyof typeof user, value: string) => {
        setUser({ ...user, [field]: value });
    };

    const handleSave = async () => {
        if (!user.name.trim() || !user.email.trim()) {
            Toast.show({ type: "error", text1: "Please fill in all fields" });
            return;
        }

        try {
            setLoading(true);
            // Call your update profile API here
            await new Promise((resolve) => setTimeout(resolve, 1500)); // simulate API
            Toast.show({ type: "success", text1: "Profile updated successfully!" });
        } catch (error) {
            Toast.show({ type: "error", text1: "Failed to update profile" });
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        router.push("/(auth)/login");
        // Your logout logic
        Toast.show({ type: "success", text1: "Logged out successfully!" });
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 bg-white"
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
                {/* Header */}
                <View className="flex-row items-center justify-between mb-6">
                    <Text className="text-3xl font-bold text-gray-900">Profile</Text>
                    <TouchableWithoutFeedback onPress={handleLogout}>
                        <Ionicons name="log-out-outline" size={28} color="#EF4444" />
                    </TouchableWithoutFeedback>
                </View>

                {/* Avatar */}
                <View className="items-center mb-6">
                    <Image
                        source={{ uri: "https://i.pravatar.cc/150?img=12" }}
                        className="w-24 h-24 rounded-full mb-2"
                    />
                    <Text className="text-gray-500 text-sm">Tap to change avatar</Text>
                </View>

                {/* Name */}
                <Text className="text-gray-700 mb-2 font-medium">Full Name</Text>
                <TextInput
                    value={user.name}
                    onChangeText={(text) => handleChange("name", text)}
                    placeholder="Enter your full name"
                    placeholderTextColor="#9CA3AF"
                    className="border border-gray-300 rounded-xl p-4 mb-4 bg-gray-50 text-gray-900 shadow-sm"
                />

                {/* Email */}
                <Text className="text-gray-700 mb-2 font-medium">Email</Text>
                <TextInput
                    value={user.email}
                    onChangeText={(text) => handleChange("email", text)}
                    placeholder="Enter your email"
                    placeholderTextColor="#9CA3AF"
                    className="border border-gray-300 rounded-xl p-4 mb-4 bg-gray-50 text-gray-900 shadow-sm"
                />

                {/* Password */}
                <Text className="text-gray-700 mb-2 font-medium">Password</Text>
                <TextInput
                    value={user.password}
                    onChangeText={(text) => handleChange("password", text)}
                    placeholder="Enter new password"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry
                    className="border border-gray-300 rounded-xl p-4 mb-6 bg-gray-50 text-gray-900 shadow-sm"
                />

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
                            className="rounded-xl p-4 items-center justify-center shadow"
                        >
                            {loading ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <Text className="text-white font-semibold text-lg">Save Changes</Text>
                            )}
                        </LinearGradient>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </ScrollView>


            <View className="flex-row border-t border-gray-200 bg-white px-4 py-2" >
                <TouchableOpacity className="flex-1 items-center" onPress={() => router.push("/(dashboard)/homepage")}>
                    <Ionicons name="home" size={24} color="#9CA3AF" />
                    <Text className="text-xs text-gray-400">Home</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 items-center" onPress={() => router.push("/calender/calender")}>
                    <Ionicons name="calendar-outline" size={24} color="#9CA3AF" />
                    <Text className="text-xs text-gray-400">Calendar</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 items-center" onPress={() => router.push("/profile/profile")}>
                    <Ionicons name="person-outline" size={24} color="#2563EB" />
                    <Text className="text-xs font-bold text-blue-600">Profile</Text>
                </TouchableOpacity>
            </View>

            {/* Toast */}
            <Toast position="top" />
        </KeyboardAvoidingView>
    );
};

export default ProfileScreen;
