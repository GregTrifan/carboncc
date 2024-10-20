"use client";
import React, { useState } from "react";
import { RecipientUIData } from "@/interfaces/RecipientUIData";
import LPTokensDropdown from "./LPTokensDropdown";
import { ChevronDown } from "./icons/ChevronDown";
import BlockiesSvg from 'blockies-react-svg'
import { shortenAddress } from "@/lib/utilities/shortenAddress";
interface RecipientDropdownProps {
    recipient: RecipientUIData;
    totalValue?: number;
}

const RecipientDropdown: React.FC<RecipientDropdownProps> = ({ recipient, totalValue }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className="border border-black/50 rounded-lg p-4 bg-black/20 shadow-md text-white">
            <div className="flex justify-between items-center">
                <div className="flex justify-start items-center gap-2">
                    <BlockiesSvg
                        address={recipient.recipientAddress}
                        className="bg-black/25 border-white/70 border-4 rounded-full h-12 w-12"
                    />
                    <p className="uppercase font-black">{shortenAddress(recipient.recipientAddress)}</p>
                    {totalValue && (<p className="font-black text-emerald-900 ml-3">${totalValue?.toFixed(2)}</p>)}
                </div>
                <button
                    className={`text-white hover:underline ${isOpen ? "rotate-180" : ""} transition-all`}
                    onClick={toggleDropdown}
                >
                    <ChevronDown />
                </button>
            </div>

            {isOpen && (
                <div className="mt-4 space-y-4">
                    {recipient.nfts.map((nft) => (
                        <LPTokensDropdown key={nft.nftAddress} nft={nft} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecipientDropdown;

