"use client";

import { useState, useEffect, useMemo } from "react";
import { 
  Plus, 
  Search, 
  Pencil, 
  Trash2, 
  Loader2, 
  Image as ImageIcon,
  FolderTree,
  Sparkles,
  AlertTriangle,
  X,
  Link2,
  FileText,
  Tag,
  CheckCircle2,
  Lock,
  Edit3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { ImageUploader } from "@/components/admin/ImageUploader";

interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  coverImage: { url: string; cloudinaryId: string } | null;
  count?: number;
}

export default function CategoriesManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  
  // Search State
  const [searchQuery, setSearchQuery] = useState("");

  // Delete State
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [isCustomSlug, setIsCustomSlug] = useState(false);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<{ url: string; cloudinaryId: string }[]>([]);

  // Helper for generating slug
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/categories");
        if (res.ok) {
          const data = await res.json();
          setCategories(Array.isArray(data) ? data : (Array.isArray(data?.categories) ? data.categories : []));
        }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleNameChange = (val: string) => {
    setName(val);
    if (!isCustomSlug) {
      setSlug(generateSlug(val));
    }
  };

  const handleSlugChange = (val: string) => {
    setSlug(generateSlug(val));
  };

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    const query = searchQuery.toLowerCase();
    return categories.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.slug.toLowerCase().includes(query) ||
        (c.description && c.description.toLowerCase().includes(query))
    );
  }, [categories, searchQuery]);

  const openNewDialog = () => {
    setEditingCategory(null);
    setName("");
    setSlug("");
    setIsCustomSlug(false);
    setDescription("");
    setImages([]);
    setFormError(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (category: Category) => {
    setEditingCategory(category);
    setName(category.name);
    setSlug(category.slug || generateSlug(category.name));
    setIsCustomSlug(true);
    setDescription(category.description || "");
    setImages(category.coverImage?.url ? [category.coverImage] : []);
    setFormError(null);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!name.trim()) {
      setFormError("Category name is required.");
      return;
    }

    const finalSlug = slug.trim() || generateSlug(name);
    if (!finalSlug) {
      setFormError("A valid URL slug is required.");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      name: name.trim(),
      description: description.trim(),
      coverImage: images.length > 0 ? images[0] : null,
      slug: finalSlug,
    };

    try {
      const url = editingCategory
        ? `/api/admin/categories/${editingCategory._id}`
        : "/api/admin/categories";
      const method = editingCategory ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsDialogOpen(false);
        await fetchCategories();
      } else {
        const errData = await res.json().catch(() => ({}));
        setFormError(errData.error || "Failed to save category. Please try again.");
      }
    } catch (error) {
      console.error("Save error:", error);
      setFormError("An unexpected error occurred while saving the category.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingId) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/admin/categories/${deletingId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setCategories((prev) => prev.filter((c) => c._id !== deletingId));
      } else {
        alert("Failed to delete category");
      }
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto px-4 sm:px-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5 pt-2">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              Categories
            </h1>
            <Badge variant="secondary" className="bg-brand-primary/10 text-brand-primary font-semibold px-2.5 py-0.5 rounded-full text-xs">
              {categories.length} Total
            </Badge>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Organize, update, and manage your product catalog structure.
          </p>
        </div>

        <Button
          onClick={openNewDialog}
          className="w-full sm:w-auto bg-brand-primary hover:bg-brand-primary/90 text-white shadow-sm hover:shadow transition-all duration-200 gap-2 shrink-0 rounded-xl sm:rounded-lg px-4 py-2.5 font-medium"
        >
          <Plus className="h-4 w-4 stroke-[2.5]" /> Add New Category
        </Button>
      </div>

      {/* Quick Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-3.5 sm:gap-4">
          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
            <FolderTree className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div>
            <p className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Categories</p>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">{categories.length}</h3>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-3.5 sm:gap-4">
          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <ImageIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div>
            <p className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">With Cover Image</p>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
              {categories.filter((c) => c.coverImage?.url).length}
            </h3>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-3.5 sm:gap-4">
          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div>
            <p className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Slugs</p>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">{categories.length}</h3>
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200/80 overflow-hidden">
        {/* Search & Actions Bar */}
        <div className="p-3.5 sm:p-4 border-b border-slate-200/80 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search category or slug..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-8 bg-white border-slate-200 focus-visible:ring-brand-primary text-sm rounded-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="text-xs text-slate-500 self-start sm:self-center">
              Showing <span className="font-semibold text-slate-700">{filteredCategories.length}</span> of {categories.length} categories
            </p>
          )}
        </div>

        {/* Table / Loading State */}
        {isLoading ? (
          <div className="p-12 sm:p-16 flex flex-col items-center justify-center text-slate-400 gap-3">
            <Loader2 className="h-7 w-7 sm:h-8 sm:w-8 animate-spin text-brand-primary" />
            <p className="text-xs sm:text-sm font-medium text-slate-500">Loading categories...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50/80 border-b border-slate-200/80">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[60px] sm:w-[80px] text-slate-600 font-semibold text-[11px] sm:text-xs uppercase tracking-wider">Cover</TableHead>
                  <TableHead className="text-slate-600 font-semibold text-[11px] sm:text-xs uppercase tracking-wider">Category</TableHead>
                  <TableHead className="text-slate-600 font-semibold text-[11px] sm:text-xs uppercase tracking-wider hidden md:table-cell">Slug</TableHead>
                  <TableHead className="text-slate-600 font-semibold text-[11px] sm:text-xs uppercase tracking-wider hidden lg:table-cell">Description</TableHead>
                  <TableHead className="text-right text-slate-600 font-semibold text-[11px] sm:text-xs uppercase tracking-wider">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12 sm:py-16">
                      <div className="flex flex-col items-center justify-center text-slate-400 gap-2 px-4">
                        <FolderTree className="h-9 w-9 sm:h-10 sm:w-10 stroke-[1.25] text-slate-300" />
                        <p className="text-sm sm:text-base font-semibold text-slate-700 mt-1">
                          {searchQuery ? "No matching categories found" : "No categories created yet"}
                        </p>
                        <p className="text-xs text-slate-500 max-w-sm">
                          {searchQuery
                            ? "Try searching with a different keyword or clear the search filter."
                            : "Organize your store catalog by creating your first product category."}
                        </p>
                        {!searchQuery && (
                          <Button onClick={openNewDialog} size="sm" className="mt-3 bg-brand-primary text-white gap-1.5 rounded-lg">
                            <Plus className="h-4 w-4" /> Create Category
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCategories.map((category) => (
                    <TableRow key={category._id} className="hover:bg-slate-50/80 transition-colors group">
                      <TableCell>
                        <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200/80 shrink-0">
                          {category.coverImage?.url ? (
                            <img
                              src={category.coverImage.url}
                              alt={category.name}
                              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                          ) : (
                            <ImageIcon className="h-4 w-4 text-slate-400" />
                          )}
                        </div>
                      </TableCell>

                      <TableCell className="font-medium text-slate-900">
                        <div>
                          <span className="font-semibold text-xs sm:text-sm text-slate-900 group-hover:text-brand-primary transition-colors">
                            {category.name}
                          </span>
                          <span className="block md:hidden text-[11px] text-slate-400 font-mono mt-0.5 truncate max-w-[140px] sm:max-w-none">
                            /{category.slug}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell className="hidden md:table-cell">
                        <code className="text-xs font-mono bg-slate-100/80 text-slate-600 border border-slate-200/60 px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                          <Link2 className="h-3 w-3 text-slate-400 shrink-0" />
                          /{category.slug}
                        </code>
                      </TableCell>

                      <TableCell className="text-slate-500 text-xs sm:text-sm hidden lg:table-cell max-w-xs truncate">
                        {category.description ? (
                          <span>{category.description}</span>
                        ) : (
                          <span className="text-slate-300 italic text-xs">No description set</span>
                        )}
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="flex justify-end items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(category)}
                            className="h-8 w-8 text-slate-600 hover:text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors"
                            title="Edit Category"
                          >
                            <Pencil className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeletingId(category._id)}
                            className="h-8 w-8 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Delete Category"
                          >
                            <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* FIXED 100% Mobile Responsive Add / Edit Modal Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
       <DialogContent className="w-[94vw] max-w-lg h-[85vh] max-h-[85vh] flex flex-col p-0 overflow-hidden rounded-2xl border-slate-200 shadow-2xl">
          {/* Header Banner (Fixed Height / Shrink Off) */}
          <div className="bg-slate-900 text-white p-4 sm:p-5 shrink-0 relative overflow-hidden">
            <div className="relative z-10 flex items-center gap-3">
              <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shrink-0">
                {editingCategory ? <Pencil className="h-4 w-4 sm:h-5 sm:w-5" /> : <Plus className="h-4 w-4 sm:h-5 sm:w-5" />}
              </div>
              <div className="pr-6">
                <DialogTitle className="text-lg sm:text-xl font-bold font-display text-white leading-tight">
                  {editingCategory ? "Edit Category" : "Add New Category"}
                </DialogTitle>
                <DialogDescription className="text-slate-300 text-[11px] sm:text-xs mt-0.5 line-clamp-1">
                  {editingCategory
                    ? "Modify category details, custom slug, or update cover image."
                    : "Create a new category with automated slug and cover image."}
                </DialogDescription>
              </div>
            </div>
          </div>

          {/* Form Body - Scrollable inside modal only */}
          <form 
            id="categoryForm" 
            onSubmit={handleSubmit} 
            className="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto flex-1 min-h-0 overscroll-contain bg-white"
          >
            {/* Form Error */}
            {formError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{formError}</span>
              </div>
            )}

            {/* Category Name */}
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-[11px] sm:text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Tag className="h-3.5 w-3.5 text-slate-400" />
                Category Name <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Commercial Spiral Mixers"
                required
                className="bg-slate-50/50 border-slate-200 focus:bg-white focus-visible:ring-brand-primary h-9 sm:h-10 text-xs sm:text-sm rounded-lg"
              />
            </div>

            {/* URL Slug Field */}
            <div className="space-y-1.5 bg-slate-50/80 p-3 sm:p-3.5 rounded-xl border border-slate-200/80">
              <div className="flex items-center justify-between">
                <Label htmlFor="slug" className="text-[11px] sm:text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Link2 className="h-3.5 w-3.5 text-slate-400" />
                  URL Slug
                </Label>
                <button
                  type="button"
                  onClick={() => {
                    const next = !isCustomSlug;
                    setIsCustomSlug(next);
                    if (!next) setSlug(generateSlug(name));
                  }}
                  className="text-[11px] sm:text-xs text-brand-primary font-medium hover:underline flex items-center gap-1"
                >
                  {isCustomSlug ? (
                    <>
                      <Lock className="h-3 w-3" /> Auto-generate
                    </>
                  ) : (
                    <>
                      <Edit3 className="h-3 w-3" /> Edit custom slug
                    </>
                  )}
                </button>
              </div>

              <div className="relative">
                <span className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-[11px] sm:text-xs text-slate-400 font-mono select-none">
                  /category/
                </span>
                <Input
                  id="slug"
                  value={slug}
                  disabled={!isCustomSlug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  placeholder="commercial-spiral-mixers"
                  className={`pl-[70px] sm:pl-[82px] font-mono text-xs h-8 sm:h-9 rounded-lg transition-colors ${
                    !isCustomSlug 
                      ? "bg-slate-100/70 text-slate-500 border-slate-200/80 cursor-not-allowed" 
                      : "bg-white border-brand-primary/40 focus-visible:ring-brand-primary text-slate-900"
                  }`}
                />
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 leading-tight">
                Public address slug for items in this category.
              </p>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="description" className="text-[11px] sm:text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5 text-slate-400" />
                  Description
                </Label>
                <span className={`text-[10px] sm:text-[11px] font-mono ${description.length > 250 ? "text-amber-600" : "text-slate-400"}`}>
                  {description.length}/300
                </span>
              </div>
              <Textarea
                id="description"
                value={description}
                maxLength={300}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Write a brief overview describing products in this category..."
                className="bg-slate-50/50 border-slate-200 focus:bg-white focus-visible:ring-brand-primary text-xs sm:text-sm rounded-lg resize-none"
              />
            </div>

            {/* Cover Image Uploader */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-[11px] sm:text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <ImageIcon className="h-3.5 w-3.5 text-slate-400" />
                  Cover Image
                </Label>
                <span className="text-[10px] text-slate-400">Rec. 800×600px</span>
              </div>
              <div className="bg-slate-50/50 p-2 sm:p-2.5 rounded-xl border border-slate-200/80">
                <ImageUploader
                  images={images}
                  onChange={setImages}
                  maxImages={1}
                />
              </div>
            </div>
          </form>

          {/* Modal Actions Footer (Fixed Height / Shrink Off) */}
          <DialogFooter className="p-3.5 sm:p-4 bg-slate-50/80 border-t border-slate-100 flex flex-col-reverse sm:flex-row items-center justify-end gap-2 shrink-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              disabled={isSubmitting}
              className="w-full sm:w-auto rounded-lg border-slate-200 text-slate-700 text-xs sm:text-sm h-9 sm:h-10 px-4 font-medium"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="categoryForm"
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-brand-primary hover:bg-brand-primary/90 text-white text-xs sm:text-sm rounded-lg px-5 h-9 sm:h-10 font-medium shadow-xs"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-1.5" />
                  {editingCategory ? "Update Category" : "Save Category"}
                </>
              )}
            </Button>
          </DialogFooter>

        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <DialogContent className="w-[90vw] max-w-md p-5 sm:p-6 rounded-2xl border-slate-200">
          <DialogHeader>
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mb-2">
              <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <DialogTitle className="text-lg sm:text-xl font-bold text-slate-900">
              Delete Category?
            </DialogTitle>
            <DialogDescription className="text-slate-500 text-xs sm:text-sm mt-1 leading-relaxed">
              Are you sure you want to delete this category? This action cannot be undone and may affect associated products.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="pt-4 flex flex-col-reverse sm:flex-row items-center justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setDeletingId(null)}
              disabled={isDeleting}
              className="w-full sm:w-auto rounded-lg border-slate-200 text-slate-700 text-xs sm:text-sm h-9 sm:h-10 px-4"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="w-full sm:w-auto bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm rounded-lg h-9 sm:h-10 px-5"
            >
              {isDeleting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Confirm Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}