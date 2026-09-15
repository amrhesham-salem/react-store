import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductsById } from "../services/productService";
import type { Product } from "../types/Product";
import { useCart } from "../hooks/useCart";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductsById(Number(id));
        setProduct(productData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
        <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
          Loading...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
        <p className="font-medium text-red-500">
          Error: {error}
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">
          Product not found.
        </p>
      </div>
    );
  }

  return (
    <section className="min-h-[calc(100vh-8rem)] bg-white px-4 py-10 text-gray-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        <button
          onClick={() => navigate(-1)}
          className="mb-8 cursor-pointer text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          ← Back to Products
        </button>

        <div className="grid gap-10 rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:grid-cols-2 md:p-10">

          {/* Product Image */}
          <div className="flex min-h-100 items-center justify-center rounded-xl bg-white p-8 dark:bg-slate-950">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-100 w-full object-contain"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">

            <p className="text-sm font-medium uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              {product.category}
            </p>

            <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
              {product.title}
            </h1>

            <p className="mt-6 text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              ${product.price.toFixed(2)}
            </p>

            <div className="my-6 h-px bg-gray-200 dark:bg-slate-800" />

            <p className="leading-7 text-gray-600 dark:text-gray-400">
              {product.description}
            </p>

            <button 
            onClick={() => addToCart(product)}
              className="mt-8 w-full cursor-pointer rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-indigo-700 hover:shadow-lg sm:w-fit"
            >
              Add to Cart
            </button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;