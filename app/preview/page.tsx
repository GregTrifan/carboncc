"use client";
import MetricToggler from "@/components/MetricToggler";
import RecipientDropdown from "@/components/RecipientDropdown";
import { MetricProvider } from "@/contexts/MetricContext";
import { RecipientUIData } from "@/interfaces/RecipientUIData";
import { fetchSalesData } from "@/lib/fetchSalesData";
import { useEffect, useState } from "react";

export default function PreviewPage() {
	const [recipients, setRecipients] = useState<
		(RecipientUIData & { totalBalance: number })[]
	>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const getRecipients = async () => {
			try {
				const data = await fetchSalesData();
				setRecipients(data);
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
			} catch (err: any) {
				setError("Failed to fetch recipients.");
			} finally {
				setLoading(false);
			}
		};

		getRecipients();
	}, []);

	return (
		<MetricProvider>
			<div className="min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-green-700 p-2 sm:p-4 md:p-6">
				<MetricToggler/>
                {loading ? (
					<div className="text-white text-xl">Loading recipients...</div>
				) : error ? (
					<div className="text-red-500 text-xl">{error}</div>
				) : (
					<div className="space-y-4">
						{recipients.map((recipient) => (
							<RecipientDropdown
								totalValue={recipient.totalBalance}
								key={recipient.recipientAddress}
								recipient={recipient as RecipientUIData}
							/>
						))}
					</div>
				)}
			</div>
		</MetricProvider>
	);
}
