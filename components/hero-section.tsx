import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-purple-600 via-blue-600 to-green-500 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="inline-block px-3 py-1 text-sm bg-white/20 backdrop-blur-sm text-white rounded-full mb-4">
                🚀 Join 50,000+ skill swappers across India
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
                Exchange Skills,
                <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                  {" "}
                  Grow Together
                </span>
              </h1>
              <p className="max-w-[600px] text-white/90 md:text-xl">
                Join SkillSwap, a decentralized peer-to-peer learning platform where you can teach what you know and
                learn what you don't — all without spending a rupee.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-white/90 font-semibold" asChild>
                <Link href="/auth/signup">Get Started Free</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <Link href="/skills">Browse Skills</Link>
              </Button>
            </div>
          </div>
          <div className="mx-auto lg:ml-auto flex items-center justify-center">
            <div className="relative w-full max-w-[500px] aspect-square">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-2xl opacity-30 blur-xl animate-pulse"></div>
              <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl overflow-hidden w-full h-full flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 p-6">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:scale-105 transition-transform">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mb-3 shadow-lg">
                      <span className="text-white text-lg font-bold">💻</span>
                    </div>
                    <h3 className="font-medium text-white">Coding</h3>
                    <p className="text-xs text-white/80 mt-1">Learn programming from experts</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:scale-105 transition-transform">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center mb-3 shadow-lg">
                      <span className="text-white text-lg font-bold">🎵</span>
                    </div>
                    <h3 className="font-medium text-white">Music</h3>
                    <p className="text-xs text-white/80 mt-1">Master an instrument</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:scale-105 transition-transform">
                    <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center mb-3 shadow-lg">
                      <span className="text-white text-lg font-bold">👨‍🍳</span>
                    </div>
                    <h3 className="font-medium text-white">Cooking</h3>
                    <p className="text-xs text-white/80 mt-1">Learn Indian cuisine</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:scale-105 transition-transform">
                    <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center mb-3 shadow-lg">
                      <span className="text-white text-lg font-bold">🗣️</span>
                    </div>
                    <h3 className="font-medium text-white">Languages</h3>
                    <p className="text-xs text-white/80 mt-1">Learn regional languages</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
