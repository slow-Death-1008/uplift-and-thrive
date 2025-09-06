import { useState } from "react";
import { BarChart3, TrendingUp, Calendar, RotateCcw, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from "recharts";
import Navigation from "@/components/Navigation";

// Mock data for demonstration
const progressData = [
  { date: "Week 1", score: 45, assessments: 1 },
  { date: "Week 2", score: 52, assessments: 2 },
  { date: "Week 3", score: 48, assessments: 3 },
  { date: "Week 4", score: 61, assessments: 4 },
  { date: "Week 5", score: 67, assessments: 5 },
  { date: "Week 6", score: 72, assessments: 6 },
];

const weeklyStats = [
  { day: "Mon", mood: 7, stress: 4, sleep: 6 },
  { day: "Tue", mood: 6, stress: 5, sleep: 7 },
  { day: "Wed", mood: 8, stress: 3, sleep: 8 },
  { day: "Thu", mood: 5, stress: 7, sleep: 5 },
  { day: "Fri", mood: 7, stress: 4, sleep: 6 },
  { day: "Sat", mood: 9, stress: 2, sleep: 9 },
  { day: "Sun", mood: 8, stress: 3, sleep: 8 },
];

const Dashboard = () => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  
  const currentScore = progressData[progressData.length - 1]?.score || 0;
  const previousScore = progressData[progressData.length - 2]?.score || 0;
  const trend = currentScore - previousScore;
  
  const handleResetData = () => {
    // In a real app, this would reset user data
    setShowResetConfirm(false);
    // Show success message
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      <div className="container mx-auto px-4 pt-20 pb-8">
        <div className="max-w-7xl mx-auto animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Your Wellness Dashboard</h1>
              <p className="text-xl text-muted-foreground">
                Track your mental health progress over time
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => setShowResetConfirm(true)}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Data
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-gentle">
              <CardHeader className="pb-2">
                <CardDescription>Current Happiness Score</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <span className="text-3xl font-bold text-primary">{currentScore}%</span>
                  {trend > 0 ? (
                    <Badge variant="secondary" className="bg-success/10 text-success">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +{trend}
                    </Badge>
                  ) : trend < 0 ? (
                    <Badge variant="secondary" className="bg-destructive/10 text-destructive">
                      -{Math.abs(trend)}
                    </Badge>
                  ) : null}
                </div>
                <Progress value={currentScore} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="shadow-gentle">
              <CardHeader className="pb-2">
                <CardDescription>Total Assessments</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-3xl font-bold text-secondary">{progressData.length}</span>
                <p className="text-sm text-muted-foreground mt-1">Completed this month</p>
              </CardContent>
            </Card>

            <Card className="shadow-gentle">
              <CardHeader className="pb-2">
                <CardDescription>Streak</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-3xl font-bold text-accent">12</span>
                <p className="text-sm text-muted-foreground mt-1">Days consistent</p>
              </CardContent>
            </Card>

            <Card className="shadow-gentle">
              <CardHeader className="pb-2">
                <CardDescription>Wellness Level</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge 
                  variant="secondary" 
                  className={`text-sm px-3 py-1 ${
                    currentScore >= 70 
                      ? "bg-success/10 text-success" 
                      : currentScore >= 40 
                      ? "bg-warning/10 text-warning" 
                      : "bg-destructive/10 text-destructive"
                  }`}
                >
                  {currentScore >= 70 ? "Thriving" : currentScore >= 40 ? "Managing" : "Needs Support"}
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card className="shadow-calm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <span>Happiness Progress</span>
                </CardTitle>
                <CardDescription>Your happiness score over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={progressData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="date" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Area
                        type="monotone"
                        dataKey="score"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary)/0.1)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-calm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-secondary" />
                  <span>Weekly Mood Patterns</span>
                </CardTitle>
                <CardDescription>Mood, stress, and sleep quality this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyStats}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="day" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Line
                        type="monotone"
                        dataKey="mood"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="stress"
                        stroke="hsl(var(--destructive))"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="sleep"
                        stroke="hsl(var(--secondary))"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center space-x-6 mt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Mood</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-destructive rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Stress</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-secondary rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Sleep</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations */}
          <Card className="shadow-calm">
            <CardHeader>
              <CardTitle>Personalized Insights</CardTitle>
              <CardDescription>Based on your recent assessments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-primary/5 border border-primary/10 rounded-lg">
                  <h4 className="font-medium text-primary mb-2">Keep It Up!</h4>
                  <p className="text-sm text-muted-foreground">
                    Your consistency in taking assessments shows great self-awareness.
                  </p>
                </div>
                <div className="p-4 bg-secondary/5 border border-secondary/10 rounded-lg">
                  <h4 className="font-medium text-secondary mb-2">Sleep Focus</h4>
                  <p className="text-sm text-muted-foreground">
                    Your sleep scores show room for improvement. Try our sleep sounds library.
                  </p>
                </div>
                <div className="p-4 bg-accent/5 border border-accent/10 rounded-lg">
                  <h4 className="font-medium text-accent mb-2">Stress Management</h4>
                  <p className="text-sm text-muted-foreground">
                    Consider daily meditation. Check out our calming music section.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reset Confirmation Modal */}
          {showResetConfirm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <Card className="w-full max-w-md">
                <CardHeader>
                  <CardTitle>Reset All Data</CardTitle>
                  <CardDescription>
                    This will permanently delete all your assessment history and progress data. 
                    This action cannot be undone.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={() => setShowResetConfirm(false)}>
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
      </div>
    </div>
  );
};

export default Dashboard;