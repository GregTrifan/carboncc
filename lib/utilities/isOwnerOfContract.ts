const RPC_KEY = process.env.NEXT_PUBLIC_RPC_KEY ?? "";
const BASE_URL = `https://polygon-mainnet.g.alchemy.com/nft/v3/${RPC_KEY}`;
export async function isOwnerOfContract(
	creatorAddress: string,
	contractAddress: string
) {
	const options = { method: "GET", headers: { accept: "application/json" } };

	const response = await fetch(
		`${BASE_URL}/getContractMetadata?contractAddress=${contractAddress}`,
		options
	);
	const data = await response.json();
	// some contracts might not show up :)
	if (!data.contractDeployer) return false;

	// Check if contract deployer matches the creator
	return data.contractDeployer.toLowerCase() === creatorAddress.toLowerCase();
}
