import { useQuery } from "@tanstack/react-query";
import type { Product } from "../types/Product";
import { getProducts } from "../services/productService";

function useProducts() {
  const {
    data: products = [],
    isLoading: loading,
    error,
  } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return { products, loading, error };
}

export default useProducts;