
// 1. Import all required types
import type { FilterItem, FilterType, FilterOption } from '../../ItemFilter/types';
import type { FilterState } from './state';

// 2. Re-export everything from config
export * from './config';

// 3. Re-export types from ItemFilter
export type { FilterItem, FilterType, FilterOption };

// 4. Re-export FilterState
export type { FilterState };

// 5. Create a namespace for all types (optional, but can help with organization)
export namespace FilterTypes {
    export type Item = FilterItem;
    export type Type = FilterType;
    export type Option = FilterOption;
    export type State = FilterState;
}