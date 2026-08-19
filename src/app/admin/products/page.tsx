"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, Pencil, Trash2, Loader2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  DialogTrigger,
} from "@/components/ui/dialog";

interface Product {
  _id: string;
  title: string;
  slug: string;
  category: { name: string } | string; // depends on populate
  status: string;
  images: { url: string }[];
}

export default function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products || data);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async () => {
    if (!productToDelete) return;
    
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/products/${productToDelete}`, {
        method: "DELETE"
      });
      
      if (res.ok) {
        setProducts(products.filter(p => p._id !== productToDelete));
        setProductToDelete(null);
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "draft" : "active";
    
    // Optimistic update
    setProducts(products.map(p => p._id === id ? { ...p, status: newStatus } : p));
    
    try {
      await fetch(`/api/admin/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (error) {
      console.error("Status toggle error:", error);
      // Revert on error
      setProducts(products.map(p => p._id === id ? { ...p, status: currentStatus } : p));
    }
  };

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-3xl text-brand-primary">Products</h1>
          <p className="text-slate-500 mt-1">Manage your machinery and product listings.</p>
        </div>
        <Button asChild className="bg-brand-primary hover:bg-brand-primary/90 shrink-0">
          <Link href="/admin/products/new">
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="p-8 flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-brand-primary" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-slate-500">
                      No products found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell>
                        <div className="h-12 w-12 rounded bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                          {product.images && product.images.length > 0 ? (
                            <img src={product.images[0].url} alt={product.title} className="h-full w-full object-cover" />
                          ) : (
                            <ImageIcon className="h-5 w-5 text-slate-400" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium text-brand-primary">{product.title}</p>
                        <p className="text-xs text-slate-400">{product.slug}</p>
                      </TableCell>
                      <TableCell>
                        {typeof product.category === 'object' && product.category !== null 
                          ? (product.category as any).name 
                          : "Unknown Category"}
                      </TableCell>
                      <TableCell>
                        <button onClick={() => handleToggleStatus(product._id, product.status)}>
                          <Badge variant={product.status === "active" ? "default" : "secondary"} className={
                            product.status === "active" ? "bg-emerald-500 hover:bg-emerald-600" : ""
                          }>
                            {product.status}
                          </Badge>
                        </button>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" asChild className="h-8 w-8 text-slate-500 hover:text-brand-primary">
                            <Link href={`/admin/products/${product._id}/edit`}>
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </Button>
                          
                          <Dialog open={productToDelete === product._id} onOpenChange={(open) => !open && setProductToDelete(null)}>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-red-600 hover:bg-red-50" onClick={() => setProductToDelete(product._id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Delete Product</DialogTitle>
                                <DialogDescription>
                                  Are you sure you want to delete "{product.title}"? This action cannot be undone.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setProductToDelete(null)} disabled={isDeleting}>Cancel</Button>
                                <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                                  {isDeleting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                                  Delete
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
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
    </div>
  );
}
