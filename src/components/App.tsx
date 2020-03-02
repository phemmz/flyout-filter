import React from 'react';

import styled, { createGlobalStyle } from 'styled-components';
import Header from './Header';
import ProductStream from './ProductStream';
import { useProductLoader } from '../api/useProductLoader';

const App = () => {
  const products = useProductLoader();
  return (
    <>
      <GlobalStyle />
      <Header />
      <Layout>
        <ProductStream products={products} />
      </Layout>
    </>
  );
};

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
  }
`;

const Layout = styled.article`
  padding: 0 20px;
`;

export default App;
