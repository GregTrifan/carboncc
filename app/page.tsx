import RecipientDropdown from "@/components/RecipientDropdown";
import { RecipientUIData } from "@/interfaces/RecipientUIData";
import {fetchSalesData} from "@/lib/fetchSalesData";

export default async function Home() {
    const recipients = await fetchSalesData();
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-green-700 p-6">

            <div className="space-y-4">
                {recipients.map((recipient) => (
                    <RecipientDropdown totalValue={recipient.totalBalance} key={recipient.recipientAddress} recipient={recipient as RecipientUIData} />
                ))}
            </div>
        </div>
    );
}
