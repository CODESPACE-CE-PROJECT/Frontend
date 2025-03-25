"use server"

export const getBackendURL = async () => {
     return process.env.NEXT_PUBLIC_BACKEND_URL
}

export const getCompilerURL = async () => {
     return process.env.NEXT_PUBLIC_COMPILER_URL
}

export const getRealTimeURL = async () => {
     return process.env.NEXT_PUBLIC_REAL_TIME_URL
}

export const getTerminalStreamURL = async () => {
     return process.env.NEXT_PUBLIC_TERMINAL_STREAM_URL
}