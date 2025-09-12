import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { register } from '@/services/authService';
import { useRouter } from 'expo-router';

export default function SignupScreen() {
  const route = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  
  const handleSignup = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    if (!acceptTerms) {
      Alert.alert('Error', 'Please accept the terms and conditions');
      return;
    }

    setIsLoading(true);
    // Simulate API call

    try {
      await register (email, password);
      route.push('/(auth)/login');
    } catch (error) {
      Alert.alert('Error', 'Failed to create account. Please try again.');
      setIsLoading(false);
      return;
    }
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Success', 'Account created successfully!');
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
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-center px-6 py-12">
          {/* Header */}
          <View className="mb-8">
            <Text className="text-3xl font-bold text-gray-900 text-center mb-2">
              Create Account
            </Text>
            <Text className="text-gray-600 text-center text-base">
              Sign up to get started
            </Text>
          </View>

          {/* Signup Form */}
          <View className="space-y-5">
            {/* Full Name Input */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Full Name
              </Text>
              <TextInput
                value={fullName}
                onChangeText={setFullName}
                placeholder="Enter your full name"
                autoCapitalize="words"
                autoCorrect={false}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 focus:bg-white"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {/* Email Input */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Email Address
              </Text>
              <TextInput
                value={email}
                onChangeText={handleEmailChange}
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
                onChangeText={handlePasswordChange}
                placeholder="Create a password"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 focus:bg-white"
                placeholderTextColor="#9CA3AF"
              />
              <Text className="text-xs text-gray-500 mt-1">
                Must be at least 6 characters
              </Text>
            </View>

            {/* Confirm Password Input */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </Text>
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm your password"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 focus:bg-white"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {/* Terms and Conditions */}
            <TouchableOpacity 
              onPress={() => setAcceptTerms(!acceptTerms)}
              className="flex-row items-center mt-4"
            >
              <View className={`w-5 h-5 border-2 rounded mr-3 items-center justify-center ${
                acceptTerms ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
              }`}>
                {acceptTerms && (
                  <Text className="text-white text-xs font-bold">✓</Text>
                )}
              </View>
              <View className="flex-1">
                <Text className="text-sm text-gray-600">
                  I agree to the{' '}
                  <Text className="text-blue-600 font-medium">Terms of Service</Text>
                  {' '}and{' '}
                  <Text className="text-blue-600 font-medium">Privacy Policy</Text>
                </Text>
              </View>
            </TouchableOpacity>

            {/* Signup Button */}
            <TouchableOpacity
              onPress={handleSignup}
              disabled={isLoading}
              className={`w-full py-3 rounded-lg mt-6 ${
                isLoading 
                  ? 'bg-gray-400' 
                  : 'bg-blue-600 active:bg-blue-700'
              }`}
            >
              <Text className="text-white text-center text-base font-semibold">
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center my-6">
              <View className="flex-1 h-px bg-gray-300" />
              <Text className="px-4 text-gray-500 text-sm">Or sign up with</Text>
              <View className="flex-1 h-px bg-gray-300" />
            </View>

            {/* Social Signup Buttons */}
            <View className="space-y-3">
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

            {/* Login Link */}
            <View className="flex-row justify-center mt-6">
              <Text className="text-gray-600 text-base">
                Already have an account?{' '}
              </Text>
              <TouchableOpacity>
                <Text className="text-blue-600 text-base font-medium">
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}