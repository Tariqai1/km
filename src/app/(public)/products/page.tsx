"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Search, Loader2, X, SlidersHorizontal, Package, Check, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/shared/ProductCard";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  _id: string;
  title: string;
  slug: string;
  category?: { name: string; slug: string; _id: string } | string;
  categoryName?: string;
  images: { url: string }[];
  description?: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialCategory = searchParams.get("category") || "all";
  const initialSearch = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories on mount
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        const cats = data.categories || data;
        if (Array.isArray(cats)) {
          setCategories(cats);
        }
      })
      .catch((err) => console.error("Failed to load categories:", err));
  }, []);

  // Sync state with URL params
  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || "all");
    setSearchQuery(searchParams.get("q") || "");
  }, [searchParams]);

  // Fetch products from live API whenever search or category changes
  useEffect(() => {
    setLoading(true);

    const params = new URLSearchParams();
    if (selectedCategory && selectedCategory !== "all") {
      params.set("category", selectedCategory);
    }
    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim());
    }

    const timer = setTimeout(() => {
      fetch(`/api/products?${params.toString()}`)
        .then((res) => res.json())
        .then((data) => {
          const prods = data.products || data;
          if (Array.isArray(prods)) {
            setProducts(prods);
          } else {
            setProducts([]);
          }
        })
        .catch((err) => {
          console.error("Failed to fetch products:", err);
          setProducts([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory]);

  const updateURL = (cat: string, query: string) => {
    const params = new URLSearchParams();
    if (cat && cat !== "all") params.set("category", cat);
    if (query && query.trim()) params.set("q", query.trim());

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    updateURL(cat, searchQuery);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    updateURL(selectedCategory, val);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    router.push(pathname, { scroll: false });
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-brand-primary via-slate-900 to-brand-secondary text-white rounded-3xl p-8 sm:p-12 mb-10 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-brand-accent text-xs font-semibold uppercase tracking-wider">
              <Package className="w-3.5 h-3.5" /> Complete Industrial Machinery Catalog
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
              Precision Food Processing & Bakery Machinery
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Engineered with genuine SS-304 food-grade metallurgy, heavy-duty gearboxes, and low maintenance drive systems. Factory-direct from Mumbai.
            </p>
          </div>

          {/* Search Bar Embedded in Hero */}
          <div className="relative z-10 mt-8 max-w-xl">
            <div className="relative flex items-center">
              <Search className="absolute left-4 text-slate-400 w-5 h-5" />
              <Input
                placeholder="Search by machine name, capacity, or specs (e.g. Spiral Mixer, Vibro, Dicing)..."
                className="pl-12 pr-10 h-13 bg-white text-slate-900 placeholder:text-slate-400 rounded-2xl border-0 shadow-lg text-sm font-medium focus-visible:ring-2 focus-visible:ring-brand-accent"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    updateURL(selectedCategory, "");
                  }}
                  className="absolute right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Interactive Category Chips / Filter Pills */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <SlidersHorizontal className="w-4 h-4 text-brand-primary" /> Filter by Category:
            </div>
            <span className="text-xs font-semibold text-slate-500">
              Showing <strong className="text-brand-dark">{products.length}</strong> machines
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 pb-2">
            <button
              onClick={() => handleCategoryChange("all")}
              type="button"
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs ${
                selectedCategory === "all"
                  ? "bg-brand-primary text-white shadow-md shadow-brand-primary/20"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              All Machinery
            </button>

            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.slug || selectedCategory === cat._id;
              return (
                <button
                  key={cat._id}
                  onClick={() => handleCategoryChange(cat.slug)}
                  type="button"
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-brand-primary text-white shadow-md shadow-brand-primary/20"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 text-brand-accent stroke-[3]" />}
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        <div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-pulse h-[380px]"
                >
                  <div className="w-full aspect-square bg-slate-200"></div>
                  <div className="p-5 flex flex-col flex-grow space-y-3">
                    <div className="h-5 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                    <div className="mt-auto pt-3 flex gap-2">
                      <div className="flex-1 h-9 bg-slate-200 rounded-lg"></div>
                      <div className="flex-1 h-9 bg-slate-200 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence>
                {products.map((product) => (
                  <motion.div
                    key={product.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-sm space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-display text-brand-dark">
                No matching machinery found
              </h3>
              <p className="text-slate-500 text-sm">
                No machines match &ldquo;{searchQuery || selectedCategory}&rdquo;. Try another search keyword or view all products.
              </p>
              <Button
                variant="outline"
                className="border-slate-300 hover:bg-slate-50 font-semibold mt-2"
                onClick={handleClearFilters}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-brand-primary" />
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}