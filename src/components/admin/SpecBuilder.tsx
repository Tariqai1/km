"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SpecBuilderProps {
  specifications: Record<string, string>;
  onChange: (specifications: Record<string, string>) => void;
}

export function SpecBuilder({ specifications, onChange }: SpecBuilderProps) {
  const specsList = Object.entries(specifications).map(([key, value], id) => ({ id, key, value }));

  const handleAdd = () => {
    const newSpecs = { ...specifications, [`New_Key_${Date.now()}`]: "" };
    onChange(newSpecs);
  };

  const handleRemove = (keyToRemove: string) => {
    const newSpecs = { ...specifications };
    delete newSpecs[keyToRemove];
    onChange(newSpecs);
  };

  const handleChange = (oldKey: string, newKey: string, newValue: string) => {
    const entries = Object.entries(specifications);
    const newSpecs: Record<string, string> = {};
    
    for (const [k, v] of entries) {
      if (k === oldKey) {
        newSpecs[newKey || `key_${Date.now()}`] = newValue;
      } else {
        newSpecs[k] = v;
      }
    }
    onChange(newSpecs);
  };

  return (
    <div className="space-y-3">
      {specsList.map(({ id, key, value }) => (
        <div key={id} className="flex items-center space-x-2">
          <Input
            value={key.startsWith("New_Key_") ? "" : key}
            onChange={(e) => handleChange(key, e.target.value, value)}
            placeholder="e.g., Capacity"
            className="flex-1"
          />
          <Input
            value={value}
            onChange={(e) => handleChange(key, key, e.target.value)}
            placeholder="e.g., 200 Kg/Hr"
            className="flex-1"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => handleRemove(key)}
            className="text-red-500 hover:text-red-700 hover:bg-red-50 shrink-0"
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
        Add Specification
      </Button>
    </div>
  );
}
