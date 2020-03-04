import React from 'react';

import styled from 'styled-components';
import tick from '../assets/tick.svg';
import darkTick from '../assets/tick-dark.svg';

const COLOR_OBJ = {
  schwarz: 'black',
  blau: 'blue',
  rot: 'red',
  weiß: 'white',
  pink: 'pink',
  grün: 'green',
  grau: 'gray',
  beige: 'beige',
  braun: 'brown',
  gelb: 'yellow',
  orange: 'orange',
  lila: 'purple',
  silber: 'silver',
  gold: 'gold',
  bronze: 'bronze'
}

interface FilterWrapperProps {
  index: number;
}

interface CheckboxProps {
  backgroundColor: string;
}

const FilterSection = ({
  filter, selectedFilters, removeFilter, selectFilter, index
}) => {
  return (
    <FilterWrapper index={index} data-testid="FilterSection">
      <span>{filter.name}</span>
      <FilterContainer>
        {filter.values.map(item => {
          const isSelected = !!selectedFilters.find(filter => filter.id === item.id);
          const whiteColors = ['weiß', 'mischfarben', 'bronze', 'beige', 'gelb'];

          return (
            <FilterItem
              key={item.id}
              onClick={() => isSelected ?
                removeFilter({ ...item, filterCategoryId: filter.id }) :
                selectFilter({ ...item, filterCategoryId: filter.id })}
            >
              <CheckboxContainer
                backgroundColor={filter.name === 'Muster' && isSelected ? '#000' : COLOR_OBJ[item.name]}
              >
                {isSelected ? (
                  <Image
                    width="6px"
                    height="6px"
                    src={whiteColors.includes(item.name) ? darkTick : tick}
                    alt=""
                  />
                ) : null}
              </CheckboxContainer>
              <Label>{item.name}</Label>
            </FilterItem>
          );
        })}
      </FilterContainer>
    </FilterWrapper>
  );
};

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

const FilterWrapper = styled.div<FilterWrapperProps>`
  margin-top: ${({ index }: any) => index ? '20px' : '0px'};
`;

const Container = styled(FlexContainer)`
  height: 20px;
  margin-bottom: 20px;
`;

const FilterContainer = styled(FlexContainer)`
  margin-top: 15px;
`;

const FilterItem = styled.button`
  width: calc(100% / 3);
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  border: 0;
  background-color: #fff;
  cursor: pointer;

  &:focus {
    outline: 0;
  }

  @media (max-width: 425px) {
    width: 50%;
  }
`;

const CheckboxContainer = styled(FlexContainer)<CheckboxProps>`
  height: 15px;
  width: 15px;
  border-radius: 2px;
  border: 1px solid #9b9b9b;
  background-color: ${({ backgroundColor }: any) => backgroundColor};
  justify-content: center;
`;

const BaseButton = styled.button`
  cursor: pointer;
  border: 0;
  color: #fff;
  background-color: #fff;
`;

const Image =  styled.img`
  width: ${({ width }: any) => width};
  height: ${({ height }: any) => height};
`;

const Label = styled.label`
  flex: 1;
  margin-left: 5px;
  text-align: left;
  font-size: 14px;
  color: #9b9b9b;
`;

export default FilterSection;
