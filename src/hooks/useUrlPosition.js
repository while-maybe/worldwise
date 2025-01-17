import { useSearchParams } from "react-router-dom";

// we can't access the search params directly, a get is needed
export function useUrlPosition() {
  const [searchParam] = useSearchParams();

  const lat = searchParam.get("lat");
  const lng = searchParam.get("lng");

  return [lat, lng];
}
