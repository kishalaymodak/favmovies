import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Film, Tv, Star, CheckCircle2, Github, Chrome } from "lucide-react";

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navbar */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Film className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              MediaVault
            </span>
          </div>
          <Button onClick={() => navigate("/login")} size="lg">
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
            <Star className="h-4 w-4" />
            Organize your entertainment collection
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Manage Your Favorite
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Movies & TV Shows
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Keep track of all your favorite entertainment in one place. Add,
            edit, and organize your personal collection with ease.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              size="lg"
              className="text-lg px-8 h-12"
              onClick={() => navigate("/login")}
            >
              <Chrome className="mr-2 h-5 w-5" />
              Sign in with Google
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 h-12"
              onClick={() => navigate("/login")}
            >
              <Github className="mr-2 h-5 w-5" />
              Sign in with GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Everything You Need</h2>
          <p className="text-xl text-gray-600">
            Powerful features to organize your collection
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="border-2 hover:border-blue-400 transition-all hover:shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <Film className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Easy Management</CardTitle>
              <CardDescription>
                Add, edit, and delete entries with a simple and intuitive
                interface
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-indigo-400 transition-all hover:shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
                <Tv className="h-6 w-6 text-indigo-600" />
              </div>
              <CardTitle>Infinite Scrolling</CardTitle>
              <CardDescription>
                Browse through your entire collection seamlessly with smooth
                infinite scroll
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-purple-400 transition-all hover:shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Detailed Information</CardTitle>
              <CardDescription>
                Store comprehensive details including director, budget,
                location, and more
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-20 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Why Choose MediaVault?
          </h2>

          <div className="space-y-6">
            {[
              "Secure OAuth authentication with Google and GitHub",
              "Cloud-based storage - access from anywhere",
              "Beautiful, responsive design that works on all devices",
              "Fast and efficient with infinite scroll",
              "Complete control over your data",
              "No ads, no tracking, just your collection",
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="rounded-full bg-green-100 p-1 mt-1">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <p className="text-lg text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white">
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to Get Started?
          </h2>
          <p className="text-xl opacity-90">
            Join thousands of users organizing their favorite entertainment
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="text-lg px-8 h-12"
            onClick={() => navigate("/login")}
          >
            Start Managing Your Collection
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Film className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-gray-800">MediaVault</span>
            </div>
            <p className="text-gray-600 text-sm">
              © 2025 MediaVault. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Privacy
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Terms
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
