import { LineChart } from "lucide-react";
import { ReactNode } from "react";

export function IconButton({
    icon, onClick,activated
}: {
    icon: ReactNode,
    onClick: () => void,
    activated:boolean
}) {

    return <div className={`pointer rounded-full border p-2 bg-black hover:bg-gray-600 ${activated ? "text-red-300" :"text-white"}` }
onClick={onClick}>
        {icon}
    </div>
}