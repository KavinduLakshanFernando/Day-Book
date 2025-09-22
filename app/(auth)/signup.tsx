import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
  StatusBar, Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { register } from '@/services/authService';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function SignupScreenLight() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Toast config
  const toastConfig = {
    success: (props: any) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: '#10B981', backgroundColor: '#D1FAE5', borderRadius: 10, marginHorizontal: 10 }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{ fontSize: 16, fontWeight: 'bold', color: '#065F46' }}
            text2Style={{ fontSize: 14, color: '#065F46' }}
        />
    ),
    error: (props: any) => (
        <ErrorToast
            {...props}
            style={{ borderLeftColor: '#EF4444', backgroundColor: '#FEE2E2', borderRadius: 10, marginHorizontal: 10 }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{ fontSize: 16, fontWeight: 'bold', color: '#B91C1C' }}
            text2Style={{ fontSize: 14, color: '#B91C1C' }}
        />
    ),
  };

  const handleSignup = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Missing Fields',
        text2: 'Please fill in all fields',
        position: 'top',
        topOffset: 50,
        visibilityTime: 3000,
      });
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Password Mismatch',
        text2: 'Passwords do not match',
        position: 'top',
        topOffset: 50,
        visibilityTime: 3000,
      });
      return;
    }

    // if (!acceptTerms) {
    //   Toast.show({
    //     type: 'error',
    //     text1: 'Terms Not Accepted',
    //     text2: 'Please accept the terms & conditions',
    //     position: 'top',
    //     topOffset: 50,
    //     visibilityTime: 3000,
    //   });
    //   return;
    // }

    setIsLoading(true);

    try {
      await register(email, password);
      Toast.show({
        type: 'success',
        text1: 'Account Created',
        text2: 'Welcome aboard!',
        position: 'top',
        topOffset: 50,
        visibilityTime: 3000,
      });
      router.push('/(auth)/login');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Signup Failed',
        text2: 'Something went wrong. Try again.',
        position: 'top',
        topOffset: 50,
        visibilityTime: 3000,
      });
      setIsLoading(false);
    }
  };

  return (
      <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1 bg-white"
      >
        <StatusBar style="dark" />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-6">
          <View className="flex items-center justify-center mb-6">
            <Image
                source={require("../../assets/images/signup.jpg")}
                style={{ width: 200, height: 200 }} // podi & visible size
                resizeMode="contain"
            />
          </View>
          {/* Header */}
          <View className="mb-8">
            <Text className="text-2xl italic font-bold text-gray-600 text-center mb-2">
              Create Account
            </Text>
            <Text className="text-gray-500 text-center text-base">
              Sign up to get started
            </Text>
          </View>

          {/* Form */}
          <View className="space-y-5">
            {/* Full Name */}
            <View>
              <Text className="text-gray-500 text-sm mb-1">Full Name</Text>
              <View className="flex-row items-center bg-gray-100 border border-gray-300 rounded-lg px-3 py-2">
                <MaterialCommunityIcons name="account-outline" size={22} color="#6B7280" className="mr-2" />
                <TextInput
                    value={fullName}
                    onChangeText={setFullName}
                    placeholder="Enter your full name"
                    placeholderTextColor="#9CA3AF"
                    autoCapitalize="words"
                    className="flex-1 text-gray-900"
                />
              </View>
            </View>

            {/* Email */}
            <View>
              <Text className="text-gray-500 text-sm mb-1">Email</Text>
              <View className="flex-row items-center bg-gray-100 border border-gray-300 rounded-lg px-3 py-2">
                <MaterialCommunityIcons name="email-outline" size={22} color="#6B7280" className="mr-2" />
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="flex-1 text-gray-900"
                />
              </View>
            </View>

            {/* Password */}
            <View>
              <Text className="text-gray-500 text-sm mb-1">Password</Text>
              <View className="flex-row items-center bg-gray-100 border border-gray-300 rounded-lg px-3 py-2">
                <MaterialCommunityIcons name="lock-outline" size={22} color="#6B7280" className="mr-2" />
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Create a password"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry
                    autoCapitalize="none"
                    className="flex-1 text-gray-900"
                />
              </View>
            </View>

            {/* Confirm Password */}
            <View>
              <Text className="text-gray-500 text-sm mb-1">Confirm Password</Text>
              <View className="flex-row items-center bg-gray-100 border border-gray-300 rounded-lg px-3 py-2">
                <MaterialCommunityIcons name="lock-check-outline" size={22} color="#6B7280" className="mr-2" />
                <TextInput
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Confirm password"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry
                    autoCapitalize="none"
                    className="flex-1 text-gray-900"
                />
              </View>
            </View>

            {/* Signup Button */}
            <TouchableOpacity onPress={handleSignup} disabled={isLoading}>
              <LinearGradient
                  colors={['#4F46E5', '#6366F1']}
                  className="w-full py-3 rounded-lg items-center mt-4"
              >
                <Text className="text-white font-semibold">
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Login Link */}
            <View className="flex-row justify-center mt-4">
              <Text className="text-gray-500 text-sm">Already have an account? </Text>
              <Pressable onPress={() => router.push('/(auth)/login')}>
                <Text className="text-blue-500 text-sm font-semibold">Sign In</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>

        {/* Toast Container */}
        <Toast config={toastConfig} />
      </KeyboardAvoidingView>
  );
}
