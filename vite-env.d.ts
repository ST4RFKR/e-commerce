/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly NEXT_PUBLIC_API_URL: string
    // Add other VITE_ prefixed env variables here as needed
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}