/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly AuthServerUrl: string;
    readonly ProjectApiServerUrl: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
