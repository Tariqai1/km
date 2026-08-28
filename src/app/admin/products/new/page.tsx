"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { FeatureBuilder } from "@/components/admin/FeatureBuilder";
import { SpecBuilder } from "@/components/admin/SpecBuilder";
import { 
  Loader2, 
  ArrowLeft, 
  Package, 
  ImageIcon, 
  ListChecks, 
  FolderTree, 
  Paperclip, 
  Sparkles, 
  Lock, 
  Unlock, 
  AlertCircle,
  CheckCircle2
} from "lucide-react";

export default function AddProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [isSlugLocked, setIsSlugLocked] = useState(true);
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState<string[]>([""]);
  const [specifications, setSpecifications] = useState<Record<string, string>>({});
  const [images, setImages] = useState<{ url: string; cloudinaryId: string }[]>([]);
  const [brochureUrl, setBrochureUrl] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [status, setStatus] = useState("Active");

  // Auto-generate slug from title unless manually unlocked
  useEffect(() => {
    if (isSlugLocked && title) {
      setSlug(
        title
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "")
      );
    }
  }, [title, isSlugLocked]);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        if (res.ok) {
          const data = await res.json();
          setCategories(Array.isArray(data) ? data : (Array.isArray(data?.categories) ? data.categories : []));
        }
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (!categoryId) {
      setError("Please select a product category.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          categoryId,
          description,
          features: features.filter((f) => f.trim() !== ""),
          specifications,
          images,
          brochureUrl,
          isFeatured,
          status,
        }),
      });

      if (res.ok) {
        router.push("/admin/products");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to create product");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-16 space-y-8 px-4 sm:px-6 lg:px-8">
      {/* Top Header & Sticky Navigation Bar */}
      <div className="sticky top-0 z-20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4 bg-slate-50/80 backdrop-blur-md border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" className="h-9 w-9 shrink-0 rounded-lg border-slate-300" asChild>
            <Link href="/admin/products">
              <ArrowLeft className="h-4 w-4 text-slate-600" />
            </Link>
          </Button>
          <div>
            <h1 className="font-display font-bold text-2xl text-slate-900 tracking-tight">Add New Product</h1>
            <p className="text-xs text-slate-500 hidden sm:block">Fill in details to list machinery in the public catalog.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto w-full sm:w-auto">
          <Button 
            type="button" 
            variant="outline" 
            className="flex-1 sm:flex-initial"
            onClick={() => router.back()} 
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            form="product-form"
            type="submit" 
            className="flex-1 sm:flex-initial bg-brand-primary hover:bg-brand-primary/90 text-white shadow-sm font-medium" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Publish Product"
            )}
          </Button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="flex items-center gap-3 bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 text-sm shadow-sm animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
          <p className="font-medium">{error}</p>
        </div>
      )}

      {/* Main Form */}
      <form id="product-form" onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Column (Left 2 cols on Desktop) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Basic Info */}
            <Card className="border-slate-200/80 shadow-sm rounded-xl overflow-hidden">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-brand-primary" />
                  <CardTitle className="text-base font-semibold text-slate-800">Basic Details</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-5 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Product Title <span className="text-red-500">*</span>
                  </Label>
                  <Input 
                    id="title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="e.g. Industrial Dough Mixer 50kg" 
                    className="h-10 border-slate-200 focus:border-brand-primary"
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="slug" className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                      URL Slug <span className="text-red-500">*</span>
                    </Label>
                    <button
                      type="button"
                      onClick={() => setIsSlugLocked(!isSlugLocked)}
                      className="text-xs text-brand-primary hover:underline flex items-center gap-1 font-medium"
                    >
                      {isSlugLocked ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
                      {isSlugLocked ? "Auto Syncing" : "Custom Slug"}
                    </button>
                  </div>
                  <Input 
                    id="slug" 
                    value={slug} 
                    onChange={(e) => {
                      setIsSlugLocked(false);
                      setSlug(e.target.value);
                    }} 
                    className="h-10 bg-slate-50/60 font-mono text-xs text-slate-600 border-slate-200" 
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea 
                    id="description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    placeholder="Write a comprehensive overview of the machinery, intended applications, and benefits..." 
                    className="min-h-[160px] border-slate-200 focus:border-brand-primary leading-relaxed"
                    required 
                  />
                </div>
              </CardContent>
            </Card>

            {/* Media Upload */}
            <Card className="border-slate-200/80 shadow-sm rounded-xl overflow-hidden">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-brand-primary" />
                  <div>
                    <CardTitle className="text-base font-semibold text-slate-800">Product Media</CardTitle>
                    <CardDescription className="text-xs text-slate-500">
                      Upload up to 8 images. The first image will be set as the main cover photo.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ImageUploader images={images} onChange={setImages} />
              </CardContent>
            </Card>

            {/* Specifications & Features */}
            <Card className="border-slate-200/80 shadow-sm rounded-xl overflow-hidden">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <ListChecks className="h-5 w-5 text-brand-primary" />
                  <CardTitle className="text-base font-semibold text-slate-800">Features & Technical Specs</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-8 pt-6">
                <div className="space-y-3">
                  <Label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Key Features
                  </Label>
                  <FeatureBuilder features={features} onChange={setFeatures} />
                </div>
                
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <Label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Technical Specifications
                  </Label>
                  <SpecBuilder specifications={specifications} onChange={setSpecifications} />
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Sidebar Column (Right 1 col on Desktop) */}
          <div className="space-y-6">
            
            {/* Organization & Publishing Options */}
            <Card className="border-slate-200/80 shadow-sm rounded-xl overflow-hidden">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <FolderTree className="h-5 w-5 text-brand-primary" />
                  <CardTitle className="text-base font-semibold text-slate-800">Organization</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-5 pt-6">
                {/* Category Selection */}
                <div className="space-y-2">
                  <Label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <Select value={categoryId} onValueChange={setCategoryId}>
                    <SelectTrigger className="h-10 border-slate-200">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat._id} value={cat._id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Status Selection */}
                <div className="space-y-2">
                  <Label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Catalog Status
                  </Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="h-10 border-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                          <span>Active (Published)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="Draft">
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-slate-400" />
                          <span>Draft (Hidden)</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Featured Checkbox */}
                <div className="pt-3 border-t border-slate-100">
                  <div className="flex items-start space-x-3 p-3 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                    <Checkbox 
                      id="featured" 
                      checked={isFeatured} 
                      onChange={(e) => setIsFeatured(e.target.checked)} 
                      className="mt-0.5 border-slate-300"
                    />
                    <div className="grid gap-1 leading-none">
                      <Label htmlFor="featured" className="text-sm font-medium text-slate-900 cursor-pointer flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                        Featured Product
                      </Label>
                      <p className="text-xs text-slate-500">
                        Highlight this product on the home showcase banner.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Attachments & Downloads */}
            <Card className="border-slate-200/80 shadow-sm rounded-xl overflow-hidden">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <Paperclip className="h-5 w-5 text-brand-primary" />
                  <CardTitle className="text-base font-semibold text-slate-800">Attachments</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <Label htmlFor="brochure" className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Brochure PDF Link
                  </Label>
                  <Input 
                    id="brochure" 
                    value={brochureUrl} 
                    onChange={(e) => setBrochureUrl(e.target.value)} 
                    placeholder="https://example.com/brochure.pdf" 
                    className="h-10 border-slate-200 focus:border-brand-primary text-xs"
                  />
                  <p className="text-[11px] text-slate-400">
                    Direct link to downloadable technical PDF brochure.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Bottom Actions for Mobile */}
            <div className="space-y-2 lg:hidden pt-4">
              <Button 
                type="submit" 
                className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white h-11" 
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Save Product
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="w-full h-11" 
                onClick={() => router.back()} 
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>

          </div>

        </div>
      </form>
    </div>
  );
}