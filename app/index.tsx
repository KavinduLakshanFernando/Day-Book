import { View, Text, TouchableOpacity, ScrollView, Dimensions, StatusBar } from "react-native";
import { useRouter } from "expo-router";
import React from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const Index = () => {
  const router = useRouter();

  const features = [
    {
      icon: "📝",
      title: "Write & Express",
      description: "Capture your thoughts and memories beautifully"
    },
    {
      icon: "🔒",
      title: "Private & Secure",
      description: "Your personal space, completely private"
    }
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      
      {/* Background Gradient */}
      <LinearGradient
        colors={['#1e1b4b', '#312e81', '#1e40af', '#2563eb']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: height,
        }}
      />

      {/* Floating Elements */}
      <View style={{
        position: 'absolute',
        top: height * 0.15,
        left: width * 0.1,
        width: 80,
        height: 80,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 40,
        opacity: 0.6,
      }} />
      
      <View style={{
        position: 'absolute',
        top: height * 0.25,
        right: width * 0.15,
        width: 60,
        height: 60,
        backgroundColor: 'rgba(59, 130, 246, 0.3)',
        borderRadius: 30,
        opacity: 0.8,
      }} />

      <View style={{
        position: 'absolute',
        bottom: height * 0.35,
        left: width * 0.05,
        width: 100,
        height: 100,
        backgroundColor: 'rgba(147, 51, 234, 0.2)',
        borderRadius: 50,
        opacity: 0.7,
      }} />

      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 24,
          paddingTop: 60,
        }}>
          
          {/* App Icon/Logo */}
          <View style={{
            width: 120,
            height: 120,
            backgroundColor: 'rgba(255,255,255,0.15)',
            borderRadius: 60,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 32,
            borderWidth: 2,
            borderColor: 'rgba(255,255,255,0.2)',
          }}>
            <Text style={{ fontSize: 48 }}>📖</Text>
          </View>

          {/* Main Title */}
          <Text style={{
            fontSize: 32,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            marginBottom: 16,
            letterSpacing: -0.5,
          }}>
            My Digital Diary
          </Text>

          {/* Subtitle */}
          <Text style={{
            fontSize: 18,
            color: 'rgba(255,255,255,0.8)',
            textAlign: 'center',
            lineHeight: 26,
            marginBottom: 48,
            paddingHorizontal: 20,
          }}>
            Your personal space to capture life's beautiful moments and thoughts
          </Text>

          {/* Features Section */}
          <View style={{
            width: '100%',
            marginBottom: 48,
          }}>
            {features.map((feature, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: 20,
                  padding: 20,
                  marginBottom: 16,
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.2)',
                }}
              >
                <View style={{
                  width: 50,
                  height: 50,
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  borderRadius: 25,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 16,
                }}>
                  <Text style={{ fontSize: 24 }}>{feature.icon}</Text>
                </View>
                
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: 'white',
                    marginBottom: 4,
                  }}>
                    {feature.title}
                  </Text>
                  <Text style={{
                    fontSize: 14,
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: 20,
                  }}>
                    {feature.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>

        </View>

        {/* Bottom Section */}
        <View style={{
          paddingHorizontal: 24,
          paddingBottom: 40,
          alignItems: 'center',
        }}>
          
          {/* Primary Button */}
          <TouchableOpacity
            onPress={() => router.push("/(auth)/login")}
            style={{
              width: '100%',
              maxWidth: 280,
              height: 56,
              backgroundColor: 'rgba(255,255,255,0.9)',
              borderRadius: 28,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
            }}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#3b82f6', '#1d4ed8']}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 28,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{
                color: 'white',
                fontSize: 18,
                fontWeight: '600',
                letterSpacing: 0.5,
              }}>
                Get Started ✨
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Footer Text */}
          <Text style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: 12,
            textAlign: 'center',
            marginTop: 24,
            lineHeight: 18,
          }}>
            Start your journaling journey today{'\n'}
            Join thousands of happy writers
          </Text>

        </View>
      </ScrollView>

      {/* Decorative Bottom Wave */}
      <View style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
      }} />
    </SafeAreaView>
  );
};

export default Index;