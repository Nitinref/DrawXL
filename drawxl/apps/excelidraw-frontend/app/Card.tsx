import { Zap ,Brush ,Users } from "lucide-react";

export default function Card(){

    return(
                  <div className="mx-auto grid max-w-6xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white/50 backdrop-blur-sm shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 duration-300 group h-[250px]">
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 "></div>
              <div className="absolute  top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gray-100 to-white rounded-full blur-md transform translate-x-10 -translate-y-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="p-6 relative z-10">
                <div className="w-14 h-14 rounded-full bg-black/5 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-4xl font-bold text-black">Real-Time Drawing</h3>
                <p className="text-gray-600 mt-2">
                  See changes instantly as you and your team draw together on the same canvas.
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white/50 backdrop-blur-sm shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 duration-300 group h-[250px]">
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gray-100 to-white rounded-full blur-md transform translate-x-10 -translate-y-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="p-6 relative z-10">
                <div className="w-14 h-14 rounded-full bg-black/5 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-black " />
                </div>
                <h3 className="text-4xl font-bold text-black">Collaborative Rooms</h3>
                <p className="text-gray-600 mt-2">
                  Create or join rooms to collaborate with friends, colleagues, or clients.
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white/50 backdrop-blur-sm shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 duration-300 group h-[250px]">
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gray-100 to-white rounded-full blur-md transform translate-x-10 -translate-y-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="p-6 relative z-10">
                <div className="w-14 h-14 rounded-full bg-black/5 flex items-center justify-center mb-4">
                  <Brush className="h-6 w-6 text-black " />
                </div>
                <h3 className="text-4xl font-bold text-black">Intuitive Tools</h3>
                <p className="text-gray-600 mt-2">
                  Simple yet powerful drawing tools that anyone can use without a learning curve.
                </p>
              </div>
            </div>
          </div>
    )
}