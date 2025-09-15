import React from "react";
import "./../global.css";
import { Slot } from "expo-router";
import { LoaderProvider } from "@/context/LoaderContext";
import { AuthProvider } from "@/context/AuthContext";
import Toast from "react-native-toast-message";

const RootLayout = () => {
    return (
        <LoaderProvider>
            <AuthProvider>
                <Slot />
                <Toast />
            </AuthProvider>
        </LoaderProvider>
    );
};

export default RootLayout;
