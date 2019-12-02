/**
 * Context.js
 */
import React from 'react';
import {THEMES} from "../Customisation/themes";

/**
 * Context of this application
 * @type {React.Context<{theme: "dark" | "light"}>}
 */
export const AppContext = React.createContext({theme: THEMES.Light});

/**
 * Makes AppContext available to all components of this application
 * @type {React.Provider<{theme: ("dark"|"light")}>}
 */
export const AppProvider = AppContext.Provider;

/**
 * Allows AppContext to be consumed by all components
 * @type {React.Consumer<{theme: ("dark"|"light")}>}
 */
export const AppConsumer = AppContext.Consumer;
