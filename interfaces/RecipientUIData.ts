import { LPMinimalInfo, NFTRecipientInfo } from "./NFTRecipientInfo";
import { RecipientData } from "./RecipientData";

// Extending LPMinimalInfo for UI purposes
export interface LPUIInfo extends LPMinimalInfo {
	token0Price: number;
	token1Price: number;
	token0Amount: number;
	token1Amount: number;
	totalValue: number;
}

// Extending RecipientData to include price and amount fields
export interface RecipientUIData extends RecipientData {
	nfts: (Omit<NFTRecipientInfo, "contractAddress" | "recipientAddress"> & {
		nftAddress: string;
		ownedLPs: LPUIInfo[]; // Ensure this uses LPUIInfo instead of LPMinimalInfo
	})[];
}
