"use client";

import { useState } from "react";

import { data } from "./data";
// import styles from "./page.module.css";

function DrugResult({ result }: { result: any }): React.ReactElement {
  return (
    <div className="flex flex-col border p-5 capitalize max-w-100 max-h-100">
      <p className="mb-3">
        <strong>{result.generic_name}</strong>
      </p>
      <p>
        <strong>Brand name:</strong> {result.brand_name}
      </p>
      <div>
        <strong>Active ingredients</strong>
        {result.active_ingredients.map((ingredient: any, index: number) => (
          <p key={`${result.product_ndc}-ingredient-${index}`}>
            {ingredient.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [search, setSearch] = useState("");
  const { results } = data;

  return (
    <div className="flex flex-col p-20 gap-5">
      <h1 className="text-3xl pb-10">Drug Search</h1>
      <div className="text-sm text-gray-500">{data.meta.disclaimer}</div>
      <input
        type="text"
        className="text-lg border mb-10 p-2 w-1/2"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="flex flex-wrap flex-auto gap-2">
        {results.map((result, index) => (
          <DrugResult key={`drug-result-${index}`} result={result} />
        ))}
      </div>
      {/* TODO: Add a search box */}
    </div>
  );
}
