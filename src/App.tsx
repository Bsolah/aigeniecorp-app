import { RouterProvider } from "react-router";

import { Flowbite, ThemeModeScript } from 'flowbite-react';
import customTheme from './utils/theme/custom-theme.tsx';
import router from "./routes/Router.tsx";
import { useDispatch } from "react-redux";
import type { AppDispatch } from './redux/store.ts';
import { useEffect } from "react";
import AutoLogout from "./routes/AutoLogout.tsx";
import { getOrg } from "./redux/slices/orgSlice.ts";

function App() {


  // console.log('user app.tsx ', user);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getOrg())
  }, [])

  return (
    <>
      <ThemeModeScript />
      <Flowbite theme={{ theme: customTheme }}>
      <RouterProvider router={router} />
      <AutoLogout />
      </Flowbite>
    </>
  );
}

export default App;
