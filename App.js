import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  // Chỉ giữ lại số
  const getOnlyDigits = (text) => {
    return text.replace(/\D/g, "");
  };

  // Format số điện thoại: 093 454 43 44
  const formatPhoneNumber = (text) => {
    const digits = getOnlyDigits(text).slice(0, 10);

    if (digits.length <= 3) return digits;

    if (digits.length <= 6) {
      return `${digits.slice(0, 3)} ${digits.slice(3)}`;
    }

    if (digits.length <= 8) {
      return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
    }

    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(
      6,
      8
    )} ${digits.slice(8, 10)}`;
  };

  // Kiểm tra số điện thoại Việt Nam (10 số, bắt đầu bằng 0)
  const isValidPhone = (text) => {
    const digits = getOnlyDigits(text);
    return /^0\d{9}$/.test(digits);
  };

  // Khi nhập vào TextInput
  const handleChangePhone = (text) => {
    const formatted = formatPhoneNumber(text);
    setPhone(formatted);

    if (formatted.length === 0) {
      setError("");
      return;
    }

    if (!isValidPhone(formatted)) {
      setError("Số điện thoại không đúng định dạng");
    } else {
      setError("");
    }
  };

  // Khi bấm nút tiếp tục
  const handleContinue = () => {
    if (!isValidPhone(phone)) {
      Alert.alert("Thông báo", "Số điện thoại không đúng định dạng");
      return;
    }

    Alert.alert("Thành công", `Số điện thoại hợp lệ: ${phone}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Đăng nhập</Text>

        <Text style={styles.subtitle}>Nhập số điện thoại</Text>

        <Text style={styles.description}>
          Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản
        </Text>

        <TextInput
          style={[styles.input, error ? styles.inputError : null]}
          placeholder="Nhập số điện thoại của bạn"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={handleChangePhone}
          maxLength={13}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
  },

  content: {
    padding: 20,
    marginTop: 60,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },

  subtitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
  },

  description: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "white",
  },

  inputError: {
    borderColor: "red",
  },

  errorText: {
    color: "red",
    marginTop: 6,
  },

  button: {
    backgroundColor: "#2563eb",
    marginTop: 25,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});