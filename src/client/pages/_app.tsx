import React from 'react';
import {AppComponent} from "next/dist/shared/lib/router/router";

import './app.scss'

const App: AppComponent = ({ Component, pageProps }) => {
    return <Component {...pageProps} />
}

export default App;