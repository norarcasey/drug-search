"use client";

import { data } from "./data";
import { useDebouncedSearch } from "./hooks/useDebounceSearch";

function DrugResult({ result }: { result: any }): React.ReactElement {
  return (
    <div className="flex flex-col border p-5 capitalize max-w-100 max-h-100">
      <p className="mb-3">
        <strong>{result.generic_name}</strong>
      </p>
      <p>
        <strong>NDC:</strong> {result.product_ndc}
      </p>
      <p>
        <strong>Brand name:</strong> {result.brand_name}
      </p>
      <div>
        <strong>Active ingredients</strong>
        {result?.active_ingredients?.map((ingredient: any, index: number) => (
          <p key={`${result.product_ndc}-ingredient-${index}`}>
            {ingredient.name}
          </p>
        ))}
      </div>
    </div>
  );
}

const useSerarchDrugs = () =>
  useDebouncedSearch(async (search: string) => {
    const response = await fetch(
      `https://api.fda.gov/drug/ndc.json?search=brand_name:${search}*&limit=10`
    );

    return response.json();
  });

export default function Home() {
  const { inputText, setInputText, searchResults } = useSerarchDrugs();
  console.log(searchResults.result, "searchResults");

  return (
    <div className="flex flex-col p-10 m-10 gap-5 min-w-450 border">
      <h1 className="text-3xl">Drug Search</h1>
      <hr />
      <input
        type="text"
        className="text-lg border mb-10 p-2 w-1/2"
        placeholder="Search (brand name)"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <div className="text-sm text-gray-500">{data.meta.disclaimer}</div>
      <div className="flex flex-wrap flex-auto gap-2">
        {searchResults.loading && <div>...</div>}
        {searchResults.error && <div>Error: {searchResults.error.message}</div>}

        {searchResults?.result?.results?.map((result: any, index: number) => (
          <DrugResult key={`drug-result-${index}`} result={result} />
        ))}
      </div>
    </div>
  );
}
