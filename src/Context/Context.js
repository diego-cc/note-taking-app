import React from 'react';
import {THEMES} from "../Customisation/themes";

export const AppContext = React.createContext({theme: THEMES.Light});
export const AppProvider = AppContext.Provider;
export const AppConsumer = AppContext.Consumer;
