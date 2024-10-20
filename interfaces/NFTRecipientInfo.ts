export interface NFTRecipientInfo {
	contractAddress: string;
	recipientAddress: string;
	name: string;
	ownedLPs?: LPMinimalInfo[];
}
export interface LPMinimalInfo {
	contractAddress: string;
	token0: string;
	token0Address: string;
	token1Address: string;
	token1: string;
	lpBalance: string;
}
