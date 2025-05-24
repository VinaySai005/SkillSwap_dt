import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Graphic Designer",
      avatar: "/placeholder.svg?height=40&width=40",
      avatarBg: "bg-gradient-to-r from-pink-500 to-purple-500",
      content:
        "I've been teaching graphic design and learning tabla. The platform made it so easy to connect with others who have complementary skills!",
      cardBg: "bg-gradient-to-br from-pink-50 to-purple-50",
      borderColor: "border-pink-200",
    },
    {
      name: "Arjun Patel",
      role: "Software Engineer",
      avatar: "/placeholder.svg?height=40&width=40",
      avatarBg: "bg-gradient-to-r from-blue-500 to-green-500",
      content:
        "I've been teaching coding and learning Gujarati. The scheduling system makes it super convenient to find time that works for both parties.",
      cardBg: "bg-gradient-to-br from-blue-50 to-green-50",
      borderColor: "border-blue-200",
    },
    {
      name: "Kavya Reddy",
      role: "Classical Dancer",
      avatar: "/placeholder.svg?height=40&width=40",
      avatarBg: "bg-gradient-to-r from-orange-500 to-red-500",
      content:
        "As a Bharatanatyam teacher, I've been able to expand my cooking skills while sharing my knowledge of classical dance. It's a win-win situation!",
      cardBg: "bg-gradient-to-br from-orange-50 to-red-50",
      borderColor: "border-orange-200",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block px-3 py-1 text-sm bg-gradient-to-r from-orange-600 to-pink-600 text-white rounded-full mb-4">
              💬 Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              What Our Users Say
            </h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear from people who have transformed their learning journey with SkillSwap.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className={`${testimonial.cardBg} border-2 ${testimonial.borderColor} shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-full ${testimonial.avatarBg} flex items-center justify-center shadow-lg`}
                  >
                    <span className="text-white font-bold text-lg">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-yellow-400"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
