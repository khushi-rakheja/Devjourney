
'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TextLoop } from '@/components/motion-primitives/text-loop';
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import TextType from '@/components/TextType';
import DecryptedText from "@/components/DecryptedText"
import {
  Code2,
  Trophy,
  Briefcase,
  Calendar,
  Users,
  Star,
  ArrowRight,
  Github,
  Linkedin,
  Twitter,
  Zap,
  Shield,
  TrendingUp,
} from "lucide-react"

import type { JSX } from "react"

export default function Home(): JSX.Element {
  

  

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-blue-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-400/20 to-blue-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <header className="border-b border-white/10 bg-black/30 backdrop-blur-2xl sticky top-0 z-50 transition-all duration-500 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/20 to-slate-950/20"></div>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between relative z-10 ">
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <Code2 className="h-8 w-8 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-blue-400 opacity-20 blur-sm group-hover:opacity-30 transition-opacity duration-300"></div>
            </div>
            <span className="text-2xl font-thin">
              
              <span className="text-white bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
                DevJourney
              </span>
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/dashboard/platformRatings">
            <Button
              variant="outline"
              size="sm"
              className="bg-gray-800/60 border-white/40 hover:bg-gray-700/70 backdrop-blur-sm transition-all duration-300 hover:scale-105 text-white hover:text-white hover:border-blue-400/50"
            >
              Login
            </Button>
            </Link>
           
          </nav>
        </div>
      </header>

      <section className="relative py-24 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/10 to-slate-950"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10 animate-on-scroll slide-in-left">
              <div className="space-y-6">
                <Badge
                  variant="secondary"
                  className="w-fit bg-blue-500/20 border border-blue-400/30 text-blue-200 backdrop-blur-sm hover:scale-105 transition-all duration-300 px-4 py-2"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  All-in-One Developer Platform
                </Badge>
                <h1 className="text-5xl lg:text-7xl font-bold text-balance leading-tight">
                  <span className="text-white">Track Your</span>
                  <span className="block text-white bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent ">
                  
        <div className="relative z-10 pb-2 pr-2">Coding Journey</div>
    
                  </span>
                </h1>
                <div className="text-xl lg:text-2xl text-gray-300 text-pretty leading-relaxed max-w-xl">
                  <TextType 
  text={["Track Coding Profiles", "Never Miss A Contest", "Find Your Dream Job","Explore Projects"]}
  typingSpeed={75}
  pauseDuration={1500}
  showCursor={true}
  cursorCharacter="|"
/>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-6">
                 <Link href="/dashboard/platformRatings">
                <Button
                  size="lg"
                  className="text-lg px-10 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-500 hover:scale-105 shadow-2xl hover:shadow-blue-500/30 text-white"
                >
                  Start Your Journey
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
                </Link>
                
              </div>
              
            </div>

            <div className="relative animate-on-scroll slide-in-right delay-300">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-1000"></div>
                <div className="relative bg-black/40 backdrop-blur-2xl border border-white/20 rounded-2xl p-8 shadow-2xl hover:shadow-blue-500/20 transition-all duration-700 hover:scale-105">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white">Live Coding Stats</h3>
                      <Badge className="bg-blue-500/30 border-blue-400/50 text-blue-100 px-3 py-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-ping"></div>
                        Live
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50 hover:scale-105 transition-all duration-300">
                        <div className="text-3xl font-bold text-white">1,247</div>
                        <div className="text-sm text-gray-300">LeetCode Solved</div>
                        <div className="mt-2 flex items-center text-xs text-blue-400">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          +23 this week
                        </div>
                      </div>
                      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50 hover:scale-105 transition-all duration-300">
                        <div className="text-3xl font-bold text-white">Expert</div>
                        <div className="text-sm text-gray-300">Codeforces</div>
                        <div className="mt-2 flex items-center text-xs text-blue-400">
                          <Shield className="w-3 h-3 mr-1" />
                          1847 Rating
                        </div>
                      </div>
                      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50 hover:scale-105 transition-all duration-300">
                        <div className="text-3xl font-bold text-white">23</div>
                        <div className="text-sm text-gray-300">Contests Won</div>
                        <div className="mt-2 flex items-center text-xs text-blue-400">
                          <Trophy className="w-3 h-3 mr-1" />
                          Top 1% Global
                        </div>
                      </div>
                      <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50 hover:scale-105 transition-all duration-300">
                        <div className="text-3xl font-bold text-white">5</div>
                        <div className="text-sm text-gray-300">Job Offers</div>
                        <div className="mt-2 flex items-center text-xs text-blue-400">
                          <Briefcase className="w-3 h-3 mr-1" />
                          FAANG Ready
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

      <section id="features"  className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/5 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-6 mb-20 animate-on-scroll fade-in-up">
            <Badge className="bg-blue-500/20 border-blue-400/30 text-blue-200 px-4 py-2">Platform Features</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-balance text-white">Everything You Need in One Place</h2>
            <p className="text-xl text-gray-300 text-pretty max-w-3xl mx-auto leading-relaxed">
              Streamline your coding journey with our comprehensive platform designed for serious developers.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Code2,
                title: "Profile Aggregation",
                description:
                  "View all your coding profiles from LeetCode, GFG, CodeChef, and Codeforces in one unified dashboard.",
              },
              {
                icon: Briefcase,
                title: "Smart Job Portal",
                description:
                  "Discover opportunities from top tech companies tailored to your coding skills and experience level.",
              },
              {
                icon: Trophy,
                title: "Contest Tracking",
                description:
                  "Never miss a coding contest again with real-time notifications from all major programming platforms.",
              },
              {
                icon: Calendar,
                title: "Calendar Integration",
                description: "Add contests to your calendar with one click and get smart reminders before they start.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="group relative bg-black/20 backdrop-blur-xl border-white/10 hover:border-blue-500/30 transition-all duration-700 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10 animate-on-scroll slide-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative z-10 p-8">
                  <feature.icon className="h-14 w-14 text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300" />
                  <CardTitle className="text-xl text-white group-hover:text-blue-300 transition-colors duration-300 mb-4">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="platforms"  className="py-24 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-6 mb-20 animate-on-scroll fade-in-up">
            <Badge className="bg-blue-500/20 border-blue-400/30 text-blue-200 px-4 py-2">Supported Platforms</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-balance text-white">Connect with All Major Platforms</h2>
            <p className="text-xl text-gray-300 text-pretty max-w-2xl mx-auto">
              Seamlessly integrate with the world&apos;s leading competitive programming platforms
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "LeetCode", short: "LC", color: "orange" },
              { name: "GeeksforGeeks", short: "GFG", color: "green" },
              { name: "CodeChef", short: "CC", color: "" },
              { name: "Codeforces", short: "CF", color: "red" },
            ].map((platform, index) => (
              <div
                key={index}
                className="group relative bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center hover:border-white/20 transition-all duration-700 hover:scale-110 hover:shadow-xl animate-on-scroll slide-in-up cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative z-10">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-${platform.color}-500 to-${platform.color}-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    {platform.short}
                  </div>
                  <div className="text-lg font-semibold text-gray-100 group-hover:text-white transition-colors duration-300">
                    {platform.name}
                  </div>
                  <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mt-2">
                    Connected
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section  className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/20 to-slate-950/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="space-y-8 max-w-4xl mx-auto animate-on-scroll fade-in-up">
            <Badge className="bg-blue-500/20 border-blue-400/30 text-blue-200 px-4 py-2">Ready to Start?</Badge>
            <h2 className="text-4xl lg:text-6xl font-bold text-balance text-white leading-tight">
              Ready to Accelerate Your
              <span className="block text-white bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
                Coding Journey?
              </span>
            </h2>
            <p className="text-xl text-gray-300 text-pretty max-w-2xl mx-auto leading-relaxed">
              Join  developers who are already using DevJourney to track their progress, find opportunities,
              and excel in competitive programming.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
              <Link href="/dashboard/platformRatings">
              <Button
                size="lg"
                className="text-lg px-12 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-500 hover:scale-105 shadow-2xl hover:shadow-blue-500/30 text-white"
              >
                Get Started Free
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
              </Link>
              
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black/30 backdrop-blur-2xl pb-8">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/50 "></div>
        <div className="container mx-auto px-4 pt-8  relative z-10">
          <div className=" ">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Code2 className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold text-white bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
                  DevJourney
                </span>
              </div>
              <p className="text-gray-300 text-pretty leading-relaxed">
                Your complete platform for coding excellence and career growth in the competitive programming world.
              </p>
              <div className="flex space-x-4">
                {[Github, Twitter, Linkedin].map((Icon, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="hover:bg-white/10 transition-all duration-300 hover:scale-110 text-gray-300 hover:text-white p-3"
                  >
                    <Icon className="h-5 w-5" />
                  </Button>
                ))}
              </div>
            </div>
            {}
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 DevJourney. All rights reserved. Built with ❤️ for developers.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
