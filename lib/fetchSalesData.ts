// alt for when ssr won't work as expected =)
import { LPUIInfo, RecipientUIData } from "@/interfaces/RecipientUIData";
import { getLPBalances } from "@/lib/utilities/getLPBalances";
import { getSellEvents } from "@/lib/utilities/getSellEvents";
import { isOwnerOfContract } from "@/lib/utilities/isOwnerOfContract";

export async function fetchSalesData(): Promise<
	(RecipientUIData & { totalBalance: number })[]
> {
	try {
		const creators = JSON.parse(process.env.CREATORS || "[]");

		if (!Array.isArray(creators) || creators.length === 0) {
			throw new Error("No creators found in environment variables");
		}

		const salesData: RecipientUIData[] = [];

		for (const creatorAddress of creators) {
			try {
				const sales = await getSellEvents(creatorAddress);

				for (const sale of sales) {
					const contractAddress = sale.nft.contract;
					const isOwner = await isOwnerOfContract(
						creatorAddress,
						contractAddress
					);

					if (isOwner) {
						const lps = await getLPBalances(contractAddress);
						if (lps && lps.length > 0) {
							const recipientIndex = salesData.findIndex(
								(data) => data.recipientAddress === sale.buyer
							);

							if (recipientIndex === -1) {
								salesData.push({
									recipientAddress: sale.buyer,
									nfts: [
										{
											nftAddress: contractAddress,
											name: sale.nft.name,
											ownedLPs: lps,
										},
									],
								});
							} else {
								salesData[recipientIndex].nfts.push({
									nftAddress: contractAddress,
									name: sale.nft.name,
									ownedLPs: lps,
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

		const filteredSalesData = salesData.filter(
			(recipient) => recipient.nfts.length > 0
		);

		return filteredSalesData
			.map((recipient) => {
				const totalValue = recipient.nfts.reduce((acc, nft) => {
					const lpTotal = nft.ownedLPs.reduce(
						(lpAcc, lp: LPUIInfo) => lpAcc + lp.totalValue,
						0
					);
					return acc + lpTotal;
				}, 0);
				return { ...recipient, totalBalance: totalValue };
			})
			.sort((a, b) => b.totalBalance - a.totalBalance);
	} catch (error) {
		console.error("Error in fetchSalesData:", error);
		return [];
	}
}
