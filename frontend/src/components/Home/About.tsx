import { GraduationCap, BookOpen, Users } from "lucide-react";
import Card from "./Card";

export default function About() {
  const features = [
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Academic Excellence",
      description:
        "Comprehensive programs designed to foster critical thinking and innovation",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Modern Curriculum",
      description:
        "Industry-relevant courses that prepare students for tomorrow's challenges",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Vibrant Community",
      description:
        "A diverse student body that enriches learning through collaboration",
    },
  ];

  return (
    <div
      id="about"
      className="min-h-screen bg-white px-8 py-20"
    >
      <div className="max-w-7xl mx-auto">

        <h1 className="text-center text-5xl font-light text-emerald-700 mb-8 tracking-wide">About Us</h1>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Column: Our Story (Takes 3 columns) */}
          <div className="lg:col-span-3">
            <Card>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-12 bg-emerald-500 rounded-full"></div>
                <h2 className="text-3xl font-extralight text-emerald-700 tracking-wide">
                  Our Story
                </h2>
              </div>
              <div className="space-y-5 text-gray-600 leading-relaxed text-base">
                <p className="first-letter:text-5xl first-letter:font-light first-letter:text-emerald-600 first-letter:mr-1 first-letter:float-left">
                  Founded on the principles of academic excellence and personal growth, Evergreen
                  College has been a beacon of higher education for students seeking to transform
                  their aspirations into achievements.
                </p>
                <p>
                  We believe education extends beyond textbooks and classrooms. Our holistic
                  approach nurtures intellectual curiosity, critical thinking, and practical skills
                  that empower students to thrive in an ever-evolving world.
                </p>
                <p>
                  At Evergreen, we're committed to creating an inclusive environment where every
                  student can discover their potential, pursue their passions, and prepare for
                  meaningful careers that make a difference.
                </p>
              </div>
            </Card>
          </div>

          {/* Right Column: Features (Takes 2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            {features.map((feature, index) => (
              <Card key={index}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-11 h-11 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 shadow-sm">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-normal text-emerald-700 mb-1.5 tracking-wide">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}