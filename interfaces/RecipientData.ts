import { LPMinimalInfo, NFTRecipientInfo } from "./NFTRecipientInfo";

export interface RecipientData {
	recipientAddress: string;
	nfts: (Omit<NFTRecipientInfo, "contractAddress" | "recipientAddress"> & {
		nftAddress: string; // Add nftAddress field
		ownedLPs: LPMinimalInfo[]; // Use LPMinimalInfo for ownedLPs
	})[];
}
