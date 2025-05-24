import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      title: "Create Your Profile",
      description: "Sign up and create your profile, listing the skills you can teach and the ones you want to learn.",
      color: "bg-blue-500",
    },
    {
      number: 2,
      title: "Browse & Connect",
      description:
        "Search for users with complementary skills or let our matchmaking engine suggest potential matches.",
      color: "bg-purple-500",
    },
    {
      number: 3,
      title: "Schedule Sessions",
      description: "Use our messaging and scheduling tools to arrange your skill exchange sessions.",
      color: "bg-green-500",
    },
    {
      number: 4,
      title: "Exchange & Review",
      description: "Meet online or in-person to share your knowledge, then leave feedback to help build our community.",
      color: "bg-orange-500",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block px-3 py-1 text-sm bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-full mb-4">
              📋 Step by step
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              The SkillSwap Process
            </h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Follow these simple steps to start exchanging skills and knowledge.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <ul className="grid gap-6">
              {steps.map((step, index) => (
                <li key={index} className="flex items-start gap-4 group">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${step.color} text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    {step.number}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-medium text-gray-900">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold shadow-lg"
                asChild
              >
                <Link href="/auth/signup">Get Started Now</Link>
              </Button>
            </div>
          </div>
          <div className="mx-auto lg:ml-auto flex items-center justify-center">
            <div className="relative w-full max-w-[500px] aspect-square">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 rounded-2xl opacity-20 blur-xl animate-pulse"></div>
              <div className="relative bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden w-full h-full flex items-center justify-center">
                <div className="p-6 space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-lg">A</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Alex</h4>
                        <p className="text-xs text-gray-600">Web Developer</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-white rounded-lg p-3 text-sm shadow-sm border border-gray-100">
                        I can teach you JavaScript basics!
                      </div>
                      <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg p-3 text-sm ml-auto max-w-[80%] shadow-sm">
                        Great! I can help you learn Spanish in exchange.
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-200">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-gray-900">Upcoming Session</h4>
                      <span className="text-xs bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1 rounded-full font-medium">
                        Tomorrow
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold">B</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Basic JavaScript</p>
                        <p className="text-xs text-gray-600">3:00 PM - 4:00 PM</p>
                      </div>
                    </div>
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
