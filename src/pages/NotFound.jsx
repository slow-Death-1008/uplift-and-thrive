import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="max-w-md w-full animate-fade-in">
        <div className="text-center mb-8">
          <Brain className="w-16 h-16 text-primary mx-auto mb-4 animate-breathe" />
          <h1 className="text-3xl font-bold text-foreground mb-2">MindCare</h1>
        </div>

        <Card className="shadow-calm border-0 text-center">
          <CardHeader>
            <div className="text-6xl font-bold text-primary mb-4">404</div>
            <CardTitle className="text-2xl">Page Not Found</CardTitle>
            <CardDescription className="text-lg">
              Oops! The page you're looking for doesn't exist or may have been moved.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Let's get you back to your wellness journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/">
                <Button variant="calm" className="w-full sm:w-auto">
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Button>
              </Link>
              <Button 
                variant="outline" 
                onClick={() => window.history.back()}
                className="w-full sm:w-auto"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>

            <div className="mt-6 p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Need help? Your mental health matters to us. 
                <br />
                <span className="text-primary font-medium">Contact support if you need assistance.</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
