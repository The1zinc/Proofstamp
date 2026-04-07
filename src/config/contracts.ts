/**
 * ProofStamp Contract ABI and Address
 *
 * After deploying the Solidity contract to Arc Testnet:
 * 1. Copy the deployed contract address
 * 2. Set NEXT_PUBLIC_PROOF_STAMP_ADDRESS in .env.local
 * 3. The ABI matches contracts/arc/ProofStamp.sol
 */

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000" as const;

const configuredAddress = process.env.NEXT_PUBLIC_PROOF_STAMP_ADDRESS?.trim();

export const PROOF_STAMP_ADDRESS = (
  configuredAddress && /^0x[a-fA-F0-9]{40}$/.test(configuredAddress)
    ? configuredAddress
    : ZERO_ADDRESS
) as `0x${string}`;

export const IS_PROOF_STAMP_CONFIGURED = PROOF_STAMP_ADDRESS !== ZERO_ADDRESS;

export const PROOF_STAMP_ABI = [
  {
    type: "function",
    name: "stamp",
    inputs: [
      { name: "documentHash", type: "bytes32", internalType: "bytes32" },
      { name: "fileName", type: "string", internalType: "string" },
      { name: "fileSize", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "verify",
    inputs: [
      { name: "documentHash", type: "bytes32", internalType: "bytes32" },
    ],
    outputs: [
      { name: "exists", type: "bool", internalType: "bool" },
      { name: "stamper", type: "address", internalType: "address" },
      { name: "timestamp", type: "uint256", internalType: "uint256" },
      { name: "fileName", type: "string", internalType: "string" },
      { name: "fileSize", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getStampCount",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRecentStamps",
    inputs: [{ name: "count", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "bytes32[]", internalType: "bytes32[]" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "stamps",
    inputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    outputs: [
      { name: "stamper", type: "address", internalType: "address" },
      { name: "timestamp", type: "uint256", internalType: "uint256" },
      { name: "fileName", type: "string", internalType: "string" },
      { name: "fileSize", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "DocumentStamped",
    inputs: [
      {
        name: "documentHash",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "stamper",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "timestamp",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "fileName",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "fileSize",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
  },
] as const;
