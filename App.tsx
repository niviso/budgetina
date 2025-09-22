import { StatusBar } from 'expo-status-bar';
import { RouterProvider, DataProvider } from './context/';
import Router from './routes';


export default function App() {

  return (
    <>
      <RouterProvider>
        <DataProvider>
          <StatusBar style="auto" />
          <Router />
        </DataProvider>
      </RouterProvider>
    </>
  );
}
