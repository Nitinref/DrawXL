import { LineChart } from "lucide-react";
import { ReactNode } from "react";

export function IconButton({
    icon, onClick
}: {
    icon: ReactNode,
    onClick: () => void
}) {

    return <div className="pointer rounded-full border p-2 bg-black hover:bg-blue-300 text-white">

        {icon}
    </div>
}