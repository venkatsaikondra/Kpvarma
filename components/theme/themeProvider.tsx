"use client"
import React from 'react'
import { ThemeProvider as NextThemeProvider } from 'next-themes'

const ThemeProvider = ({ children }) => {
  return (
    <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemeProvider>
  )
}

export default ThemeProvider