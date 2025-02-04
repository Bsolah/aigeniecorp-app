import { RouterProvider } from "react-router";

import { Flowbite, ThemeModeScript } from 'flowbite-react';
import customTheme from './utils/theme/custom-theme.tsx';
import router from "./routes/Router.tsx";
import { useDispatch } from "react-redux";
import type { AppDispatch } from './redux/store.ts';
import { getChatsByUser } from './redux/slices/chatRoomSlice.ts';
import { useEffect } from "react";

function App() { 

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getChatsByUser())
  }, [])

  return (
    <>
      <ThemeModeScript />
      <Flowbite theme={{ theme: customTheme }}>
      <RouterProvider router={router} />
      </Flowbite>
    </>
  );
}

export default App;
