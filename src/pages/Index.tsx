import { useState } from "react";
import { ParameterControl } from "@/components/ParameterControl";
import { TemperatureSlider } from "@/components/TemperatureSlider";
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

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [language, setLanguage] = useState<"en" | "fr">("en");
  const [layout, setLayout] = useState<"list" | "horizontal" | "vertical" | "grid">("list");
  const [parameters, setParameters] = useState({
    scenario: "base" as "base" | "aqua" | "dry",
    albedo: "0.30" as "0.30" | "0.33",
    obliquity: "constante" as "constante" | "variable",
    eccentricity: "constante" as "constante" | "variable",
    precession: "constante" as "constante" | "variable",
    latitude: "0" as "0" | "50" | "90",
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
    const { latitude, eccentricity, obliquity, precession, albedo, scenario } = parameters;
    const excBool = eccentricity === "variable" ? "V" : "F";
    const oblBool = obliquity === "variable" ? "V" : "F";
    const preBool = precession === "variable" ? "V" : "F";
    const filename = `${scenario}_lat${latitude}_alb${albedo}_exc${excBool}_obl${oblBool}_pre${preBool}.png`;
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

        <TemperatureSlider
          parameters={parameters}
          language={language}
        />

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
