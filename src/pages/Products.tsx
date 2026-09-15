import useProducts from "../hooks/useProducts";
import ProductCard from "../components/ui/ProductCard";

function Products() {
    const {products, loading, error} = useProducts();

        if (loading){
            return <div>Loading...</div>
        }
        if(error){
            return <div>Error: {error.message}</div>
        }

        if(products.length === 0){
            return <div>No products found</div>
        }

   return (

  <section className="px-4 py-8 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      
      <h2 className="mb-6 text-3xl font-bold text-center text-gray-900 dark:text-white">
        Products
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

    </div>
  </section>
);
}

export default Products;