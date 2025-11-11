import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ParameterControlProps {
  parameters: {
    scenario: "base" | "aqua" | "dry";
    albedo: "0.30" | "0.33";
    obliquity: "constante" | "variable";
    eccentricity: "constante" | "variable";
    precession: "constante" | "variable";
    latitude: "0" | "50" | "90";
    tempType: "Temp" | "Var_temp";
  };
  onParameterChange: (param: string, value: string) => void;
  language?: "en" | "fr";
}

const translations = {
  en: {
    scenario: "Scenario",
    base: "Earth (Base)",
    aqua: "Aqua Planet",
    dry: "Dry Planet",
    tempType: "Temperature Type",
    temperature: "Temperature (°C)",
    tempVariation: "Temperature Variation",
    latitude: "Latitude",
    eccentricity: "Eccentricity",
    constant: "Constant",
    variable: "Variable",
    obliquity: "Obliquity",
    precession: "Precession",
    albedo: "Albedo",
  },
  fr: {
    scenario: "Scénario",
    base: "Terre (Base)",
    aqua: "Planète Aquatique",
    dry: "Planète Sèche",
    tempType: "Type de Température",
    temperature: "Température (°C)",
    tempVariation: "Variation de Température",
    latitude: "Latitude",
    eccentricity: "Excentricité",
    constant: "Constante",
    variable: "Variable",
    obliquity: "Obliquité",
    precession: "Précession",
    albedo: "Albédo",
  },
};

export const ParameterControl = ({ parameters, onParameterChange, language = "en" }: ParameterControlProps) => {
  const t = translations[language];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">{t.scenario}</h3>
        <RadioGroup 
          value={parameters.scenario} 
          onValueChange={(value) => onParameterChange("scenario", value)}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="base" id="scenario-base" />
            <Label htmlFor="scenario-base" className="text-sm text-muted-foreground cursor-pointer">
              {t.base}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="aqua" id="scenario-aqua" />
            <Label htmlFor="scenario-aqua" className="text-sm text-muted-foreground cursor-pointer">
              {t.aqua}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="dry" id="scenario-dry" />
            <Label htmlFor="scenario-dry" className="text-sm text-muted-foreground cursor-pointer">
              {t.dry}
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">{t.tempType}</h3>
        <div className="flex items-center justify-between">
          <Label htmlFor="temp-type" className="text-sm text-muted-foreground">
            {parameters.tempType === "Temp" ? t.temperature : t.tempVariation}
          </Label>
          <Switch
            id="temp-type"
            checked={parameters.tempType === "Var_temp"}
            onCheckedChange={(checked) => 
              onParameterChange("tempType", checked ? "Var_temp" : "Temp")
            }
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">{t.albedo}</h3>
        <div className="flex items-center justify-between">
          <Label htmlFor="albedo" className="text-sm text-muted-foreground">
            {parameters.albedo === "0.30" ? "0.30" : "0.33"}
          </Label>
          <Switch
            id="albedo"
            checked={parameters.albedo === "0.33"}
            onCheckedChange={(checked) => 
              onParameterChange("albedo", checked ? "0.33" : "0.30")
            }
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">{t.eccentricity}</h3>
        <div className="flex items-center justify-between">
          <Label htmlFor="eccentricity" className="text-sm text-muted-foreground">
            {parameters.eccentricity === "constante" ? t.constant : t.variable}
          </Label>
          <Switch
            id="eccentricity"
            checked={parameters.eccentricity === "variable"}
            onCheckedChange={(checked) => 
              onParameterChange("eccentricity", checked ? "variable" : "constante")
            }
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">{t.obliquity}</h3>
        <div className="flex items-center justify-between">
          <Label htmlFor="obliquity" className="text-sm text-muted-foreground">
            {parameters.obliquity === "constante" ? t.constant : t.variable}
          </Label>
          <Switch
            id="obliquity"
            checked={parameters.obliquity === "variable"}
            onCheckedChange={(checked) => 
              onParameterChange("obliquity", checked ? "variable" : "constante")
            }
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">{t.precession}</h3>
        <div className="flex items-center justify-between">
          <Label htmlFor="precession" className="text-sm text-muted-foreground">
            {parameters.precession === "constante" ? t.constant : t.variable}
          </Label>
          <Switch
            id="precession"
            checked={parameters.precession === "variable"}
            onCheckedChange={(checked) => 
              onParameterChange("precession", checked ? "variable" : "constante")
            }
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">{t.latitude}</h3>
        <RadioGroup 
          value={parameters.latitude} 
          onValueChange={(value) => onParameterChange("latitude", value)}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0" id="lat-0" />
            <Label htmlFor="lat-0" className="text-sm text-muted-foreground cursor-pointer">0°</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="50" id="lat-50" />
            <Label htmlFor="lat-50" className="text-sm text-muted-foreground cursor-pointer">50°</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="90" id="lat-90" />
            <Label htmlFor="lat-90" className="text-sm text-muted-foreground cursor-pointer">90°</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};