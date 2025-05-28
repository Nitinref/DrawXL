import { LineChart } from "lucide-react";
import { ReactNode } from "react";

export function IconButton({
    icon, onClick,activated
}: {
    icon: ReactNode,
    onClick: () => void,
    activated:boolean
}) {

    return <div className={`pointer rounded-xl  p-2 bg-blue-200 cursor-pointer hover:bg-blue-200 hover:text-blue-500  transition-all duration-200 ${activated ? "bg-blue-100 text-blue-600"  :"bg-white/10 text-gray-500"}` }
onClick={onClick}>
        {icon}
    </div>
}