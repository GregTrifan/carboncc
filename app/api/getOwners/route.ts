import { LPUIInfo, RecipientUIData } from "@/interfaces/RecipientUIData";
import { getLPBalances } from "@/lib/utilities/getLPBalances";
import { getSellEvents } from "@/lib/utilities/getSellEvents";
import { isOwnerOfContract } from "@/lib/utilities/isOwnerOfContract";
import { NextResponse } from "next/server";

// API handler
export async function GET() {
	try {
		const creators = JSON.parse(process.env.CREATORS || "[]");

		if (!Array.isArray(creators) || creators.length === 0) {
			throw new Error("No creators found in environment variables");
		}

		const salesData: RecipientUIData[] = [];

		for (const creatorAddress of creators) {
			try {
				// Get sales data for the creator
				const sales = await getSellEvents(creatorAddress);

				for (const sale of sales) {
					const contractAddress = sale.nft.contract;

					// Check if the creator is the owner of the contract
					const isOwner = await isOwnerOfContract(
						creatorAddress,
						contractAddress
					);

					if (isOwner) {
						const lps = await getLPBalances(contractAddress);

						// Only proceed if ownedLPs are available
						if (lps && lps.length > 0) {
							// Find or create recipient entry
							const recipientIndex = salesData.findIndex(
								(data) => data.recipientAddress === sale.buyer
							);

							if (recipientIndex === -1) {
								// Recipient not found, create new entry
								salesData.push({
									recipientAddress: sale.buyer,
									nfts: [
										{
											nftAddress: contractAddress,
											name: sale.nft.name,
											ownedLPs: lps, // Use lps directly as it is ensured to be non-empty
										},
									],
								});
							} else {
								// Recipient found, add the NFT info
								const existingRecipient = salesData[recipientIndex];
								existingRecipient.nfts.push({
									nftAddress: contractAddress,
									name: sale.nft.name,
									ownedLPs: lps, // Use lps directly as it is ensured to be non-empty
								});
							}
						}
					}
				}
			} catch (error) {
				console.error(
					`Error processing data for creator ${creatorAddress}:`,
					error
				);
			}
		}

		// Remove recipients without NFTs
		const filteredSalesData = salesData.filter(
			(recipient) => recipient.nfts.length > 0
		);

		// Calculate total LP value for each recipient and sort them by total value
		const sortedSalesData = filteredSalesData
			.map((recipient) => {
				const totalValue = recipient.nfts.reduce((acc, nft) => {
					const lpTotal = nft.ownedLPs.reduce((lpAcc, lp: LPUIInfo) => {
						return lpAcc + lp.totalValue;
					}, 0);
					return acc + lpTotal;
				}, 0);
				return { ...recipient, totalBalance: totalValue }; // Use totalValue as totalBalance
			})
			.sort((a, b) => b.totalBalance - a.totalBalance); // Sort by total balance descending

		return NextResponse.json(sortedSalesData);
	} catch (error) {
		console.error("Error in GET route:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
