import { AttributesFilterValue } from '@aboutyou/backbone/endpoints/filters/filters';

export interface Product {
  id: number;
  image: string | null;
  name: string;
  price?: string;
}

export interface FilterValue extends AttributesFilterValue {
  filterCategoryId: number;
}

export interface SidebarProps {
  isActive: boolean;
}

export interface ImageProps {
  width: string;
  height: string;
}
