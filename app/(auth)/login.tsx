import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
  StatusBar,
  Image,
} from "react-native";
import { router } from "expo-router";
import { login } from "@/services/authService";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

export default function LoginScreenLight() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Custom Toast Configuration
  const toastConfig = {
    success: (props: any) => (
        <BaseToast
            {...props}
            style={{
              borderLeftColor: "#10B981",
              backgroundColor: "#D1FAE5",
              borderRadius: 10,
              marginHorizontal: 10,
            }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{ fontSize: 16, fontWeight: "bold", color: "#065F46" }}
            text2Style={{ fontSize: 14, color: "#065F46" }}
        />
    ),
    error: (props: any) => (
        <ErrorToast
            {...props}
            style={{
              borderLeftColor: "#EF4444",
              backgroundColor: "#FEE2E2",
              borderRadius: 10,
              marginHorizontal: 10,
            }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{ fontSize: 16, fontWeight: "bold", color: "#B91C1C" }}
            text2Style={{ fontSize: 14, color: "#B91C1C" }}
        />
    ),
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Missing Fields",
        text2: "Please fill in all fields",
        position: "top",
        visibilityTime: 3000,
        topOffset: 50,
      });
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);

      Toast.show({
        type: "success",
        text1: "Login Successful",
        text2: "Welcome back 👋",
        position: "top",
        visibilityTime: 3000,
        topOffset: 50,
      });

      router.push("/(dashboard)/homepage");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: "Invalid email or password",
        position: "top",
        visibilityTime: 3000,
        topOffset: 50,
      });
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
      <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, backgroundColor: "#FFFFFF" }}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 justify-center px-6 py-5 bg-white">
            {/* Logo */}
            <View className="flex items-center justify-center mb-6">
              <Image
                  source={require("../../assets/images/diary.jpg")}
                  style={{ width: 100, height: 100 }} // podi & visible size
                  resizeMode="contain"
              />
            </View>

            {/* Header */}
            <View className="mb-10">
              <Text className="text-3xl italic font-bold text-gray-900 text-center mb-2">
                Welcome To Day Book
              </Text>
              <Text className="text-gray-500 text-center text-base">
                Sign in to your account
              </Text>
            </View>

            {/* Login Form */}
            <View className="space-y-6">
              {/* Email Input */}
              <View>
                <Text className="text-gray-700 text-sm font-medium mb-2">
                  Email Address
                </Text>
                <View className="flex-row items-center px-3 py-3 bg-gray-100 border border-gray-300 rounded-lg shadow-sm">
                  <MaterialCommunityIcons
                      name="email-outline"
                      size={24}
                      color="#6B7280"
                      style={{ marginRight: 8 }}
                  />
                  <TextInput
                      value={email}
                      onChangeText={setEmail}
                      placeholder="Enter your email"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      className="flex-1 text-gray-900"
                      placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>

              {/* Password Input */}
              <View>
                <Text className="text-gray-700 text-sm font-medium mb-2">
                  Password
                </Text>
                <View className="flex-row items-center px-3 py-3 bg-gray-100 border border-gray-300 rounded-lg shadow-sm">
                  <MaterialCommunityIcons
                      name="lock-outline"
                      size={24}
                      color="#6B7280"
                      style={{ marginRight: 8 }}
                  />
                  <TextInput
                      value={password}
                      onChangeText={setPassword}
                      placeholder="Enter your password"
                      secureTextEntry
                      autoCapitalize="none"
                      autoCorrect={false}
                      className="flex-1 text-gray-900"
                      placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>

              {/* Forgot Password */}
              <TouchableOpacity className="self-end">
                <Text className="text-blue-500 text-sm font-medium">
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              {/* Login Button */}
              <TouchableOpacity onPress={handleLogin} disabled={isLoading}>
                <LinearGradient
                    colors={["#4F46E5", "#6366F1"]}
                    className="w-full py-3 rounded-lg items-center shadow-md"
                >
                  <Text className="text-white text-base font-semibold">
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Divider */}
              <View className="flex-row items-center my-6">
                <View className="flex-1 h-px bg-gray-300" />
                <Text className="px-4 text-gray-400 text-sm">Or continue with</Text>
                <View className="flex-1 h-px bg-gray-300" />
              </View>

              {/* Social Login */}
              <View className="flex-col space-y-4">
                <TouchableOpacity className="w-full py-3 border border-gray-300 rounded-lg flex-row items-center justify-center shadow-sm bg-white">
                  <Text className="text-gray-700 text-base font-medium ml-2">
                    Continue with Google
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity className="w-full py-3 border border-gray-300 rounded-lg flex-row items-center justify-center shadow-sm bg-white">
                  <Text className="text-gray-700 text-base font-medium ml-2">
                    Continue with Apple
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Sign Up */}
              <View className="flex-row justify-center mt-6">
                <Text className="text-gray-500 text-base">
                  Don&apos;t have an account?{" "}
                </Text>
                <Pressable onPress={() => router.push("/signup")}>
                  <Text className="text-blue-500 text-base font-medium">
                    Sign Up
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Toast Container with custom config */}
        <Toast config={toastConfig} />
      </KeyboardAvoidingView>
  );
}
