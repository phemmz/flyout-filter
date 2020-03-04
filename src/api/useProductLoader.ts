import { useCallback } from 'react';
import { execute } from '@aboutyou/backbone/helpers/execute';
import {
  APISortOrder,
  createProductsSearchEndpointRequest,
} from '@aboutyou/backbone/endpoints/products/products';
import { useAsyncLoader } from './useAsyncLoader';
import { normalizeProduct } from './normalizeProduct';

const SHOP_ID = 139;

export const useProductLoader = (attributes, loaderRef) => {
  const products = useAsyncLoader(
    useCallback(
      () =>
        execute(
          'http://0.0.0.0:9459/v1/',
          SHOP_ID,
          createProductsSearchEndpointRequest({
            where: {
              categoryId: 20236,
              ...(attributes ? { attributes } : {})
            },
            pagination: {
              page: 1,
              perPage: 50,
            },
            sort: {
              channel: 'etkp',
              direction: APISortOrder.Descending,
              score: 'category_scores',
            },
            with: {
              attributes: {
                withKey: ['brand'],
              },
              priceRange: true,
            },
          }),
        ).then(({ data }) => data.entities.map(normalizeProduct)),
        [loaderRef]
      ),
  );

  return Array.isArray(products) ? products : [];
};
