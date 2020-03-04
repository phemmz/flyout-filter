import { useCallback } from 'react';
import { execute } from '@aboutyou/backbone/helpers/execute';
import { createFiltersEndpointRequest } from '@aboutyou/backbone/endpoints/filters/filters';
import { useAsyncLoader } from './useAsyncLoader';

const SHOP_ID = 139;

const useFilterLoader = () => {
  const filters = useAsyncLoader(
    useCallback(
      () =>
        execute(
          'http://0.0.0.0:9459/v1/',
          SHOP_ID,
          createFiltersEndpointRequest({
            where: {
              categoryId: 20236
            },
            with: ['values'],
          }),
        ).then(({ data }) => data),
      [],
    ),
  );

  return Array.isArray(filters) ? filters : [];
};

export default useFilterLoader;
