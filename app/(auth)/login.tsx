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
  Pressable
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Image } from "react-native"
import { router, useRouter } from 'expo-router';
import { login } from '@/services/authService';
import { useRoute } from '@react-navigation/native';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    try {
      // Replace this with your actual login logic
      await login(email, password);
      console.log('Login successful');
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
      className="flex-1"
    >
      <StatusBar style="dark" />
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        className="bg-white"
      >
        <View className="flex-1 justify-center px-6 py-5">
        
            <Image
              source={require("../../assets/images/head.png")}
              className="w-40 h-40 mx-auto"
                resizeMode="contain"
            />
          {/* Header */}
          <View className="mb-10">
            <Text className="text-3xl font-bold text-gray-900 text-center mb-2">
              Welcome To Day Book
            </Text>
            <Text className="text-gray-600 text-center text-base">
              Sign in to your account
            </Text>
          </View>

          {/* Login Form */}
          <View className="space-y-6">
            {/* Email Input */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Email Address
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 focus:bg-white"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {/* Password Input */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Password
              </Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 focus:bg-white"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {/* Forgot Password */}
            <TouchableOpacity className="self-end">
              <Text className="text-blue-600 text-sm font-medium">
                Forgot Password?
              </Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              onPress={handleLogin}
              disabled={isLoading}
              className={`w-full py-3 rounded-lg ${
                isLoading 
                  ? 'bg-gray-400' 
                  : 'bg-blue-600 active:bg-blue-700'
              }`}
            >
              <Text className="text-white text-center text-base font-semibold">
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center my-6">
              <View className="flex-1 h-px bg-gray-300" />
              <Text className="px-4 text-gray-500 text-sm">Or continue with</Text>
              <View className="flex-1 h-px bg-gray-300" />
            </View>

            {/* Social Login Buttons */}
            <View className="flex-col space-y-4">
              <TouchableOpacity className="w-full py-3 border border-gray-300 rounded-lg flex-row items-center justify-center">
                <Text className="text-gray-700 text-base font-medium ml-2">
                  Continue with Google
                </Text>
              </TouchableOpacity>

              <TouchableOpacity className="w-full py-3 border border-gray-300 rounded-lg flex-row items-center justify-center">
                <Text className="text-gray-700 text-base font-medium ml-2">
                  Continue with Apple
                </Text>
              </TouchableOpacity>
            </View>

                <View className="flex-row justify-center mt-6">
                <Text className="text-gray-600 text-base">
                    Don't have an account?{" "}
                </Text>
                <Pressable onPress={() => router.push("/signup")}>
                    <Text className="text-blue-600 text-base font-medium">
                    Sign Up
                    </Text>
                </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};