import { useEffect, useState } from "react";
import { supabase } from "./lib/db/client";
import { type Tables } from "./lib/db/types";

export default function App() {
  const [foods, setFoods] = useState<Tables<"foods">[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function queryFoods() {
      const { data, error } = await supabase
        .from("foods")
        .select("id, name, quantity, expiration_date")
        .order("id");

      if (error) {
        console.error(error);
        setError(true);
        return;
      }

      setFoods(data);
    }

    void queryFoods();
  }, []);

  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="mb-6 text-3xl font-bold">Foods</h1>

      {error ? (
        <p className="text-red-700">Unable to load foods.</p>
      ) : foods === null ? (
        <p className="text-gray-600">Loading foods...</p>
      ) : null}

      {foods?.length === 0 && <p className="text-gray-600">No foods found.</p>}

      {foods && foods.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th>Food</th>
                <th>Quantity</th>
                <th>Expiration date</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food) => (
                <tr key={food.id}>
                  <td>{food.name}</td>
                  <td>{food.quantity}</td>
                  <td>
                    {food.expiration_date
                      ? new Date(food.expiration_date).toLocaleDateString()
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
