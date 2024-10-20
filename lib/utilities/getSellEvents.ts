// Function to get sale events from OpenSea
export async function getSellEvents(address: string) {
	try {
		const response = await fetch(
			`https://api.opensea.io/api/v2/events/accounts/${address}?chain=matic&event_type=sale`,
			{
				method: "GET",
				headers: {
					accept: "application/json",
					"x-api-key": process.env.OPENSEA_KEY ?? "",
				},
			}
		);

		const data = await response.json();
		const asset_events = data.asset_events || [];
		let nextKey = data.next || "";

		// Fetch more events while the 'next' key is available
		while (nextKey) {
			const nextResponse = await fetch(
				`https://api.opensea.io/api/v2/events/accounts/${address}?chain=matic&event_type=sale&next=${nextKey}`,
				{
					method: "GET",
					headers: {
						accept: "application/json",
						"x-api-key": process.env.OPENSEA_KEY ?? "",
					},
				}
			);
			const nextData = await nextResponse.json();

			asset_events.push(...(nextData.asset_events || []));

			// Update nextKey to continue or exit loop
			nextKey = nextData.next || "";
		}

		return asset_events;
	} catch (error) {
		console.error(`Error fetching sales for creator ${address}:`, error);
		return [];
	}
}
