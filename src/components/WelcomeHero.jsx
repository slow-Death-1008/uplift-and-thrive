import { Heart, ArrowRight, Users, Shield, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@/assets/hero-mental-health.jpg";

const WelcomeHero = ({ onStartAssessment }) => {
  const features = [
    {
      icon: Heart,
      title: "Personalized Assessment",
      description: "Answer thoughtful questions to understand your mental wellness"
    },
    {
      icon: Headphones,
      title: "Calming Library",
      description: "Access curated music and sounds for relaxation and focus"
    },
    {
      icon: Users,
      title: "Professional Support",
      description: "Connect with counselors and peer support when needed"
    },
    {
      icon: Shield,
      title: "Safe & Private",
      description: "Your data is secure and your privacy is our priority"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Your Mental Health{" "}
                  <span className="bg-gradient-calm bg-clip-text text-transparent">
                    Matters
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Take the first step towards better mental wellness. Our personalized 
                  assessment helps you understand your current state and provides 
                  tailored support for your journey.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-calm hover:opacity-90 transition-gentle text-lg px-8 py-6"
                  onClick={onStartAssessment}
                >
                  Start Your Assessment
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  variant="hero" 
                  size="lg"
                  className="text-lg px-8 py-6"
                >
                  Learn More
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8">
                {features.map((feature, index) => (
                  <Card key={index} className="border-0 shadow-gentle bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-gradient-calm rounded-lg flex items-center justify-center flex-shrink-0">
                          <feature.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">{feature.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div className="relative animate-fade-in">
              <div className="relative h-96 lg:h-[600px] rounded-3xl overflow-hidden shadow-calm">
                <img 
                  src={heroImage} 
                  alt="Mental wellness and calm nature scene" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -bottom-4 -left-4 bg-card/90 backdrop-blur-sm rounded-2xl p-6 shadow-calm border">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">98%</div>
                  <div className="text-sm text-muted-foreground">Students Report Feeling Better</div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 bg-card/90 backdrop-blur-sm rounded-2xl p-6 shadow-calm border">
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">24/7</div>
                  <div className="text-sm text-muted-foreground">Support Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHero;