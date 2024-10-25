/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly ApiUrl: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
