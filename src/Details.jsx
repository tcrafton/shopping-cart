import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "./services/useFetch";

import PageNotFound from "./PageNotFound";
import Spinner from "./Spinner";

export default function Detail(props) {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product, loading, error } = useFetch(`products/${id}`);

  const [sku, setSku] = useState("");

  if (loading) return <Spinner />;
  if (!product) return <PageNotFound />;
  if (error) throw error;

  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">${product.price}</p>

      <select
        id="size"
        value={sku}
        onChange={(e) => {
          // debugger;
          setSku(e.target.value);
        }}
      >
        <option value="">What size?</option>
        {product.skus.map((s) => (
          <option key={s.sku} value={s.sku}>
            {s.size}
          </option>
        ))}
      </select>
      <p>
        <button
          disabled={!sku}
          className="btn btn-primary"
          onClick={() => {
            props.addToCart(id, sku, product.price);
            navigate("/cart");
          }}
        >
          Add to Cart
        </button>
      </p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}
