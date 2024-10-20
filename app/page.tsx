import RecipientDropdown from "@/components/RecipientDropdown";
import { RecipientUIData } from "@/interfaces/RecipientUIData";


async function fetchRecipients(): Promise<(RecipientUIData & { totalValue: number })[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getOwners`);
        if (!res.ok) {
            throw new Error('Failed to fetch');
        }

        return res.json();
    } catch (error) {
        console.error("Error fetching recipients:", error);
        return [];
    }
}

export default async function Home() {
    const recipients = await fetchRecipients();
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-green-700 p-6">
            <h1 className="text-3xl font-bold text-center mb-8">Leaderboard</h1>
            <div className="space-y-4">
                {recipients.map((recipient) => (
                    <RecipientDropdown totalValue={recipient.totalValue} key={recipient.recipientAddress} recipient={recipient as RecipientUIData} />
                ))}
            </div>
        </div>
    );
}
