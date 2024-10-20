import { RecipientUIData } from "@/interfaces/RecipientUIData";

export const mockData: RecipientUIData[] = [
	{
		recipientAddress: "0xf4c6a5df9050b15a21aabccbc84ccb31fbdc0846",
		nfts: [
			{
				nftAddress: "0x93172b74e49cc61814d59506661259bdd98e914d",
				name: "Blue FlaminGROWs",

				ownedLPs: [
					{
						contractAddress: "0x7407c7fdcdf3f34ef317ad478c9bae252dc91859",
						token0: "0x11f98A36aCBD04cA3Aa3a149d402AFFbD5966fe7",
						token1: "0xD838290e877E0188a4A44700463419ED96c16107",
						lpBalance: "2500000000000000000",
						token0Address: "",
						token1Address: "",
						token0Price: 1.5, // Price of token0 in USD
						token1Price: 2.0, // Price of token1 in USD
						token0Amount: 1000, // Amount of token0 held
						token1Amount: 800, // Amount of token1 held
						totalValue: 3200, // Total value of this LP in USD
					},
				],
			},
		],
	},
	{
		recipientAddress: "0xbb672bbe37c259e7d22b250d6f1310161eefaece",
		nfts: [
			{
				nftAddress: "0x2c8f62442641f5a17b8c014667fcb085471d47b6",
				name: "Blue Butterfly",

				ownedLPs: [
					{
						contractAddress: "0x7407c7fdcdf3f34ef317ad478c9bae252dc91859",
						token0: "0x11f98A36aCBD04cA3Aa3a149d402AFFbD5966fe7",
						token1: "0xD838290e877E0188a4A44700463419ED96c16107",
						lpBalance: "1000000000000000000",
						token0Address: "",
						token1Address: "",
						token0Price: 1.5,
						token1Price: 2.0,
						token0Amount: 500,
						token1Amount: 400,
						totalValue: 1600,
					},
					{
						contractAddress: "0xa4817dc7bdfdde18e54e4f0bcfa84d632eefb377",
						token0: "0x11f98A36aCBD04cA3Aa3a149d402AFFbD5966fe7",
						token1: "0x4F604735c1cF31399C6E711D5962b2B3E0225AD3",
						lpBalance: "1000000000000000000",
						token0Address: "",
						token1Address: "",
						token0Price: 1.8,
						token1Price: 2.5,
						token0Amount: 600,
						token1Amount: 350,
						totalValue: 2100,
					},
					{
						contractAddress: "0xdb916d0e476b6263c9f910e17373574747d4c471",
						token0: "0x11f98A36aCBD04cA3Aa3a149d402AFFbD5966fe7",
						token1: "0xdDc330761761751e005333208889bfe36C6E6760",
						lpBalance: "10000000000000000000",
						token0Address: "",
						token1Address: "",
						token0Price: 2.0,
						token1Price: 3.0,
						token0Amount: 2000,
						token1Amount: 1800,
						totalValue: 9600,
					},
				],
			},
		],
	},
];
