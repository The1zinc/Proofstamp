# ProofStamp — GenLayer Intelligent Contract
# Timestamped Document Verification with AI-Powered Analysis
#
# This contract goes beyond simple hash storage:
# - Stores document hashes with timestamps
# - Uses AI to analyze and classify document types from metadata
# - Validators use LLMs to verify document descriptions are accurate
#
# Deploy via GenLayer Studio: https://studio.genlayer.com/

from genlayer import *
import json


@gl.contract
class ProofStamp:
    stamps: TreeMap[str, str]  # hash -> JSON metadata
    stamp_count: u256

    def __init__(self):
        self.stamps = TreeMap[str, str]()
        self.stamp_count = u256(0)

    @gl.public.write
    def stamp(self, document_hash: str, file_name: str, file_size: str, description: str) -> str:
        """
        Stamp a document hash on-chain with metadata.
        The intelligent contract uses AI to classify the document type
        based on the file name and description provided.
        """
        # Check if already stamped
        existing = self.stamps.get(document_hash)
        if existing is not None:
            return "ERROR: Document already stamped"

        # Use AI to classify the document type based on filename and description
        document_type = gl.exec_prompt(
            f"""Based on the following file information, classify the document type 
            in exactly one word (e.g., 'legal', 'financial', 'technical', 'creative', 
            'academic', 'personal', 'medical', 'business', 'other'):
            
            File name: {file_name}
            Description: {description}
            
            Respond with ONLY the document type category, nothing else."""
        )

        metadata = json.dumps({
            "stamper": str(gl.message.sender_account),
            "timestamp": str(gl.block.timestamp),
            "fileName": file_name,
            "fileSize": file_size,
            "description": description,
            "documentType": document_type.strip().lower(),
        })

        self.stamps[document_hash] = metadata
        self.stamp_count = self.stamp_count + u256(1)

        return f"SUCCESS: Document stamped as '{document_type.strip().lower()}' type"

    @gl.public.view
    def verify(self, document_hash: str) -> str:
        """
        Verify if a document hash exists on-chain.
        Returns the full metadata if found, or an error message.
        """
        result = self.stamps.get(document_hash)
        if result is None:
            return json.dumps({"exists": False})

        data = json.loads(result)
        data["exists"] = True
        return json.dumps(data)

    @gl.public.view
    def get_stamp_count(self) -> str:
        return str(self.stamp_count)

    @gl.public.write
    def verify_with_ai(self, document_hash: str, claimed_description: str) -> str:
        """
        Advanced verification: Check if a document exists AND if the
        claimed description matches the original using AI analysis.
        This showcases GenLayer's unique AI-in-contract capability.
        """
        result = self.stamps.get(document_hash)
        if result is None:
            return json.dumps({
                "exists": False,
                "descriptionMatch": False,
                "analysis": "Document not found on chain"
            })

        data = json.loads(result)
        original_desc = data.get("description", "")

        # Use AI to compare the claimed description with the original
        analysis = gl.exec_prompt(
            f"""Compare these two document descriptions and determine if they 
            refer to the same document. Be concise.
            
            Original description: {original_desc}
            Claimed description: {claimed_description}
            
            Respond in this exact format:
            MATCH: [yes/no]
            CONFIDENCE: [high/medium/low]
            REASON: [one sentence explanation]"""
        )

        return json.dumps({
            "exists": True,
            "stamper": data["stamper"],
            "timestamp": data["timestamp"],
            "documentType": data.get("documentType", "unknown"),
            "descriptionMatch": "yes" in analysis.lower().split("match:")[1].split("\n")[0] if "match:" in analysis.lower() else False,
            "analysis": analysis.strip()
        })
