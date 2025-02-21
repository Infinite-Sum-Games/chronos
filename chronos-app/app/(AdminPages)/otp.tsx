import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function OTPScreen() {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(0);
  const [error, setError] = useState("");

  const handleGetOTP = async () => {
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch("", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer <ACCESS-TOKEN-HERE>',
          'Refresh': '<REFRESH-TOKEN-HERE>',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch OTP');
      }

      const data = await response.json();
      setOtp(data.otp);
    } catch (err) {
      setError('Failed to get OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-[#121212] p-5 items-center justify-center">
      <View className="items-center mb-10">
        <MaterialCommunityIcons name="shield-check" size={64} color="#3fcf8e" />
        <Text className="text-white text-3xl font-bold mt-5 mb-2">OTP Verification</Text>
        <Text className="text-gray-400 text-base">Get your one-time password securely</Text>
      </View>

      {otp ? (
        <View className="w-full items-center mb-10">
          <Text className="text-white text-xl mb-4">Your OTP</Text>
          <View className="flex-row justify-center gap-2">
            {otp.toString().split('').map((digit, index) => (
              <View key={index} className="w-12 h-15 bg-[#202020] rounded-lg justify-center items-center border border-[#2d2d2d]">
                <Text className="text-[#3fcf8e] text-2xl font-bold">{digit}</Text>
              </View>
            ))}
          </View>
        </View>
      ) : (
        <View className="h-30 justify-center items-center">
          <Text className="text-gray-600 text-base">Click the button below to get your OTP</Text>
        </View>
      )}

      {error && (
        <Text className="text-red-500 mb-5 text-center">{error}</Text>
      )}

      <TouchableOpacity
        className={`bg-[#3fcf8e] px-8 py-4 rounded-lg flex-row items-center gap-2 ${loading && 'bg-[#297050]'}`}
        onPress={handleGetOTP}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#121212" />
        ) : (
          <>
            <MaterialCommunityIcons name="key-variant" size={24} color="#121212" />
            <Text className="text-[#121212] text-xl font-bold">Get OTP</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}