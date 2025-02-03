import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import '../src/css/globals.css'
import App from './App.tsx'
import Spinner from './views/spinner/Spinner.tsx'
import { CustomizerContextProvider } from './context/CustomizerContext.tsx'
import './utils/i18n.ts';
import "./api/index";
import { DashboardContextProvider } from './context/DashboardContext/DashboardContext.tsx'
import { Provider } from 'react-redux'
import { store, persistStore } from './redux/store.ts';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistStore}>
      <DashboardContextProvider>
        <CustomizerContextProvider>
          <Suspense fallback={<Spinner />}>
            <App />
          </Suspense>
        </CustomizerContextProvider>
      </DashboardContextProvider>
    </PersistGate>
  </Provider>
  ,
)
