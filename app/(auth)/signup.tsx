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

  // Permanent Dark Theme Colors
  const bgColor = '#111827';
  const inputBg = '#1F2937';
  const inputBorder = '#374151';
  const textColor = '#F3F4F6';
  const textGray = '#D1D5DB';
  const buttonColor = '#2563EB';
  const buttonActiveColor = '#1D4ED8';

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

    try {
      await register(email, password);
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
      style={{ flex: 1, backgroundColor: bgColor }}
    >
      <StatusBar style="light" />
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1, padding: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="mb-8 mt-12">
          <Text style={{ color: textColor, fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 4 }}>
            Create Account
          </Text>
          <Text style={{ color: textGray, textAlign: 'center', fontSize: 16 }}>
            Sign up to get started
          </Text>
        </View>

        {/* Signup Form */}
        <View className="space-y-5">
          {/* Full Name */}
          <View>
            <Text style={{ color: textGray, fontSize: 14, marginBottom: 4 }}>Full Name</Text>
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter your full name"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="words"
              autoCorrect={false}
              style={{
                width: '100%',
                padding: 12,
                backgroundColor: inputBg,
                borderColor: inputBorder,
                borderWidth: 1,
                borderRadius: 10,
                color: textColor
              }}
            />
          </View>

          {/* Email */}
          <View>
            <Text style={{ color: textGray, fontSize: 14, marginBottom: 4 }}>Email Address</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={{
                width: '100%',
                padding: 12,
                backgroundColor: inputBg,
                borderColor: inputBorder,
                borderWidth: 1,
                borderRadius: 10,
                color: textColor
              }}
            />
          </View>

          {/* Password */}
          <View>
            <Text style={{ color: textGray, fontSize: 14, marginBottom: 4 }}>Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Create a password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              style={{
                width: '100%',
                padding: 12,
                backgroundColor: inputBg,
                borderColor: inputBorder,
                borderWidth: 1,
                borderRadius: 10,
                color: textColor
              }}
            />
            <Text style={{ color: textGray, fontSize: 12, marginTop: 4 }}>
              Must be at least 6 characters
            </Text>
          </View>

          {/* Confirm Password */}
          <View>
            <Text style={{ color: textGray, fontSize: 14, marginBottom: 4 }}>Confirm Password</Text>
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm your password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              style={{
                width: '100%',
                padding: 12,
                backgroundColor: inputBg,
                borderColor: inputBorder,
                borderWidth: 1,
                borderRadius: 10,
                color: textColor
              }}
            />
          </View>

          {/* Terms */}
          <TouchableOpacity 
            onPress={() => setAcceptTerms(!acceptTerms)}
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}
          >
            <View style={{
              width: 20, height: 20,
              borderWidth: 2,
              borderColor: acceptTerms ? buttonColor : inputBorder,
              backgroundColor: acceptTerms ? buttonColor : 'transparent',
              borderRadius: 4,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 8
            }}>
              {acceptTerms && <Text style={{ color: '#fff', fontSize: 12 }}>✓</Text>}
            </View>
            <Text style={{ color: textGray, fontSize: 14 }}>
              I agree to the <Text style={{ color: buttonColor }}>Terms of Service</Text> and <Text style={{ color: buttonColor }}>Privacy Policy</Text>
            </Text>
          </TouchableOpacity>

          {/* Signup Button */}
          <TouchableOpacity
            onPress={handleSignup}
            disabled={isLoading}
            style={{
              width: '100%',
              padding: 14,
              borderRadius: 10,
              marginTop: 12,
              backgroundColor: isLoading ? '#6B7280' : buttonColor,
              alignItems: 'center'
            }}
          >
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 16 }}>
            <View style={{ flex: 1, height: 1, backgroundColor: inputBorder }} />
            <Text style={{ marginHorizontal: 8, color: textGray, fontSize: 12 }}>Or sign up with</Text>
            <View style={{ flex: 1, height: 1, backgroundColor: inputBorder }} />
          </View>

          {/* Social Buttons */}
          <View style={{ space: 12 }}>
            <TouchableOpacity style={{ width: '100%', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: inputBorder, alignItems: 'center' }}>
              <Text style={{ color: textGray, fontSize: 14 }}>Continue with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: '100%', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: inputBorder, alignItems: 'center' }}>
              <Text style={{ color: textGray, fontSize: 14 }}>Continue with Apple</Text>
            </TouchableOpacity>
          </View>

          {/* Login Link */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 16 }}>
            <Text style={{ color: textGray, fontSize: 14 }}>Already have an account? </Text>
            <TouchableOpacity onPress={() => route.push('/(auth)/login')}>
              <Text style={{ color: buttonColor, fontSize: 14, fontWeight: '600' }}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
