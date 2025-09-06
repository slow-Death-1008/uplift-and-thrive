import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Heart, MessageCircle, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import Navigation from "@/components/Navigation";
import WelcomeHero from "@/components/WelcomeHero";
import heroImage from "@/assets/hero-mental-health.jpg";

const questions = [
  {
    id: 1,
    question: "How often do you feel overwhelmed by your academic responsibilities?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
  },
  {
    id: 2,
    question: "How well do you sleep at night?",
    options: ["Very well", "Well", "Okay", "Poorly", "Very poorly"]
  },
  {
    id: 3,
    question: "How connected do you feel to your friends and family?",
    options: ["Very connected", "Connected", "Somewhat connected", "Disconnected", "Very disconnected"]
  },
  {
    id: 4,
    question: "How often do you engage in physical exercise or activities?",
    options: ["Daily", "Few times a week", "Weekly", "Rarely", "Never"]
  },
  {
    id: 5,
    question: "How satisfied are you with your current academic performance?",
    options: ["Very satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very dissatisfied"]
  },
  {
    id: 6,
    question: "How often do you feel anxious or worried?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
  },
  {
    id: 7,
    question: "How well do you manage your time and priorities?",
    options: ["Very well", "Well", "Okay", "Poorly", "Very poorly"]
  },
  {
    id: 8,
    question: "How often do you take breaks for self-care activities?",
    options: ["Daily", "Few times a week", "Weekly", "Rarely", "Never"]
  },
  {
    id: 9,
    question: "How comfortable are you seeking help when needed?",
    options: ["Very comfortable", "Comfortable", "Neutral", "Uncomfortable", "Very uncomfortable"]
  },
  {
    id: 10,
    question: "How positive do you feel about your future?",
    options: ["Very positive", "Positive", "Neutral", "Negative", "Very negative"]
  }
];

const Assessment = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [additionalConcerns, setAdditionalConcerns] = useState("");
  const navigate = useNavigate();

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleStartAssessment = () => {
    setHasStarted(true);
  };

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setShowResults(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const calculateHappinessMeter = () => {
    const scores = Object.values(answers).map(answer => {
      const optionIndex = questions[0].options.indexOf(answer);
      return 5 - optionIndex; // Higher score for better answers
    });
    
    const totalScore = scores.reduce((sum, score) => sum + score, 0);
    const maxScore = questions.length * 5;
    return Math.round((totalScore / maxScore) * 100);
  };

  // Show welcome screen if user hasn't started
  if (!hasStarted) {
    return (
      <div>
        <Navigation />
        <WelcomeHero onStartAssessment={handleStartAssessment} />
      </div>
    );
  }

  if (showResults) {
    const happinessScore = calculateHappinessMeter();
    
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Navigation />
        <div className="container mx-auto px-4 pt-20 pb-8">
          <div className="max-w-2xl mx-auto animate-fade-in">
            <Card className="shadow-calm border-0">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-calm rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Your Wellness Assessment</CardTitle>
                <CardDescription>Here's your current happiness meter and recommendations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{happinessScore}%</div>
                  <p className="text-muted-foreground">Happiness Meter</p>
                  <Progress value={happinessScore} className="mt-4" />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Recommendations for You:</h3>
                  {happinessScore >= 70 ? (
                    <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                      <h4 className="font-medium text-success mb-2">Lifestyle Enhancement</h4>
                      <p className="text-sm text-muted-foreground">
                        Great job! Focus on maintaining your sleep cycle, healthy eating, and social connections.
                      </p>
                    </div>
                  ) : happinessScore >= 40 ? (
                    <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                      <h4 className="font-medium text-warning mb-2">Lifestyle + Library Support</h4>
                      <p className="text-sm text-muted-foreground">
                        Consider improving your daily routines and explore our calming music library.
                      </p>
                    </div>
                  ) : (
                    <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                      <h4 className="font-medium text-destructive mb-2">Professional Support Recommended</h4>
                      <p className="text-sm text-muted-foreground">
                        We recommend connecting with professional counselors and support resources.
                      </p>
                    </div>
                  )}
                </div>

                {additionalConcerns && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Additional Concerns:</h3>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm">{additionalConcerns}</p>
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <Button onClick={() => navigate("/library")} className="flex-1" variant="calm">
                    <Music className="w-4 h-4 mr-2" />
                    Explore Library
                  </Button>
                  <Button onClick={() => navigate("/dashboard")} className="flex-1" variant="peaceful">
                    View Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      <div className="container mx-auto px-4 pt-20 pb-8">
        {currentQuestion === 0 && (
          <div className="max-w-4xl mx-auto mb-8 animate-fade-in">
            <div className="relative h-64 rounded-2xl overflow-hidden shadow-calm">
              <img 
                src={heroImage} 
                alt="Mental wellness journey" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent flex items-center">
                <div className="p-8">
                  <h1 className="text-4xl font-bold text-white mb-2">
                    Your Wellness Journey Starts Here
                  </h1>
                  <p className="text-xl text-white/90">
                    Answer a few questions to understand your mental health better
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-2xl mx-auto animate-fade-in">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="shadow-calm border-0">
            <CardHeader>
              <CardTitle className="text-xl">
                {questions[currentQuestion].question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup
                value={answers[currentQuestion] || ""}
                onValueChange={handleAnswer}
                className="space-y-3"
              >
                {questions[currentQuestion].options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label 
                      htmlFor={`option-${index}`} 
                      className="flex-1 cursor-pointer py-2 px-3 rounded hover:bg-muted/50 transition-colors"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {isLastQuestion && (
                <div className="space-y-2 pt-4 border-t">
                  <Label htmlFor="concerns">
                    <MessageCircle className="w-4 h-4 inline mr-2" />
                    Any specific concerns not covered above? (Optional)
                  </Label>
                  <Textarea
                    id="concerns"
                    placeholder="Share anything else that's affecting your mental health..."
                    value={additionalConcerns}
                    onChange={(e) => setAdditionalConcerns(e.target.value)}
                    rows={4}
                  />
                </div>
              )}

              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={!answers[currentQuestion]}
                  variant="calm"
                >
                  {isLastQuestion ? "Complete Assessment" : "Next"}
                  {!isLastQuestion && <ChevronRight className="w-4 h-4 ml-2" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Assessment;