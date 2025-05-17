import Link from "next/link";

type SignupProps = {
    text: string;
};
export default function Signup({ text }: SignupProps) {

    return (
  <Link href={"/signup"}>
        <div className="h-[55px] w-[115px] bg-black rounded-lg flex cursor-pointer border hover:shadow-xl transition-all duration-300 group " >
            <div className="flex justify-center items-center pl-8 font-medium ">
                {text}
            </div>

        </div>
        </Link>
 

    )
}