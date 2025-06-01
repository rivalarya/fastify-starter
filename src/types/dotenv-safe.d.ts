declare module 'dotenv-safe' {
  interface DotenvSafeConfigOptions {
    allowEmptyValues?: boolean;
    example?: string;
    path?: string;
    encoding?: string;
    debug?: boolean;
  }
  function config(options?: DotenvSafeConfigOptions): void;
  export = { config };
}
