import { AuthProvider } from "@/context/AuthContext";
import { LoaderProvider } from "@/context/LoaderContext";
import { Slot } from "expo-router";
import React from "react";
import Toast from "react-native-toast-message";
import "./../global.css";

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
