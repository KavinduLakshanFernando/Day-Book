import React from "react"
import "./../global.css"
import { Slot } from "expo-router"
import { LoaderProvider } from "@/context/LoaderContext"
import { AuthProvider } from "@/context/AuthContext"

const RootLayout = () => {
  return (
    <LoaderProvider>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </LoaderProvider>
    
  )
}

export default RootLayout
