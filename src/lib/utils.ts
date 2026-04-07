import CryptoJS from "crypto-js";

const HASH_CHUNK_SIZE = 1024 * 1024;

function toWordArray(bytes: Uint8Array) {
  const words: number[] = [];

  for (let i = 0; i < bytes.length; i += 1) {
    words[i >>> 2] |= bytes[i] << (24 - (i % 4) * 8);
  }

  return CryptoJS.lib.WordArray.create(words, bytes.length);
}

function nextTick() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

export async function hashFile(file: File): Promise<string> {
  const hasher = CryptoJS.algo.SHA256.create();

  for (let offset = 0; offset < file.size; offset += HASH_CHUNK_SIZE) {
    const chunk = file.slice(offset, offset + HASH_CHUNK_SIZE);
    const bytes = new Uint8Array(await chunk.arrayBuffer());
    hasher.update(toWordArray(bytes));

    if (offset + HASH_CHUNK_SIZE < file.size) {
      await nextTick();
    }
  }

  return `0x${hasher.finalize().toString(CryptoJS.enc.Hex)}`;
}

export function formatHash(hash: string): string {
  if (hash.length <= 16) return hash;
  return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatTimestamp(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
