import { GraduationCap, BookOpen, Users, Award } from "lucide-react"
import Card from "./Card"

export default function About() {
  const features = [
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Academic Excellence",
      description: "Comprehensive programs designed to foster critical thinking and innovation"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Modern Curriculum",
      description: "Industry-relevant courses that prepare students for tomorrow's challenges"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Vibrant Community",
      description: "A diverse student body that enriches learning through collaboration"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Proven Track Record",
      description: "Decades of producing graduates who make meaningful contributions"
    }
  ]

  return (
    <div id="about" className="min-h-screen bg-gradient-to-br from-emerald-50 to-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-center text-5xl font-light text-emerald-700 mb-4 tracking-wide">About Us</h1>

        {/* Main Content */}
        <Card className="my-8">
          <h2 className="text-3xl font-light text-emerald-700 mb-6">Our Story</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Founded on the principles of academic excellence and personal growth, Evergreen College 
              has been a beacon of higher education for students seeking to transform their aspirations 
              into achievements.
            </p>
            <p>
              We believe education extends beyond textbooks and classrooms. Our holistic approach 
              nurtures intellectual curiosity, critical thinking, and practical skills that empower 
              students to thrive in an ever-evolving world.
            </p>
            <p>
              At Evergreen, we're committed to creating an inclusive environment where every student 
              can discover their potential, pursue their passions, and prepare for meaningful careers 
              that make a difference.
            </p>
          </div>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card key={index}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-light text-emerald-700 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}