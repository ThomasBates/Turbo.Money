import { useContext } from 'react';

import AppContextType from './AppContext';

export function useAppContext() {
    return useContext(AppContextType);
}