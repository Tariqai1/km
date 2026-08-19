"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FeatureBuilderProps {
  features: string[];
  onChange: (features: string[]) => void;
}

export function FeatureBuilder({ features, onChange }: FeatureBuilderProps) {
  const handleAdd = () => {
    onChange([...features, ""]);
  };

  const handleRemove = (index: number) => {
    const newFeatures = [...features];
    newFeatures.splice(index, 1);
    onChange(newFeatures);
  };

  const handleChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    onChange(newFeatures);
  };

  return (
    <div className="space-y-3">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center space-x-2">
          <Input
            value={feature}
            onChange={(e) => handleChange(index, e.target.value)}
            placeholder={`Feature ${index + 1}`}
            className="flex-1"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => handleRemove(index)}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={handleAdd}
        className="w-full border-dashed text-brand-primary border-slate-300 hover:border-brand-primary"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Feature
      </Button>
    </div>
  );
}
