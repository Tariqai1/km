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

const fallbackCatalogProducts: Product[] = [
  {
    _id: "fb-1",
    title: "50 Kg Commercial Spiral Dough Mixer (SS-304)",
    slug: "spiral-mixer-50kg",
    category: { name: "Bakery Machinery", slug: "bakery", _id: "cat-bakery" },
    images: [{ url: "/placeholder-product.jpg" }],
    description: "Heavy duty dual-speed commercial spiral mixer designed for continuous 24/7 commercial bakery operations with zero vibration."
  },
  {
    _id: "fb-2",
    title: "Automatic Tutti Frutti Dicing & Processing Plant",
    slug: "tutti-frutti-plant",
    category: { name: "Tutti Frutti Processing", slug: "tutti-frutti", _id: "cat-tf" },
    images: [{ url: "/placeholder-product.jpg" }],
    description: "Complete turnkey raw papaya processing plant with high-precision cube cutters and boiling kettles."
  },
  {
    _id: "fb-3",
    title: "30-Inch Sanitary Circular Vibro Sifter",
    slug: "vibro-sifter-30",
    category: { name: "Screening & Grading", slug: "vibro-sifter", _id: "cat-vibro" },
    images: [{ url: "/placeholder-product.jpg" }],
    description: "SS-304 food-grade circular grading screener with high-frequency balanced vibration motor."
  },
  {
    _id: "fb-4",
    title: "Commercial Continuous Namkeen Frying System",
    slug: "namkeen-fryer",
    category: { name: "Namkeen & Farsan", slug: "namkeen", _id: "cat-namkeen" },
    images: [{ url: "/placeholder-product.jpg" }],
    description: "Continuous frying system for sev, bhujia, gathiya and farsan with automated oil temperature control."
  }
];

const fallbackCatalogCategories: Category[] = [
  { _id: "cat-tf", name: "Tutti Frutti Processing", slug: "tutti-frutti" },
  { _id: "cat-bakery", name: "Bakery Machinery", slug: "bakery" },
  { _id: "cat-chips", name: "Potato Chips Lines", slug: "chips" },
  { _id: "cat-namkeen", name: "Namkeen & Farsan", slug: "namkeen" },
  { _id: "cat-sweets", name: "Sweets Machinery", slug: "sweets" },
  { _id: "cat-vibro", name: "Screening & Grading", slug: "vibro-sifter" }
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialCategory = searchParams.get("category") || "all";
  const initialSearch = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [categories, setCategories] = useState<Category[]>(fallbackCatalogCategories);
  const [products, setProducts] = useState<Product[]>(fallbackCatalogProducts);
  const [loading, setLoading] = useState(true);

  // Fetch categories on mount
  useEffect(() => {
    let isMounted = true;
    const fetchCats = async () => {
      try {
        const res = await fetch("/api/categories");
        if (res.ok) {
          const data = await res.json();
          const cats = data.categories || data;
          if (Array.isArray(cats) && cats.length > 0 && isMounted) {
            setCategories(cats);
          }
        }
      } catch (err) {
        console.warn("Using fallback categories:", err);
      }
    };
    fetchCats();
    return () => { isMounted = false; };
  }, []);

  // Sync state with URL params
  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || "all");
    setSearchQuery(searchParams.get("q") || "");
  }, [searchParams]);

  // Fetch products from live API whenever search or category changes
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const params = new URLSearchParams();
    if (selectedCategory && selectedCategory !== "all") {
      params.set("category", selectedCategory);
    }
    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim());
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/products?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          const prods = data.products || data;
          if (Array.isArray(prods) && isMounted) {
            setProducts(prods);
          }
        } else {
          // If server responds with error, filter fallback
          if (isMounted) filterFallback();
        }
      } catch (err) {
        console.warn("Using local product catalog:", err);
        if (isMounted) filterFallback();
      } finally {
        if (isMounted) setLoading(false);
      }
    }, 150);

    const filterFallback = () => {
      let filtered = fallbackCatalogProducts;
      if (selectedCategory && selectedCategory !== "all") {
        filtered = filtered.filter(p => {
          const cSlug = typeof p.category === 'object' ? p.category?.slug : p.category;
          return cSlug === selectedCategory;
        });
      }
      if (searchQuery.trim()) {
        filtered = filtered.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
      }
      setProducts(filtered);
    };

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [searchQuery, selectedCategory]);

  const updateURL = (cat: string, query: string) => {
    const params = new URLSearchParams();
    if (cat && cat !== "all") params.set("category", cat);
    if (query && query.trim()) params.set("q", query.trim());

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  };

  const handleCategoryChange = (catSlug: string) => {
    setSelectedCategory(catSlug);
    updateURL(catSlug, searchQuery);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    updateURL(selectedCategory, val);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    router.push(pathname, { scroll: false });
  };

  const isFiltered = (selectedCategory && selectedCategory !== "all") || searchQuery.trim() !== "";

  return (
    <div className="min-h-screen bg-slate-50/50 py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Page Header */}
        <div className="mb-8 sm:mb-10 text-center md:text-left space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent" /> Heavy Machinery Catalog
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-slate-900 tracking-tight">
            Commercial Machinery &amp; Turnkey Plants
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed">
            Explore our complete range of certified SS-304 food processing machinery, commercial bakery mixers, and high-frequency vibro screeners.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-white p-3.5 sm:p-5 md:p-6 rounded-2xl border border-slate-200/90 shadow-xs mb-8 sm:mb-10 space-y-3.5">
          
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search machinery by name, model or application..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 pr-10 h-11 bg-slate-50/80 border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white text-xs sm:text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  updateURL(selectedCategory, "");
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1.5 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Filter:
            </span>

            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryChange("all")}
              className={`rounded-full text-xs font-semibold h-7.5 px-3 ${
                selectedCategory === "all"
                  ? "bg-brand-primary text-white hover:bg-brand-primary/90"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              All Machinery
            </Button>

            {categories.map((cat) => (
              <Button
                key={cat._id || cat.slug}
                variant={selectedCategory === cat.slug ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryChange(cat.slug)}
                className={`rounded-full text-xs font-semibold h-7.5 px-3 ${
                  selectedCategory === cat.slug
                    ? "bg-brand-primary text-white hover:bg-brand-primary/90"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {cat.name}
              </Button>
            ))}

            {isFiltered && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 h-7.5 ml-auto font-medium"
              >
                <X className="w-3.5 h-3.5 mr-1" /> Reset
              </Button>
            )}
          </div>

        </div>

        {/* Products Grid Section */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 animate-pulse">
                <div className="h-48 bg-slate-100 rounded-xl"></div>
                <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                <div className="h-9 bg-slate-100 rounded-xl mt-4"></div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {products.map((prod, idx) => (
                <motion.div
                  key={prod._id || prod.slug || idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: idx * 0.04 }}
                >
                  <ProductCard product={prod} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
              <Package className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">No machinery matching your filter</h3>
            <p className="text-xs text-slate-500">
              Try searching with different keywords or clear your active category filters.
            </p>
            <Button onClick={clearFilters} variant="outline" size="sm" className="font-semibold">
              Clear All Filters
            </Button>
          </div>
        )}

      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-primary" />
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}