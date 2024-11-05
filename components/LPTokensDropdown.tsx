/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { LPUIInfo } from "@/interfaces/RecipientUIData";
import { NFTRecipientInfo } from "@/interfaces/NFTRecipientInfo";
import { ChevronDown } from "./icons/ChevronDown";

interface LPTokensDropdownProps {
	nft: Omit<NFTRecipientInfo, "contractAddress" | "recipientAddress"> & {
		nftAddress: string;
		ownedLPs: LPUIInfo[];
	};
}

const LPTokensDropdown: React.FC<LPTokensDropdownProps> = ({ nft }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [totalNftValue, setTotalNftValue] = useState<number>(0);
	const [nftImage, setNftImage] = useState<string>("");
	const toggleDropdown = () => setIsOpen(!isOpen);
	const totalCCC = nft.ownedLPs.reduce((acc, lp: LPUIInfo) => {
		if (lp.token0 === "CCC") return acc + lp.token0Amount;
		if (lp.token1 === "CCC") return acc + lp.token1Amount;
		return acc;
	}, 0);
	const totalOtherCC = nft.ownedLPs.reduce((acc, lp: LPUIInfo) => {
		const ccTokens = ["NCT", "BCT", "MCO2", "CRISP-M"];
		if (ccTokens.includes(lp.token0)) return acc + lp.token0Amount;
		if (ccTokens.includes(lp.token1)) return acc + lp.token1Amount;
		return acc;
	}, 0);
	const totalREC = nft.ownedLPs.reduce((acc, lp: LPUIInfo) => {
		const recTokens = ["JLT-B23", "JLT-F24"];
		if (recTokens.includes(lp.token0)) return acc + lp.token0Amount;
		if (recTokens.includes(lp.token1)) return acc + lp.token1Amount;
		return acc;
	}, 0);
	useEffect(() => {
		// Calculate total value of all owned LPs
		const totalValue = nft.ownedLPs.reduce(
			(sum, lp: LPUIInfo) => sum + lp.totalValue,
			0
		);
		setTotalNftValue(totalValue);
	}, [nft]);

	useEffect(() => {
		// Fetch NFT image from OpenSea API based on nftAddress and id (assuming id is 1)
		const fetchNftImage = async () => {
			const apiKey = process.env.NEXT_PUBLIC_OPENSEA_KEY;
			const apiUrl = `https://api.opensea.io/api/v2/chain/matic/contract/${nft.nftAddress}/nfts/1`;

			try {
				const response = await fetch(apiUrl, {
					headers: {
						"X-API-KEY": apiKey,
						"Content-Type": "application/json",
					} as HeadersInit,
				});
				const data = await response.json();

				if (data.nft) {
					setNftImage(data.nft.image_url || "");
				} else {
					console.error("Invalid API response format.");
				}
			} catch (error) {
				console.error("Error fetching NFT data:", error);
			}
		};

		fetchNftImage();

		// Calculate total value of all owned LPs
		const totalValue = nft.ownedLPs.reduce(
			(sum, lp: LPUIInfo) => sum + lp.totalValue,
			0
		);
		setTotalNftValue(totalValue);
	}, [nft]);

	const formatNumber = (value: number | string) =>
		parseFloat(value as string).toLocaleString(undefined, {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});
	return (
		<div className="border border-black/50 rounded-lg p-2 sm:p-4 bg-black/20">
			<div className="flex justify-between items-center">
				<div className="flex items-center">
					{nftImage && (
						<img
    src={nftImage}
    alt={`${nft.name} image`}
    className="h-16 w-16 md:h-24 md:w-24 rounded-md mr-4 object-cover"
/>
					)}
                    <div>
                        <div className="flex items-center">
                            <p className="text-sm sm:text-lg font-semibold my-auto">{nft.name}</p>
					<p className="font-bold ml-2 text-lg sm:text-xl text-emerald-200">
						${totalNftValue.toFixed(2)}
					</p>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-3">
                            {totalCCC > 0 && (
						<p className="text-xs md:text-lg font-semibold text-yellow-100 flex gap-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width={16}
								height={16}
								className="sm:w-6 sm:h-6"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth={2}
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M12 10a6 6 0 0 0 -6 -6h-3v2a6 6 0 0 0 6 6h3" />
								<path d="M12 14a6 6 0 0 1 6 -6h3v1a6 6 0 0 1 -6 6h-3" />
								<path d="M12 20l0 -10" />
							</svg>

							<span>
								{formatNumber((totalCCC * 1 + totalOtherCC * 2200).toFixed(2))}{" "}
								lbs of CO₂
							</span>
						</p>
					)}
					{totalREC > 0 && (
						<p className="text-xs md:text-lg font-semibold text-blue-100 flex gap-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="w-4 h-4 sm:w-6 sm:h-6"
							>
								<path
									fillRule="evenodd"
									d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z"
									clipRule="evenodd"
								/>
							</svg>
							<span>{formatNumber((totalREC * 1000).toFixed(2))}</span>
							KWh
						</p>
					)}
                    </div>
                    </div>
				</div>
				<button
					className={`text-white hover:underline ${
						isOpen ? "rotate-180" : ""
					} transition-all`}
					onClick={toggleDropdown}
				>
					<ChevronDown />
				</button>
			</div>

			{isOpen && (
				<div className="mt-4 space-y-2">
					{nft.ownedLPs.map((lp: LPUIInfo, index) => (
						<div
							key={index}
							className="border border-black/25 rounded p-3 bg-black/20"
						>
							<div className="flex justify-between content-center">
								<p className="font-black text-lg">
									{lp.token0} {" / "} {lp.token1}
								</p>
								<p className="font-bold text-xl text-emerald-200">
									${lp.totalValue.toFixed(2)}
								</p>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default LPTokensDropdown;
