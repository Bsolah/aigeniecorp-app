import { RouterProvider } from 'react-router';

import { Flowbite, ThemeModeScript } from 'flowbite-react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getChatsByUser } from './redux/slices/chatRoomSlice.ts';
// import { getChatAllRooms } from './redux/slices/chatSlice.ts';
import type { AppDispatch } from './redux/store.ts';
import router from './routes/Router.tsx';
import customTheme from './utils/theme/custom-theme.tsx';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getChatsByUser());
    // dispatch(getChatAllRooms());
  }, []);

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
