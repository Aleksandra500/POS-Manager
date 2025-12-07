import { useEffect, useState } from "react";
import { getAllProducts } from "../services/productsService";

interface Product {
  id: number;
  name: string;
  price: string;
  in_stock: number;
  created_at: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();
        if (res) {
          setProducts(res);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {products.map((p) => (
        <div key={p.id}>
          {p.name} - ${p.price} - In stock: {p.in_stock}
        </div>
      ))}
    </div>
  );
}
