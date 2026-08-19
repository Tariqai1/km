"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
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
    }, 250);

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
    <div className="bg-brand-light min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-5xl font-bold font-display text-brand-dark mb-4">
            Our Products
          </h1>
          <div className="w-16 h-1 bg-brand-accent rounded-full mb-6"></div>
          <p className="text-gray-600 max-w-2xl">
            Browse our complete range of precision-engineered machinery. Use the
            filters below to find exactly what you need for your business.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 shrink-0 space-y-8">
            {/* Search Box */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-lg text-brand-dark mb-4">Search</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search machines..."
                  className="pl-10 bg-gray-50 border-gray-200 focus:border-brand-primary"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-lg text-brand-dark mb-4">
                Categories
              </h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === "all"}
                    onChange={() => handleCategoryChange("all")}
                    className="w-4 h-4 text-brand-primary focus:ring-brand-primary"
                  />
                  <span
                    className={
                      selectedCategory === "all"
                        ? "font-medium text-brand-primary"
                        : "text-gray-600"
                    }
                  >
                    All Products
                  </span>
                </label>
                {categories.map((cat) => (
                  <label
                    key={cat._id}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat.slug || selectedCategory === cat._id}
                      onChange={() => handleCategoryChange(cat.slug)}
                      className="w-4 h-4 text-brand-primary focus:ring-brand-primary"
                    />
                    <span
                      className={
                        selectedCategory === cat.slug || selectedCategory === cat._id
                          ? "font-medium text-brand-primary"
                          : "text-gray-600"
                      }
                    >
                      {cat.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="flex flex-col bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden animate-pulse h-full min-h-[380px]"
                  >
                    <div className="w-full aspect-square bg-slate-200"></div>
                    <div className="p-5 flex flex-col flex-grow space-y-4">
                      <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                      <div className="h-6 bg-slate-200 rounded w-1/2"></div>
                      <div className="mt-auto pt-4 flex gap-3">
                        <div className="flex-1 h-10 bg-slate-200 rounded"></div>
                        <div className="flex-1 h-10 bg-slate-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.slug}
                    product={product}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
                <h3 className="text-xl font-bold text-brand-dark mb-2">
                  No products found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your filters or search query.
                </p>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={handleClearFilters}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
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