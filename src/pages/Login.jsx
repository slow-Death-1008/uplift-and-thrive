import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Brain, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      toast({
        title: "Welcome to MindCare!",
        description: "You've successfully logged in.",
      });
      navigate("/");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <Brain className="w-16 h-16 text-primary mx-auto mb-4 animate-breathe" />
          <h1 className="text-3xl font-bold text-foreground mb-2">MindCare</h1>
          <p className="text-muted-foreground">Supporting your mental wellness journey</p>
        </div>

        <Card className="shadow-calm border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to continue your wellness journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="student@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Your secure password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-calm hover:opacity-90 transition-gentle"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>Need support? Contact your university counseling center</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;