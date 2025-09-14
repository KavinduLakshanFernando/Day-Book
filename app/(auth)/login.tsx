import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
  StatusBar
} from 'react-native';
import { Image } from "react-native"
import { router } from 'expo-router';
import { login } from '@/services/authService';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreenDark() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      router.push('/(dashboard)/homepage');
    } catch (error) {
      Alert.alert('Error', 'Invalid email or password');
      setIsLoading(false);
      return;
    }
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Success', 'Login successful!');
    }, 2000);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <StatusBar style="light" />
      <LinearGradient
        colors={['#111827', '#1F2937', '#1E293B']}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 justify-center px-6 py-5">

            <Image
              // source={require("../../assets/images/head.png")}
              className="w-40 h-40 mx-auto"
              resizeMode="contain"
            />

            {/* Header */}
            <View className="mb-10" style={{ marginTop: -100 }}>
              <Text className="text-3xl font-bold text-white text-center mb-2">
                Welcome To Day Book
              </Text>
              <Text className="text-gray-300 text-center text-base">
                Sign in to your account
              </Text>
            </View>

            {/* Login Form */}
            <View className="space-y-6">
              {/* Email Input */}
              <View>
                <Text className="text-gray-300 text-sm font-medium mb-2">
                  Email Address
                </Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              {/* Password Input */}
              <View>
                <Text className="text-gray-300 text-sm font-medium mb-2">
                  Password
                </Text>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              {/* Forgot Password */}
              <TouchableOpacity className="self-end">
                <Text className="text-blue-500 text-sm font-medium">
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              {/* Login Button */}
              <TouchableOpacity
                onPress={handleLogin}
                disabled={isLoading}
              >
                <LinearGradient
                  colors={['#2563EB', '#1D4ED8']}
                  className="w-full py-3 rounded-lg items-center"
                >
                  <Text className="text-white text-base font-semibold">
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Divider */}
              <View className="flex-row items-center my-6">
                <View className="flex-1 h-px bg-gray-600" />
                <Text className="px-4 text-gray-400 text-sm">Or continue with</Text>
                <View className="flex-1 h-px bg-gray-600" />
              </View>

              {/* Social Login Buttons */}
              <View className="flex-col space-y-4">
                <TouchableOpacity className="w-full py-3 border border-gray-600 rounded-lg flex-row items-center justify-center">
                  <Text className="text-gray-300 text-base font-medium ml-2">
                    Continue with Google
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity className="w-full py-3 border border-gray-600 rounded-lg flex-row items-center justify-center">
                  <Text className="text-gray-300 text-base font-medium ml-2">
                    Continue with Apple
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Sign Up */}
              <View className="flex-row justify-center mt-6">
                <Text className="text-gray-400 text-base">
                    Don't have an account?{" "}
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
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
