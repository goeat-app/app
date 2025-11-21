import { useLoaderStore } from '@/store/loading';

export async function loadingWrapper<T>(fn: () => Promise<T>): Promise<T> {
  const setIsLoading = useLoaderStore.getState().setIsLoading;

  setIsLoading(true);

  try {
    return await fn();
  } finally {
    setIsLoading(false);
  }
}
