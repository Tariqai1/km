"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { ImageUploader } from "@/components/admin/ImageUploader";
import { FeatureBuilder } from "@/components/admin/FeatureBuilder";
import { SpecBuilder } from "@/components/admin/SpecBuilder";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<{_id: string, name: string}[]>([]);

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState<string[]>([""]);
  const [specifications, setSpecifications] = useState<Record<string, string>>({});
  const [images, setImages] = useState<{url: string, cloudinaryId: string}[]>([]);
  const [brochureUrl, setBrochureUrl] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [status, setStatus] = useState("Active");

  useEffect(() => {
    // Fetch categories and product data
    const fetchData = async () => {
      try {
        const [catsRes, prodRes] = await Promise.all([
          fetch("/api/categories"),
          fetch(`/api/admin/products/${productId}`)
        ]);

        if (catsRes.ok) {
          const data = await catsRes.json();
          setCategories(Array.isArray(data) ? data : (Array.isArray(data?.categories) ? data.categories : []));
        }

        if (prodRes.ok) {
          const product = await prodRes.json();
          
          if (product) {
            setTitle(product.title || "");
            setSlug(product.slug || "");
            setCategoryId(typeof product.category === 'object' ? product.category._id : (product.category || ""));
            setDescription(product.description || "");
            setFeatures(product.features && product.features.length ? product.features : [""]);
            setSpecifications(product.specifications || {});
            setImages(product.images || []);
            setBrochureUrl(product.brochureUrl || "");
            setIsFeatured(product.isFeatured || false);
            setStatus(product.status || "Active");
          }
        } else {
          setError("Failed to load product data");
        }
      } catch (err) {
        console.error("Failed to fetch data");
        setError("Failed to load product data");
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchData();
    }
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (!categoryId) {
      setError("Please select a category");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch(`/api/admin/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          categoryId,
          description,
          features: features.filter(f => f.trim() !== ""),
          specifications,
          images,
          brochureUrl,
          isFeatured,
          status
        }),
      });

      if (res.ok) {
        router.push("/admin/products");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to update product");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-brand-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/products">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="font-display font-bold text-3xl text-brand-primary">Edit Product</h1>
          <p className="text-slate-500">Update machinery details and specifications.</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Product Title</Label>
                  <Input 
                    id="title" 
                    value={title} 
                    onChange={(e) => {
                      setTitle(e.target.value);
                      // Only auto-update slug if they're editing the title and maybe want it linked,
                      // usually better not to auto-update slug on edit to prevent broken links.
                    }} 
                    placeholder="e.g. Industrial Dough Mixer 50kg" 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug (URL)</Label>
                  <Input 
                    id="slug" 
                    value={slug} 
                    onChange={(e) => setSlug(e.target.value)} 
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    placeholder="Detailed description of the machinery..." 
                    className="min-h-[150px]"
                    required 
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Images</CardTitle>
                <CardDescription>Upload up to 8 images. The first image will be the cover. Recommended size: 1000x1000px (1:1 square ratio) for best display.</CardDescription>
              </CardHeader>
              <CardContent>
                <ImageUploader images={images} onChange={setImages} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Features & Specifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <Label>Key Features</Label>
                  <FeatureBuilder features={features} onChange={setFeatures} />
                </div>
                
                <div className="space-y-4">
                  <Label>Technical Specifications</Label>
                  <SpecBuilder specifications={specifications} onChange={setSpecifications} />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Organization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={categoryId} onValueChange={setCategoryId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
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

                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active (Published)</SelectItem>
                      <SelectItem value="Draft">Draft (Hidden)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox 
                    id="featured" 
                    checked={isFeatured} 
                    onChange={(e) => setIsFeatured(e.target.checked)} 
                  />
                  <Label htmlFor="featured" className="cursor-pointer">
                    Featured Product
                  </Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attachments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="brochure">Brochure PDF URL (Optional)</Label>
                  <Input 
                    id="brochure" 
                    value={brochureUrl} 
                    onChange={(e) => setBrochureUrl(e.target.value)} 
                    placeholder="https://..." 
                  />
                </div>
              </CardContent>
            </Card>

            <Button type="submit" className="w-full bg-brand-primary" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Update Product
            </Button>
            <Button type="button" variant="outline" className="w-full mt-2" onClick={() => router.back()} disabled={isSubmitting}>
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
