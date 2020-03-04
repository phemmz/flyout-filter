import React, { useState, useEffect, useRef } from 'react';

import styled, { createGlobalStyle, keyframes } from 'styled-components';
import Header from './Header';
import ProductStream from './ProductStream';
import FilterSection from './FilterSection';
import { useProductLoader } from '../api/useProductLoader';
import useFilterLoader from '../api/useFilterLoader';
import { getRequiredFilters } from '../api/normalizeProduct';
import { FilterValue, SidebarProps, ImageProps } from '../types/Product';
import close from '../assets/close.svg';

const App = () => {
  const sideNavRef = useRef(null);
  const loaderRef = useRef(0);
  const [attributes, setAttributes] = useState(null);
  const products = useProductLoader(attributes, loaderRef.current);
  const [isActive, toggleSideNav] = useState(false);
  // get colors and pattern filters from the filters array
  const requiredFilters = getRequiredFilters(useFilterLoader(), [1, 317]);
  const [selectedFilters, setFilter] = useState([]);

  const handleSideNav = (event: MouseEvent): void => {
    // checks if the area being clicked is not the sidenav
    if (sideNavRef.current && sideNavRef.current.contains(event.target)) {
      return;
    }

    toggleSideNav(false);
  }

  useEffect(() => {
    // added this to be able to close the sidenav from any where in the app
    document.addEventListener('mousedown', handleSideNav);

    return () => {
      document.removeEventListener('mousedown', handleSideNav);
    }
  }, []);

  const selectFilter = (currentFilter: FilterValue): void => {
    setFilter(state => [...state, currentFilter]);
    setAttributes(state => {
      if (!state) {
        return [{ id: currentFilter.filterCategoryId, type: 'attributes', values: [currentFilter.id]}]
      } else if (!!state.find(attribute => attribute.id === currentFilter.filterCategoryId)) {
        return state.map(attribute => {
          if (attribute.id === currentFilter.filterCategoryId) {
            return {
              ...attribute,
              values: [...attribute.values, currentFilter.id]
            }
          }

          return attribute;
        })
      }

      return [...state, { id: currentFilter.filterCategoryId, type: 'attributes', values: [currentFilter.id]}];
    });
    loaderRef.current++;
  };

  const removeFilter = (currentFilter: FilterValue): void => {
    const updatedSelectedFilters = selectedFilters.filter(filter =>
      filter.id !== currentFilter.id
    );
    setFilter(updatedSelectedFilters);
    setAttributes(state => {
      const updatedAttrs = state.map(filter => {
        if (filter.id === currentFilter.filterCategoryId) {
          const updatedVals = filter.values.filter(val => val !== currentFilter.id);

          if (updatedVals.length) {
            return {
              ...filter,
              values: updatedVals
            };
          } else {
            return null;
          }
        }

        return filter;
      });
      return updatedAttrs.filter(updatedAtt => !!updatedAtt);
    });
    loaderRef.current++;
  }

  return (
    <>
      <GlobalStyle isActive={isActive} />
      <Header toggleSideNav={toggleSideNav} />
      {selectedFilters.length ? (
        <TagContainer>
          {selectedFilters.map((filter): JSX.Element => {
            return (
              <Tag
                key={filter.id}
                onClick={() => removeFilter(filter)}
              >
                <Title>{filter.name}</Title>
                <Image width="10px" height="10px" src={close} alt="close" />
              </Tag>
            )
          })}
        </TagContainer>
      ) : null}
      <Layout>
        <ProductStream products={products} />
      </Layout>
      <Sidebar ref={sideNavRef} isActive={isActive}>
        <Container>
          <h2>Filters</h2>
          <BaseButton onClick={() => toggleSideNav(false)} role="presentation">
            <Image src={close} width="18px" height="18px" alt="close" />
          </BaseButton>
        </Container>
        <div style={{ height: 'calc(100% - 100px)', overflowY: 'auto' }}>
          {requiredFilters.map((filter, index): JSX.Element => {
            return (
              <FilterSection
                key={filter.id}
                filter={filter}
                selectedFilters={selectedFilters}
                removeFilter={removeFilter}
                selectFilter={selectFilter}
                index={index}
              />
            );
          })}
        </div>
        <BottomContainer>
          <Button onClick={() => toggleSideNav(false)} role="presentation">Submit</Button>
        </BottomContainer>
      </Sidebar>
    </>
  );
};

const animateSideNav = keyframes`
  0% {
    right: -300px;
    opacity: 0;
  }
  100% {
    right: 0;
    opacity: 1;
  }
`;

const Sidebar = styled.div<SidebarProps>`
  position: fixed;
  height: 100%;
  width: 350px;
  display: ${({ isActive }) => isActive ? 'block' : 'none'};
  top: 0;
  right: 0;
  padding: 15px;
  animation: ${animateSideNav} 0.4s;
  background-color: #fff;
  z-index: 1;
  box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);

  @media (max-width: 425px) {
    width: 80%;
  }
`;

const GlobalStyle = createGlobalStyle<SidebarProps>`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    overflow-y: ${({ isActive }) => isActive ? 'hidden' : 'auto'};
    font-family: Arial, Helvetica, sans-serif;
  }

  h2 {
    margin: 0;
  }

  span {
    color: #9b9b9b;
  }
`;

const Layout = styled.article`
  padding: 0 20px;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const TagContainer = styled(FlexContainer)`
  justify-content: flex-start;
  padding: 0 20px;
`;

const Tag = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 10px 10px 0;
  padding: 8px 10px;
  border: 1px solid #9b9b9b;
  border-radius: 2px;
  font-size: 12px;
  cursor: pointer;
  background-color: #fff;
  color: #fff;
`;

const Container = styled(FlexContainer)`
  height: 20px;
  margin-bottom: 20px;
`;

const BottomContainer = styled(FlexContainer)`
  height: 80px;
  justify-content: center;
  flex-wrap: no-wrap;
`;

const BaseButton = styled.button`
  cursor: pointer;
  border: 0;
  color: #fff;
  background-color: #fff;
`;

const Button = styled(BaseButton)`
  padding: 10px 25px;
  border: 1px solid #e5e5e5;
  border-radius: 999px;
  font-size: 16px;
  background-color: #000;
`;

const Title = styled.span`
  margin-right: 10px;
`;

const Image =  styled.img<ImageProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;

export default App;
