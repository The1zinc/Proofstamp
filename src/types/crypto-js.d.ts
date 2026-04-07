declare module "crypto-js" {
  interface WordArray {
    toString(encoder?: unknown): string;
  }

  interface Hasher {
    update(wordArray: WordArray): Hasher;
    finalize(wordArray?: WordArray): WordArray;
  }

  const CryptoJS: {
    lib: {
      WordArray: {
        create(words?: number[], sigBytes?: number): WordArray;
      };
    };
    enc: {
      Hex: unknown;
    };
    algo: {
      SHA256: {
        create(): Hasher;
      };
    };
  };

  export default CryptoJS;
}
