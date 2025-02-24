import { RouterProvider } from "react-router";

import { Flowbite, ThemeModeScript } from 'flowbite-react';
import customTheme from './utils/theme/custom-theme.tsx';
import router from "./routes/Router.tsx";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from './redux/store.ts';
import { getChatsByCurrentUser } from './redux/slices/chatSlice.ts';
import { getRootFolders } from './redux/slices/folderSlice.ts';
import { useEffect } from "react";
import AutoLogout from "./routes/AutoLogout.tsx";

function App() {

  const dispatch = useDispatch<AppDispatch>();
  const {user} = useSelector((state: any) => state.auth);

  useEffect(() => {
    dispatch(getRootFolders({orgId: user?.organizations[0]?._id}))
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
