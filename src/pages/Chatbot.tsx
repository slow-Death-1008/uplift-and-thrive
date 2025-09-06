import { useState, useRef, useEffect } from "react";
import { Send, RotateCcw, Bot, User, Heart, Music, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isAssessment?: boolean;
  assessmentData?: {
    question: string;
    options?: string[];
    currentQuestion?: number;
    totalQuestions?: number;
  };
}

const initialBotMessage: Message = {
  id: '1',
  type: 'bot',
  content: "Hello! I'm your mental wellness companion. I'm here to support you on your journey to better mental health. Would you like to start with a quick wellness assessment, or is there something specific you'd like to talk about?",
  timestamp: new Date()
};

const assessmentQuestions = [
  {
    question: "How are you feeling about your stress levels lately?",
    options: ["Very low stress", "Manageable stress", "Moderate stress", "High stress", "Overwhelming stress"]
  },
  {
    question: "How would you rate your sleep quality this week?",
    options: ["Excellent", "Good", "Fair", "Poor", "Very poor"]
  },
  {
    question: "How connected do you feel to your support system (friends, family)?",
    options: ["Very connected", "Connected", "Somewhat connected", "Disconnected", "Very isolated"]
  },
  {
    question: "How often have you engaged in activities you enjoy recently?",
    options: ["Daily", "Few times a week", "Weekly", "Rarely", "Never"]
  },
  {
    question: "How confident do you feel about managing your daily responsibilities?",
    options: ["Very confident", "Confident", "Somewhat confident", "Not very confident", "Not confident at all"]
  }
];

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([initialBotMessage]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [assessmentMode, setAssessmentMode] = useState(false);
  const [currentAssessmentQuestion, setCurrentAssessmentQuestion] = useState(0);
  const [assessmentAnswers, setAssessmentAnswers] = useState<string[]>([]);
  const [showResetDialog, setShowResetDialog] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (content: string, type: 'user' | 'bot', isAssessment = false, assessmentData?: any) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      isAssessment,
      assessmentData
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateTyping = (callback: () => void, delay = 1500) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, delay);
  };

  const startAssessment = () => {
    setAssessmentMode(true);
    setCurrentAssessmentQuestion(0);
    setAssessmentAnswers([]);
    
    simulateTyping(() => {
      const question = assessmentQuestions[0];
      addMessage(
        question.question,
        'bot',
        true,
        {
          question: question.question,
          options: question.options,
          currentQuestion: 1,
          totalQuestions: assessmentQuestions.length
        }
      );
    });
  };

  const handleAssessmentAnswer = (answer: string) => {
    const newAnswers = [...assessmentAnswers, answer];
    setAssessmentAnswers(newAnswers);
    
    addMessage(answer, 'user');
    
    if (currentAssessmentQuestion < assessmentQuestions.length - 1) {
      const nextQuestion = currentAssessmentQuestion + 1;
      setCurrentAssessmentQuestion(nextQuestion);
      
      simulateTyping(() => {
        const question = assessmentQuestions[nextQuestion];
        addMessage(
          question.question,
          'bot',
          true,
          {
            question: question.question,
            options: question.options,
            currentQuestion: nextQuestion + 1,
            totalQuestions: assessmentQuestions.length
          }
        );
      });
    } else {
      // Assessment completed
      setAssessmentMode(false);
      const score = calculateWellnessScore(newAnswers);
      
      simulateTyping(() => {
        const recommendation = getRecommendation(score);
        addMessage(
          `Thank you for completing the assessment! Your current wellness score is ${score}/100. ${recommendation}`,
          'bot'
        );
      }, 2000);
    }
  };

  const calculateWellnessScore = (answers: string[]) => {
    const scores = answers.map((answer, index) => {
      const options = assessmentQuestions[index].options;
      const answerIndex = options.indexOf(answer);
      return (options.length - answerIndex - 1) * 20; // Scale to 0-80, then we add base 20
    });
    
    const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    return Math.round(averageScore + 20); // Add base score of 20
  };

  const getRecommendation = (score: number) => {
    if (score >= 70) {
      return "You're doing great! Focus on maintaining your current wellness practices. Consider exploring our music library for relaxation and continued growth.";
    } else if (score >= 50) {
      return "You're managing well with some areas for improvement. I recommend exploring our wellness library for calming music and resources, plus maintaining good lifestyle habits.";
    } else {
      return "It seems like you could benefit from additional support. I strongly recommend connecting with professional counselors, exploring our support resources, and considering reaching out to mental health professionals.";
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    addMessage(inputValue, 'user');
    const userMessage = inputValue.toLowerCase();
    setInputValue("");
    
    // Simple response logic
    simulateTyping(() => {
      if (userMessage.includes('assessment') || userMessage.includes('test') || userMessage.includes('evaluate')) {
        addMessage("I'd be happy to guide you through a wellness assessment. This will help me understand your current mental health state better. Shall we begin?", 'bot');
      } else if (userMessage.includes('stress') || userMessage.includes('anxious') || userMessage.includes('worried')) {
        addMessage("I understand you're dealing with stress or anxiety. These feelings are completely valid. Would you like to try a quick breathing exercise, listen to some calming music from our library, or talk through what's bothering you?", 'bot');
      } else if (userMessage.includes('sleep') || userMessage.includes('tired') || userMessage.includes('insomnia')) {
        addMessage("Sleep issues can really impact your well-being. Our library has some wonderful sleep sounds that many students find helpful. Would you also like to discuss your sleep routine or explore some relaxation techniques?", 'bot');
      } else if (userMessage.includes('music') || userMessage.includes('relax') || userMessage.includes('calm')) {
        addMessage("Music can be incredibly therapeutic! Our wellness library has curated collections for different needs - calming music for stress relief, focus music for studying, and sleep sounds for better rest. Would you like me to guide you there?", 'bot');
      } else if (userMessage.includes('help') || userMessage.includes('support') || userMessage.includes('professional')) {
        addMessage("Seeking help is a sign of strength, not weakness. Depending on your needs, I can connect you with professional counselors, peer support groups, or crisis helplines. What kind of support are you looking for?", 'bot');
      } else {
        addMessage("Thank you for sharing that with me. Your mental health journey is important, and I'm here to support you. Would you like to take a wellness assessment so I can provide more personalized guidance, or is there something specific you'd like to explore?", 'bot');
      }
    });
  };

  const handleResetData = () => {
    setMessages([initialBotMessage]);
    setAssessmentMode(false);
    setCurrentAssessmentQuestion(0);
    setAssessmentAnswers([]);
    setShowResetDialog(false);
    
    toast({
      title: "Data Reset Complete",
      description: "All your conversation and assessment data has been cleared.",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      
      {/* Header with Reset Button */}
      <div className="fixed top-16 right-4 z-40">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowResetDialog(true)}
          className="bg-card/80 backdrop-blur-sm shadow-gentle"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset Data
        </Button>
      </div>

      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Header */}
          <div className="text-center mb-6 animate-fade-in">
            <h1 className="text-3xl font-bold text-foreground mb-2">Mental Wellness Chat</h1>
            <p className="text-muted-foreground">
              Your personal AI companion for mental health support and guidance
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 animate-fade-in">
            <Card 
              className="cursor-pointer hover:shadow-gentle transition-all border-0 bg-card/50 backdrop-blur-sm"
              onClick={startAssessment}
            >
              <CardContent className="p-4 text-center">
                <Heart className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-medium">Wellness Assessment</h3>
                <p className="text-sm text-muted-foreground">Quick check-in on your mental health</p>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-gentle transition-all border-0 bg-card/50 backdrop-blur-sm"
              onClick={() => navigate('/library')}
            >
              <CardContent className="p-4 text-center">
                <Music className="w-8 h-8 text-secondary mx-auto mb-2" />
                <h3 className="font-medium">Wellness Library</h3>
                <p className="text-sm text-muted-foreground">Calming music and sounds</p>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-gentle transition-all border-0 bg-card/50 backdrop-blur-sm"
              onClick={() => navigate('/dashboard')}
            >
              <CardContent className="p-4 text-center">
                <BarChart3 className="w-8 h-8 text-accent mx-auto mb-2" />
                <h3 className="font-medium">Progress Dashboard</h3>
                <p className="text-sm text-muted-foreground">Track your wellness journey</p>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <Card className="shadow-calm border-0 h-96">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Bot className="w-5 h-5 text-primary animate-breathe" />
                <span>Wellness Assistant</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex flex-col h-80">
              {/* Messages */}
              <ScrollArea className="flex-1 px-4">
                <div className="space-y-4 pb-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start space-x-3 animate-fade-in ${
                        message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === 'user' 
                          ? 'bg-primary text-white' 
                          : 'bg-secondary text-white'
                      }`}>
                        {message.type === 'user' ? (
                          <User className="w-4 h-4" />
                        ) : (
                          <Bot className="w-4 h-4" />
                        )}
                      </div>
                      
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-primary text-white'
                          : 'bg-muted text-foreground'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        
                        {message.isAssessment && message.assessmentData?.options && (
                          <div className="mt-3 space-y-2">
                            <div className="text-xs opacity-70 mb-2">
                              Question {message.assessmentData.currentQuestion} of {message.assessmentData.totalQuestions}
                            </div>
                            {message.assessmentData.options.map((option, index) => (
                              <Button
                                key={index}
                                size="sm"
                                variant="outline"
                                className="w-full justify-start text-xs bg-background/50"
                                onClick={() => handleAssessmentAnswer(option)}
                              >
                                {option}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex items-start space-x-3 animate-fade-in">
                      <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="bg-muted px-4 py-2 rounded-2xl">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-foreground/40 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-foreground/40 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-foreground/40 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="p-4 border-t bg-card/50">
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={assessmentMode ? "Please select an option above..." : "Type your message here..."}
                    disabled={assessmentMode}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || assessmentMode}
                    size="sm"
                    variant="calm"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                
                {!assessmentMode && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge 
                      variant="secondary" 
                      className="cursor-pointer hover:bg-secondary/80 text-xs"
                      onClick={() => setInputValue("I'm feeling stressed")}
                    >
                      I'm feeling stressed
                    </Badge>
                    <Badge 
                      variant="secondary" 
                      className="cursor-pointer hover:bg-secondary/80 text-xs"
                      onClick={startAssessment}
                    >
                      Start assessment
                    </Badge>
                    <Badge 
                      variant="secondary" 
                      className="cursor-pointer hover:bg-secondary/80 text-xs"
                      onClick={() => setInputValue("I need help with sleep")}
                    >
                      Sleep help
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Reset Confirmation Dialog */}
      {showResetDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md animate-scale-in">
            <CardHeader>
              <CardTitle>Reset All Data</CardTitle>
              <CardDescription>
                This will permanently delete all your conversations and assessment data. 
                This action cannot be undone.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowResetDialog(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleResetData}>
                Reset Data
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Chatbot;