import { Users, Search, MessageSquare, Calendar, Star } from "lucide-react"

export function FeatureSection() {
  const features = [
    {
      icon: Users,
      title: "Create Your Profile",
      description: "Sign up and list the skills you can teach and the ones you want to learn.",
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: Search,
      title: "Find Matches",
      description: "Our matchmaking engine connects you with users who have complementary skills.",
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      icon: MessageSquare,
      title: "Connect & Chat",
      description: "Use our real-time messaging system to discuss details and get to know each other.",
      color: "bg-green-500",
      bgColor: "bg-green-50",
    },
    {
      icon: Calendar,
      title: "Schedule Sessions",
      description: "Use our calendar interface to find the perfect time for your skill exchange sessions.",
      color: "bg-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      icon: Star,
      title: "Exchange & Review",
      description: "After sessions, leave feedback to help build a trusted community of learners.",
      color: "bg-pink-500",
      bgColor: "bg-pink-50",
    },
    {
      icon: Users,
      title: "Grow Together",
      description: "Build your skills and your network without spending money.",
      color: "bg-indigo-500",
      bgColor: "bg-indigo-50",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block px-3 py-1 text-sm bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full mb-4">
              ✨ How it works
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              How SkillSwap Works
            </h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform makes it easy to connect with others, share knowledge, and learn new skills.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col items-center space-y-4 rounded-2xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${feature.bgColor}`}
            >
              <div className={`rounded-2xl ${feature.color} p-4 shadow-lg`}>
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
              <p className="text-center text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
