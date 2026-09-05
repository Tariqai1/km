"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Search, Loader2, X, SlidersHorizontal, Package } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/shared/ProductCard";

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
        
        {/* Page Header: Clean Technical Hierarchy */}
        <div className="mb-6 sm:mb-8 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
            <span>Mumbai Fabrication Works · Master Equipment Directory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
            Commercial Machinery &amp; Turnkey Processing Lines
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed">
            Verified food-grade equipment fabricated in SS-304 &amp; SS-316 stainless steel. Filter by processing category, machine series, or search by raw material below.
          </p>
        </div>

        {/* Search & Industrial Category Filter Directory */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-300 shadow-2xs mb-8 space-y-4">
          
          {/* Top Bar: Search Input & Unit Count */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search machinery by model code (e.g. Spiral Mixer, Vibro Sifter, Dicing)..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 pr-10 h-10 bg-slate-50 border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:bg-white text-xs sm:text-sm focus-visible:ring-2 focus-visible:ring-[#162A45]"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    updateURL(selectedCategory, "");
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 focus-visible:ring-2 focus-visible:ring-slate-900 rounded"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="font-mono text-xs text-slate-600 px-3 py-2 bg-slate-100 rounded border border-slate-200 shrink-0 text-center">
              {loading ? "Searching..." : `Showing ${products.length} Verified Systems`}
            </div>
          </div>

          {/* Category Directory Segmented Index */}
          <div className="pt-3 border-t border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5" /> Filter by Production Line:
              </span>
              {isFiltered && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-mono text-red-600 hover:text-red-700 flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-red-600 rounded px-1"
                >
                  <X className="w-3.5 h-3.5" /> Reset Filters
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2" role="tablist" aria-label="Machinery Categories">
              <button
                type="button"
                role="tab"
                aria-selected={selectedCategory === "all"}
                onClick={() => handleCategoryChange("all")}
                className={`font-mono text-xs font-medium px-3 py-1.5 rounded transition-colors focus-visible:ring-2 focus-visible:ring-[#162A45] ${
                  selectedCategory === "all"
                    ? "bg-[#162A45] text-white border border-[#162A45] shadow-2xs"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-300"
                }`}
              >
                [ALL] All Equipment
              </button>

              {categories.map((cat, idx) => (
                <button
                  key={cat._id || cat.slug}
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === cat.slug}
                  onClick={() => handleCategoryChange(cat.slug)}
                  className={`font-mono text-xs font-medium px-3 py-1.5 rounded transition-colors focus-visible:ring-2 focus-visible:ring-[#162A45] ${
                    selectedCategory === cat.slug
                      ? "bg-[#162A45] text-white border border-[#162A45] shadow-2xs"
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-300"
                  }`}
                >
                  [0{idx + 1}] {cat.name}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Products Grid Section */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 animate-pulse">
                <div className="h-44 bg-slate-100 rounded-lg"></div>
                <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                <div className="h-9 bg-slate-100 rounded-lg mt-4"></div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-opacity duration-200">
            {products.map((prod, idx) => (
              <div key={prod._id || prod.slug || idx} className="h-full">
                <ProductCard product={prod} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-300 p-12 text-center max-w-md mx-auto space-y-4">
            <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center mx-auto text-slate-500 border border-slate-200">
              <Package className="w-7 h-7" />
            </div>
            <h3 className="font-semibold text-base text-slate-900">No machinery matching your filter</h3>
            <p className="text-xs text-slate-600">
              Try searching with different technical keywords or reset your active category filters.
            </p>
            <Button onClick={clearFilters} variant="outline" size="sm" className="font-semibold border-slate-300">
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