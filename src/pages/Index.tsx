import { useState } from "react";
import { ParameterControl } from "@/components/ParameterControl";
import { ImageViewer } from "@/components/ImageViewer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Plus, Menu, Globe, LayoutGrid, Columns2, Rows2 } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const translations = {
  en: {
    title: "Temperature Curves",
    subtitle: "Configure parameters and compare climate data visualizations",
    addToComparison: "Add to Comparison",
    imagesInComparison: "image(s) in comparison",
    imageAdded: "Image added to comparison",
    imageRemoved: "Image removed from comparison",
    language: "Language",
    layout: "Layout",
    layoutList: "List",
    layoutHorizontal: "Horizontal Split",
    layoutVertical: "Vertical Split",
    layoutGrid: "Grid (2×2)",
  },
  fr: {
    title: "Courbes de Température",
    subtitle: "Configurez les paramètres et comparez les visualisations de données climatiques",
    addToComparison: "Ajouter à la Comparaison",
    imagesInComparison: "image(s) en comparaison",
    imageAdded: "Image ajoutée à la comparaison",
    imageRemoved: "Image retirée de la comparaison",
    language: "Langue",
    layout: "Disposition",
    layoutList: "Liste",
    layoutHorizontal: "Division Horizontale",
    layoutVertical: "Division Verticale",
    layoutGrid: "Grille (2×2)",
  },
};

const temperatureData: Record<string, { tMin: number; tMax: number; amplitude: number }> = {
  "0.30-0-constante-constante-constante": { tMin: 19.6, tMax: 46.4, amplitude: 26.8 },
  "0.30-0-constante-constante-variable": { tMin: 19.6, tMax: 46.4, amplitude: 26.9 },
  "0.30-0-constante-variable-constante": { tMin: 14.9, tMax: 18.8, amplitude: 3.9 },
  "0.30-0-constante-variable-variable": { tMin: 14.9, tMax: 18.9, amplitude: 4.0 },
  "0.30-0-variable-constante-constante": { tMin: 19.6, tMax: 51.5, amplitude: 31.9 },
  "0.30-0-variable-constante-variable": { tMin: 19.6, tMax: 51.7, amplitude: 32.1 },
  "0.30-0-variable-variable-constante": { tMin: 11.9, tMax: 22.9, amplitude: 11.0 },
  "0.30-0-variable-variable-variable": { tMin: 11.8, tMax: 23.1, amplitude: 11.4 },
  "0.30-50-constante-constante-constante": { tMin: -28.6, tMax: 32.7, amplitude: 61.3 },
  "0.30-50-constante-constante-variable": { tMin: -28.7, tMax: 32.7, amplitude: 61.3 },
  "0.30-50-constante-variable-constante": { tMin: 14.9, tMax: 19.4, amplitude: 4.5 },
  "0.30-50-constante-variable-variable": { tMin: 14.9, tMax: 19.5, amplitude: 4.5 },
  "0.30-50-variable-constante-constante": { tMin: -31.9, tMax: 32.7, amplitude: 64.5 },
  "0.30-50-variable-constante-variable": { tMin: -32.1, tMax: 32.7, amplitude: 64.7 },
  "0.30-50-variable-variable-constante": { tMin: 11.5, tMax: 23.5, amplitude: 12.0 },
  "0.30-50-variable-variable-variable": { tMin: 11.3, tMax: 23.6, amplitude: 12.3 },
  "0.30-90-constante-constante-constante": { tMin: -69.5, tMax: 17.9, amplitude: 87.4 },
  "0.30-90-constante-constante-variable": { tMin: -69.6, tMax: 17.9, amplitude: 87.5 },
  "0.30-90-constante-variable-constante": { tMin: 14.9, tMax: 19.7, amplitude: 4.8 },
  "0.30-90-constante-variable-variable": { tMin: 14.9, tMax: 19.8, amplitude: 4.9 },
  "0.30-90-variable-constante-constante": { tMin: -71.6, tMax: 17.9, amplitude: 89.4 },
  "0.30-90-variable-constante-variable": { tMin: -71.8, tMax: 17.9, amplitude: 89.6 },
  "0.30-90-variable-variable-constante": { tMin: 11.5, tMax: 23.8, amplitude: 12.4 },
  "0.30-90-variable-variable-variable": { tMin: 11.0, tMax: 23.9, amplitude: 12.9 },
  "0.33-0-constante-constante-constante": { tMin: 28.9, tMax: 108.0, amplitude: 79.1 },
  "0.33-0-constante-constante-variable": { tMin: 28.9, tMax: 108.0, amplitude: 79.2 },
  "0.33-0-constante-variable-constante": { tMin: 22.4, tMax: 68.6, amplitude: 46.2 },
  "0.33-0-constante-variable-variable": { tMin: 22.4, tMax: 68.6, amplitude: 46.2 },
  "0.33-0-variable-constante-constante": { tMin: 28.9, tMax: 115.2, amplitude: 86.4 },
  "0.33-0-variable-constante-variable": { tMin: 28.9, tMax: 115.6, amplitude: 86.7 },
  "0.33-0-variable-variable-constante": { tMin: 22.4, tMax: 74.4, amplitude: 52.0 },
  "0.33-0-variable-variable-variable": { tMin: 22.4, tMax: 74.7, amplitude: 52.3 },
  "0.33-50-constante-constante-constante": { tMin: 0.8, tMax: 75.7, amplitude: 74.9 },
  "0.33-50-constante-constante-variable": { tMin: 0.7, tMax: 75.7, amplitude: 75.0 },
  "0.33-50-constante-variable-constante": { tMin: 23.3, tMax: 69.4, amplitude: 46.2 },
  "0.33-50-constante-variable-variable": { tMin: 23.3, tMax: 69.5, amplitude: 46.2 },
  "0.33-50-variable-constante-constante": { tMin: -3.9, tMax: 77.6, amplitude: 81.5 },
  "0.33-50-variable-constante-variable": { tMin: -4.1, tMax: 77.9, amplitude: 82.1 },
  "0.33-50-variable-variable-constante": { tMin: 23.3, tMax: 75.3, amplitude: 52.0 },
  "0.33-50-variable-variable-variable": { tMin: 23.3, tMax: 75.4, amplitude: 52.2 },
  "0.33-90-constante-constante-constante": { tMin: -57.6, tMax: 52.4, amplitude: 110.0 },
  "0.33-90-constante-constante-variable": { tMin: -57.7, tMax: 52.4, amplitude: 110.1 },
  "0.33-90-constante-variable-constante": { tMin: 23.3, tMax: 69.9, amplitude: 46.6 },
  "0.33-90-constante-variable-variable": { tMin: 23.3, tMax: 69.9, amplitude: 46.7 },
  "0.33-90-variable-constante-constante": { tMin: -60.6, tMax: 52.4, amplitude: 113.0 },
  "0.33-90-variable-constante-variable": { tMin: -60.8, tMax: 52.4, amplitude: 113.3 },
  "0.33-90-variable-variable-constante": { tMin: 23.3, tMax: 75.7, amplitude: 52.5 },
  "0.33-90-variable-variable-variable": { tMin: 23.3, tMax: 75.9, amplitude: 52.6 },
};

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [language, setLanguage] = useState<"en" | "fr">("en");
  const [layout, setLayout] = useState<"list" | "horizontal" | "vertical" | "grid">("list");
  const [parameters, setParameters] = useState({
    albedo: "0.30" as "0.30" | "0.33",
    obliquity: "constante" as "constante" | "variable",
    eccentricity: "constante" as "constante" | "variable",
    precession: "constante" as "constante" | "variable",
    latitude: "0" as "0" | "50" | "90",
    tempType: "Temp" as "Temp" | "Var_temp",
  });

  const [comparisonImages, setComparisonImages] = useState<string[]>([]);

  const handleParameterChange = (param: string, value: string) => {
    setParameters((prev) => ({
      ...prev,
      [param]: value,
    }));
  };

  const t = translations[language];

  const generateImagePath = () => {
    const { tempType, latitude, eccentricity, obliquity, precession, albedo } = parameters;
    const filename = `${tempType}_lat${latitude}_exc${eccentricity}_obl${obliquity}_pre${precession}_alb${albedo}.png`;
    return `https://raw.githubusercontent.com/Daltaxy/Milankovi-Cycles-and-their-effect-on-Temperature-Python-/main/${filename}`;
  };

  const addToComparison = () => {
    const imagePath = generateImagePath();
    setComparisonImages((prev) => [...prev, imagePath]);
    toast.success(t.imageAdded);
  };

  const removeFromComparison = (index: number) => {
    setComparisonImages((prev) => prev.filter((_, i) => i !== index));
    toast.info(t.imageRemoved);
  };

  const handleReorderImages = (newOrder: string[]) => {
    setComparisonImages(newOrder);
  };

  const getCurrentTemperatureRange = () => {
    const key = `${parameters.albedo}-${parameters.latitude}-${parameters.eccentricity}-${parameters.obliquity}-${parameters.precession}`;
    return temperatureData[key];
  };

  const tempRange = getCurrentTemperatureRange();

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      {!sidebarCollapsed && (
        <Card className="w-80 flex-shrink-0 m-4 p-5 overflow-y-auto border-border bg-card">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-primary mb-1">{t.title}</h1>
          <p className="text-xs text-muted-foreground">
            {t.subtitle}
          </p>
        </div>

        <div className="mb-4 p-3 bg-secondary/30 rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="language" className="text-sm font-medium">
              <Globe className="inline h-4 w-4 mr-2" />
              {t.language}
            </Label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">EN</span>
              <Switch
                id="language"
                checked={language === "fr"}
                onCheckedChange={(checked) => setLanguage(checked ? "fr" : "en")}
              />
              <span className="text-xs text-muted-foreground">FR</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="layout" className="text-sm font-medium">
              {t.layout}
            </Label>
            <Select value={layout} onValueChange={(value: any) => setLayout(value)}>
              <SelectTrigger id="layout" className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="list">
                  <div className="flex items-center gap-2">
                    <Menu className="h-4 w-4" />
                    {t.layoutList}
                  </div>
                </SelectItem>
                <SelectItem value="horizontal">
                  <div className="flex items-center gap-2">
                    <Rows2 className="h-4 w-4" />
                    {t.layoutHorizontal}
                  </div>
                </SelectItem>
                <SelectItem value="vertical">
                  <div className="flex items-center gap-2">
                    <Columns2 className="h-4 w-4" />
                    {t.layoutVertical}
                  </div>
                </SelectItem>
                <SelectItem value="grid">
                  <div className="flex items-center gap-2">
                    <LayoutGrid className="h-4 w-4" />
                    {t.layoutGrid}
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <ParameterControl
          parameters={parameters} 
          onParameterChange={handleParameterChange}
          language={language}
        />

        {tempRange && (
          <div className="mt-3 p-3 bg-accent/20 rounded-lg border border-border">
            <h3 className="text-xs font-semibold mb-2 text-foreground">
              {language === "en" ? "Temperature Range" : "Plage de Température"}
            </h3>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {language === "en" ? "Min:" : "Min:"}
                </span>
                <span className="font-medium text-blue-500">{tempRange.tMin}°C</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {language === "en" ? "Max:" : "Max:"}
                </span>
                <span className="font-medium text-red-500">{tempRange.tMax}°C</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {language === "en" ? "Amplitude:" : "Amplitude:"}
                </span>
                <span className="font-medium">{tempRange.amplitude}K</span>
              </div>
            </div>
          </div>
        )}

        <Button 
          onClick={addToComparison} 
          className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus className="mr-2 h-4 w-4" />
          {t.addToComparison}
        </Button>

        {comparisonImages.length > 0 && (
          <div className="mt-3 p-2.5 bg-secondary/50 rounded-lg">
            <p className="text-xs text-muted-foreground">
              {comparisonImages.length} {t.imagesInComparison}
            </p>
          </div>
        )}
      </Card>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Menu Button at top */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute top-4 left-4 z-50"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex-1 p-4 pt-16 overflow-auto">
          <ImageViewer 
            images={comparisonImages} 
            onRemoveImage={removeFromComparison}
            layout={layout === "list" ? "horizontal" : layout}
            onReorderImages={handleReorderImages}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
