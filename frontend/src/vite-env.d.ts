/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly Vite_ApiUrl: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
