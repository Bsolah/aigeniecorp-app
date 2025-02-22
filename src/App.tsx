import { RouterProvider } from "react-router";

import { Flowbite, ThemeModeScript } from 'flowbite-react';
import customTheme from './utils/theme/custom-theme.tsx';
import router from "./routes/Router.tsx";
import { useDispatch } from "react-redux";
import type { AppDispatch } from './redux/store.ts';
import { getChatsByCurrentUser } from './redux/slices/chatSlice.ts';
import { getFolders } from './redux/slices/folderSlice.ts';
import { useEffect } from "react";
import AutoLogout from "./routes/AutoLogout.tsx";

function App() {

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getFolders())
    dispatch(getChatsByCurrentUser())
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
