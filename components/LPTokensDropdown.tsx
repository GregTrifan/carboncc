/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { LPUIInfo } from "@/interfaces/RecipientUIData";
import { NFTRecipientInfo } from "@/interfaces/NFTRecipientInfo";
import { ChevronDown } from "./icons/ChevronDown";

interface LPTokensDropdownProps {
    nft: (Omit<NFTRecipientInfo, "contractAddress" | "recipientAddress"> & {
        nftAddress: string;
        ownedLPs: LPUIInfo[];
    });
}

const LPTokensDropdown: React.FC<LPTokensDropdownProps> = ({ nft }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [totalNftValue, setTotalNftValue] = useState<number>(0);

    const toggleDropdown = () => setIsOpen(!isOpen);

    useEffect(() => {


        // Calculate total value of all owned LPs
        const totalValue = nft.ownedLPs.reduce((sum, lp: LPUIInfo) => sum + lp.totalValue, 0);
        setTotalNftValue(totalValue);
    }, [nft]);

    return (
        <div className="border border-black/50 rounded-lg p-4 bg-black/20">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <p className="text-lg font-semibold my-auto">{nft.name}</p>
                    <p className="font-bold ml-2 text-xl text-emerald-200">${totalNftValue.toFixed(2)}</p>
                </div>
                <button
                    className={`text-white hover:underline ${isOpen ? "rotate-180" : ""} transition-all`}
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
                                <p className="font-bold text-xl text-emerald-200">${lp.totalValue.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LPTokensDropdown;
