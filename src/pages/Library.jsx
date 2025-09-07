import { useState } from "react";
import { Play, Pause, Clock, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";

const musicCategories = [
  {
    id: "calming",
    title: "Mind Calming",
    description: "Peaceful melodies to reduce stress and anxiety",
    icon: "🧘‍♀️",
    tracks: [
      { name: "Ocean Waves", duration: "10:30", plays: 1250 },
      { name: "Forest Rainfall", duration: "15:00", plays: 890 },
      { name: "Peaceful Piano", duration: "8:45", plays: 2100 },
      { name: "Meditation Bells", duration: "12:15", plays: 675 }
    ]
  },
  {
    id: "study",
    title: "Study Focus",
    description: "Background music to enhance concentration",
    icon: "📚",
    tracks: [
      { name: "Lo-Fi Study Beats", duration: "45:00", plays: 3200 },
      { name: "Classical Focus", duration: "60:00", plays: 1800 },
      { name: "Ambient Study", duration: "30:30", plays: 2450 },
      { name: "Nature Study Mix", duration: "40:15", plays: 1650 }
    ]
  },
  {
    id: "sleep",
    title: "Sleep Sounds",
    description: "Soothing sounds for better sleep quality",
    icon: "😴",
    tracks: [
      { name: "Deep Sleep Waves", duration: "120:00", plays: 4100 },
      { name: "Nighttime Rain", duration: "90:00", plays: 3850 },
      { name: "Sleep Piano", duration: "75:30", plays: 2200 },
      { name: "Crickets & Wind", duration: "180:00", plays: 1900 }
    ]
  },
  {
    id: "whitenoise",
    title: "White Noise",
    description: "Consistent sounds to mask distractions",
    icon: "🌊",
    tracks: [
      { name: "Pure White Noise", duration: "60:00", plays: 2800 },
      { name: "Brown Noise", duration: "60:00", plays: 2200 },
      { name: "Pink Noise", duration: "60:00", plays: 1950 },
      { name: "Fan Sound", duration: "45:00", plays: 1750 }
    ]
  },
  {
    id: "focus",
    title: "Deep Focus",
    description: "Intense concentration music for deep work",
    icon: "🎯",
    tracks: [
      { name: "Binaural Beats", duration: "25:00", plays: 1600 },
      { name: "Focus Flow", duration: "30:00", plays: 1400 },
      { name: "Alpha Waves", duration: "20:15", plays: 1200 },
      { name: "Deep Work", duration: "50:30", plays: 980 }
    ]
  }
];

const Library = () => {
  const [activeCategory, setActiveCategory] = useState("calming");
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const togglePlay = (trackName: string) => {
    if (currentlyPlaying === trackName) {
      setCurrentlyPlaying(null);
    } else {
      setCurrentlyPlaying(trackName);
    }
  };

  const toggleFavorite = (trackName: string) => {
    const newFavorites = new Set(favorites);
    if (favorites.has(trackName)) {
      newFavorites.delete(trackName);
    } else {
      newFavorites.add(trackName);
    }
    setFavorites(newFavorites);
  };

  const activeData = musicCategories.find(cat => cat.id === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      <div className="container mx-auto px-4 pt-20 pb-8">
        <div className="max-w-6xl mx-auto animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Wellness Library</h1>
            <p className="text-xl text-muted-foreground">
              Curated sounds and music to support your mental well-being
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {musicCategories.map((category) => (
              <Card
                key={category.id}
                className={`cursor-pointer transition-all hover:shadow-gentle ${
                  activeCategory === category.id 
                    ? "ring-2 ring-primary shadow-calm" 
                    : "hover:shadow-md"
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <h3 className="font-medium text-sm">{category.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>

          {activeData && (
            <Card className="shadow-calm border-0">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{activeData.icon}</div>
                  <div>
                    <CardTitle className="text-2xl">{activeData.title}</CardTitle>
                    <CardDescription className="text-lg">{activeData.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activeData.tracks.map((track, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors group"
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        <Button
                          size="sm"
                          variant={currentlyPlaying === track.name ? "default" : "outline"}
                          onClick={() => togglePlay(track.name)}
                          className="w-10 h-10 rounded-full p-0"
                        >
                          {currentlyPlaying === track.name ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4 ml-0.5" />
                          )}
                        </Button>

                        <div className="flex-1">
                          <h4 className="font-medium group-hover:text-primary transition-colors">
                            {track.name}
                          </h4>
                          <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{track.duration}</span>
                            </div>
                            <span>•</span>
                            <span>{track.plays.toLocaleString()} plays</span>
                          </div>
                        </div>
                      </div>

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleFavorite(track.name)}
                        className={`opacity-0 group-hover:opacity-100 transition-opacity ${
                          favorites.has(track.name) ? "opacity-100 text-red-500" : ""
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${favorites.has(track.name) ? "fill-current" : ""}`} />
                      </Button>
                    </div>
                  ))}
                </div>

                {currentlyPlaying && (
                  <div className="mt-6 p-4 bg-gradient-calm text-white rounded-lg flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span className="font-medium">Now Playing: {currentlyPlaying}</span>
                    </div>
                    <Badge variant="secondary" className="bg-white/20 text-white">
                      {activeData.title}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Library;