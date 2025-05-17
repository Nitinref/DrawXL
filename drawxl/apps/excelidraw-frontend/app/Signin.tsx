import Link from "next/link";
type SigninProps = {
    text: string;
};
export default function Signin({ text }: SigninProps) {

    return (

        <Link href={"/signin"}>
        <div className="h-[55px] w-[115px] bg-white rounded-lg flex cursor-pointer border" >
            <div className="flex justify-center items-center pl-8 text-black font-medium  ">
                {text}
            </div>

        </div>
        </Link>
    

    )
}