import { useLocation } from "react-router-dom";

export const useUrlParmas = (key: string) => {
    const { search } = useLocation();
    return new URLSearchParams(search).get(key);
}