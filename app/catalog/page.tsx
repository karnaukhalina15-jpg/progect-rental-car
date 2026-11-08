import { Suspense } from "react";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";

import { connection } from "next/server";
import { getCars } from "@/lib/api";
import type { CarsResponse } from "@/types/car";
import CatalogClient from "@/components/CatalogClient/CatalogClient";

async function CatalogContent() {
  await connection();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
      },
    },
  });

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["cars", {}],
    queryFn: ({ pageParam }) => getCars({ page: pageParam, perPage: 12 }),
    getNextPageParam: (lastPage: CarsResponse) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogClient />
    </HydrationBoundary>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<span className="loader"></span>}>
      <CatalogContent />
    </Suspense>
  );
}
