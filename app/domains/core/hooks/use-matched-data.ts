import { LoaderFunctionArgs, SerializeFrom } from "@remix-run/node";
import { useMatches } from "@remix-run/react";

export const useMatchedData = <
  T extends (args: LoaderFunctionArgs) => Promise<unknown>
>(
  id: string
) => {
  const matches = useMatches();

  const match = matches.find((m) => m.id === id);
  return match?.data as SerializeFrom<T>;
};
