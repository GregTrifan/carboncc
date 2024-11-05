"use client";
import React, { useState } from "react";
import { LPUIInfo, RecipientUIData } from "@/interfaces/RecipientUIData";
import LPTokensDropdown from "./LPTokensDropdown";
import { ChevronDown } from "./icons/ChevronDown";
import BlockiesSvg from "blockies-react-svg";
import { shortenAddress } from "@/lib/utilities/shortenAddress";

interface RecipientDropdownProps {
	recipient: RecipientUIData;
	totalValue?: number;
}

const RecipientDropdown: React.FC<RecipientDropdownProps> = ({
	recipient,
	totalValue,
}) => {
	const [isOpen, setIsOpen] = useState(true);
	const [isMetric, setIsMetric] = useState(false);

	const toggleUnits = () => {
		setIsMetric(!isMetric);
	};
	const toggleDropdown = () => setIsOpen(!isOpen);

	const totalCCCTokens = recipient.nfts.reduce((acc, nft) => {
		return (
			acc +
			nft.ownedLPs.reduce((lpAcc, lp: LPUIInfo) => {
				if (lp.token0 === "CCC") return lpAcc + lp.token0Amount;
				if (lp.token1 === "CCC") return lpAcc + lp.token1Amount;
				return lpAcc;
			}, 0)
		);
	}, 0);

	const totalOtherCCTokens = recipient.nfts.reduce((acc, nft) => {
		return (
			acc +
			nft.ownedLPs.reduce((lpAcc, lp: LPUIInfo) => {
				if (
					lp.token0 === "NCT" ||
					lp.token0 === "BCT" ||
					lp.token0 === "MCO2" ||
					lp.token0 === "CRISP-M"
				)
					return lpAcc + lp.token0Amount;
				if (
					lp.token1 === "NCT" ||
					lp.token1 === "BCT" ||
					lp.token1 === "MCO2" ||
					lp.token1 === "CRISP-M"
				)
					return lpAcc + lp.token1Amount;
				return lpAcc;
			}, 0)
		);
	}, 0);

	const totalRECTokens = recipient.nfts.reduce((acc, nft) => {
		return (
			acc +
			nft.ownedLPs.reduce((lpAcc, lp: LPUIInfo) => {
				if (lp.token0 === "JLT-B23" || lp.token0 === "JLT-F24")
					return lpAcc + lp.token0Amount;
				if (lp.token1 === "JLT-B23" || lp.token1 === "JLT-F24")
					return lpAcc + lp.token1Amount;
				return lpAcc;
			}, 0)
		);
	}, 0);

	const formatNumber = (value: number | string) =>
		parseFloat(value as string).toLocaleString(undefined, {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});
	const co2AmountLbs = totalCCCTokens * 1 + totalOtherCCTokens * 2200;
	const co2AmountTonnes = co2AmountLbs / 2204.62;
	const co2AmountKilos = co2AmountTonnes * 1000;

	// Display in tonnes if >= 0.1, otherwise in kilos
	const metricDisplay =
		co2AmountTonnes >= 0.1
			? `${formatNumber(co2AmountTonnes.toFixed(2))} tonnes`
			: `${formatNumber(co2AmountKilos.toFixed(2))} kg`;
	return (
		<div className="border border-black/50 rounded-lg p-2 sm:p-4 bg-black/20 shadow-md text-white">
			<div className="flex justify-between items-center">
				<div className="flex justify-start items-center gap-2">
					<BlockiesSvg
						address={recipient.recipientAddress}
						className="sm:bg-black/25 border-white/70 sm:border-4 rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12"
					/>
					<p className="uppercase font-black text-sm sm:text-base md:text-lg">
						{shortenAddress(recipient.recipientAddress)}
					</p>
					{totalValue && (
						<p className="text-sm sm:text-lg md:text-xl font-semibold text-emerald-100 ml-2 sm:ml-3">
							${totalValue?.toFixed(2)}
						</p>
					)}
					<div className="flex flex-col-reverse sm:flex-row">
						{totalCCCTokens > 0 && (
							<p className="text-xs sm:text-sm md:text-lg font-semibold text-yellow-100 ml-2 sm:ml-3 flex gap-1">
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
									{isMetric
										? metricDisplay
										: `${formatNumber(co2AmountLbs.toFixed(2))} lbs`}{" "}
									of CO₂
								</span>
								<button
									onClick={() => toggleUnits()}
									className="hover:bg-white/10 rounded-md sm:ml-1"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="h-4 w-4 sm:h-6 sm:w-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
										/>
									</svg>
								</button>
							</p>
						)}
						{totalRECTokens > 0 && (
							<p className="text-xs sm:text-sm md:text-lg font-semibold text-blue-100 ml-2 sm:ml-3 flex gap-1">
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
								<span>
									{formatNumber((totalRECTokens * 1000).toFixed(2))} KWh
								</span>
							</p>
						)}
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
				<div className="mt-3 sm:mt-4 space-y-2 sm:space-y-4">
					{recipient.nfts.map((nft) => (
						<LPTokensDropdown key={nft.nftAddress} nft={nft} />
					))}
				</div>
			)}
		</div>
	);
};

export default RecipientDropdown;
