import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ParameterControlProps {
  parameters: {
    albedo: "0.30" | "0.33";
    obliquity: "constante" | "variable";
    eccentricity: "constante" | "variable";
    precession: "constante" | "variable";
    latitude: "0" | "50" | "90";
    tempType: "Temp" | "Var_temp";
  };
  onParameterChange: (param: string, value: string) => void;
}

export const ParameterControl = ({ parameters, onParameterChange }: ParameterControlProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">Temperature Type</h3>
        <div className="flex items-center justify-between">
          <Label htmlFor="temp-type" className="text-sm text-muted-foreground">
            {parameters.tempType === "Temp" ? "Temperature (°C)" : "Temperature Variation"}
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
        <h3 className="text-sm font-semibold text-foreground mb-4">Albedo</h3>
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
        <h3 className="text-sm font-semibold text-foreground mb-4">Obliquity</h3>
        <div className="flex items-center justify-between">
          <Label htmlFor="obliquity" className="text-sm text-muted-foreground">
            {parameters.obliquity === "constante" ? "Constant" : "Variable"}
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
        <h3 className="text-sm font-semibold text-foreground mb-4">Eccentricity</h3>
        <div className="flex items-center justify-between">
          <Label htmlFor="eccentricity" className="text-sm text-muted-foreground">
            {parameters.eccentricity === "constante" ? "Constant" : "Variable"}
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
        <h3 className="text-sm font-semibold text-foreground mb-4">Precession</h3>
        <div className="flex items-center justify-between">
          <Label htmlFor="precession" className="text-sm text-muted-foreground">
            {parameters.precession === "constante" ? "Constant" : "Variable"}
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
        <h3 className="text-sm font-semibold text-foreground mb-4">Latitude</h3>
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
