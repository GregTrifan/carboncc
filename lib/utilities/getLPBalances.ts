import { LPUIInfo } from "@/interfaces/RecipientUIData";

export async function getLPBalances(usrAddress: string) {
	const ZAPPER_API_URL = "https://api.zapper.xyz/v2/balances/apps";
	const ZAPPER_API_KEY = process.env.ZAPPER_KEY;

	const headers = {
		Authorization: `Basic ${Buffer.from(
			`${ZAPPER_API_KEY}:`,
			"binary"
		).toString("base64")}`,
		accept: "*/*",
		"Content-Type": "application/json",
	};

	try {
		const response = await fetch(
			`${ZAPPER_API_URL}?addresses%5B%5D=${usrAddress}&network=polygon`,
			{
				method: "GET",
				headers: headers,
			}
		);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const data = await response.json();

		// Iterate over the returned apps
		const lpBalances: LPUIInfo[] = [];
		for (const app of data) {
			const { address, products } = app;
			for (const product of products) {
				if (product.label === "Pools") {
					for (const asset of product.assets) {
						if (asset.appId === "uniswap-v2") {
							const token0 = asset.tokens[0];
							const token1 = asset.tokens[1];

							const token0Amount = parseFloat(token0.balance);
							const token1Amount = parseFloat(token1.balance);
							const totalValue =
								parseFloat(token0.balanceUSD) + parseFloat(token1.balanceUSD);

							lpBalances.push({
								contractAddress: address,
								token0: token0.symbol,
								token1: token1.symbol,
								lpBalance: asset.balance.toString(),
								token0Price: token0.price,
								token1Price: token1.price,
								token0Address: token0.address,
								token1Address: token1.address,
								token0Amount: token0Amount,
								token1Amount: token1Amount,
								totalValue: totalValue,
							});
						}
					}
				}
			}
		}

		return lpBalances;
	} catch (error) {
		console.error("Error fetching LP balances:", error);
		return null;
	}
}
