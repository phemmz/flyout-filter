import React, { FC } from 'react';
import styled from 'styled-components';
import { Product } from '../types/Product';
import ProductTile from './ProductTile';

interface Props {
  products: Product[];
}

const ProductStream: FC<Props> = ({ products }) => {
  return (
    <Wrapper>
      {products.map(product => (
        <ProductTile key={product.id} {...product} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -2.5px;
  > * {
    width: 25%;
    padding: 10px 2.5px 0;
    @media (max-width: 768px) {
      width: 33%;
    }
    @media (max-width: 1024px) {
      width: 50%;
    }
  }
`;

export default ProductStream;
