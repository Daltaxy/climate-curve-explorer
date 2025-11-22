import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface TemperatureSliderProps {
  parameters: {
    scenario: "base" | "aqua" | "dry";
    albedo: "0.30" | "0.33";
    obliquity: "constante" | "variable";
    eccentricity: "constante" | "variable";
    precession: "constante" | "variable";
    latitude: "0" | "50" | "90";
  };
  language: "en" | "fr";
}

interface TempData {
  mean: number;
  max: number;
  min: number;
}

export const TemperatureSlider = ({ parameters, language }: TemperatureSliderProps) => {
  const [year, setYear] = useState(10000);
  const [tempData, setTempData] = useState<TempData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const generateCSVUrl = () => {
    const { scenario, latitude, eccentricity, obliquity, precession, albedo } = parameters;
    const excBool = eccentricity === "variable" ? "V" : "F";
    const oblBool = obliquity === "variable" ? "V" : "F";
    const preBool = precession === "variable" ? "V" : "F";
    const filename = `${scenario}_lat${latitude}_alb${albedo}_exc${excBool}_obl${oblBool}_pre${preBool}.csv`;
    return `https://raw.githubusercontent.com/Daltaxy/Milankovi-Cycles-and-their-effect-on-Temperature-Python-/main/${filename}`;
  };

  useEffect(() => {
    const fetchTemperatureData = async () => {
      setLoading(true);
      setError(false);
      
      try {
        const url = generateCSVUrl();
        console.log("Fetching CSV from:", url);
        const response = await fetch(url);
        
        if (!response.ok) {
          console.error("Failed to fetch CSV:", response.status, response.statusText);
          throw new Error("Failed to fetch data");
        }
        
        const csvText = await response.text();
        const lines = csvText.trim().split("\n").filter(line => line.trim());

        // Find the line for the selected year (skip header)
        const dataLine = lines.find((line) => {
          const trimmed = line.trim();
          if (!trimmed || trimmed.toLowerCase().startsWith("year")) return false;
          const parts = trimmed.split(",").map(p => p.trim());
          return parseInt(parts[0]) === year;
        });

        if (dataLine) {
          const parts = dataLine.trim().split(",").map(p => p.trim());
          const mean = parseFloat(parts[1]);
          const max = parseFloat(parts[2]);
          const min = parseFloat(parts[3]);
          
          if (!isNaN(mean) && !isNaN(max) && !isNaN(min)) {
            setTempData({ mean, max, min });
          } else {
            setError(true);
          }
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching temperature data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTemperatureData();
  }, [year, parameters]);

  const handleSliderChange = (value: number[]) => {
    setYear(value[0]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 100 && value <= 200000) {
      // Round to nearest 100
      setYear(Math.round(value / 100) * 100);
    }
  };

  const t = language === "en" ? {
    year: "Year",
    years: "years",
    mean: "Mean:",
    max: "Max:",
    min: "Min:",
    loading: "Loading...",
    error: "Data unavailable"
  } : {
    year: "Année",
    years: "années",
    mean: "Moyenne:",
    max: "Max:",
    min: "Min:",
    loading: "Chargement...",
    error: "Données indisponibles"
  };

  return (
    <Card className="p-4 bg-accent/20 border-border space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="year-input" className="text-sm font-medium text-foreground">
            {t.year}
          </Label>
          <div className="flex items-center gap-2">
            <Input
              id="year-input"
              type="number"
              value={year}
              onChange={handleInputChange}
              min={100}
              max={200000}
              step={100}
              className="w-24 h-8 text-sm"
            />
            <span className="text-xs text-muted-foreground">{t.years}</span>
          </div>
        </div>
        
        <Slider
          value={[year]}
          onValueChange={handleSliderChange}
          min={100}
          max={200000}
          step={100}
          className="w-full"
        />
      </div>

      <div className="pt-2 border-t border-border/50">
        {loading ? (
          <div className="flex items-center justify-center py-2">
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            <span className="ml-2 text-xs text-muted-foreground">{t.loading}</span>
          </div>
        ) : error ? (
          <div className="text-center py-2">
            <span className="text-xs text-destructive">{t.error}</span>
          </div>
        ) : tempData ? (
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">{t.mean}</span>
              <span className="font-medium text-foreground">{tempData.mean.toFixed(2)}°C</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">{t.max}</span>
              <span className="font-medium text-red-500">{tempData.max.toFixed(2)}°C</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">{t.min}</span>
              <span className="font-medium text-blue-500">{tempData.min.toFixed(2)}°C</span>
            </div>
          </div>
        ) : null}
      </div>
    </Card>
  );
};
