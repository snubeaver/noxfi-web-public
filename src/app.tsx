import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import tw from 'twin.macro';

const DepositPage = lazy(() => import('./pages/deposit'));

const RouteWrapper = tw.main`relative w-full h-full`;
const App = () => {
  return (
    <BrowserRouter>
      <RouteWrapper>
        <Suspense fallback={<></>}>
          <Routes>
            <Route path="/" element={<DepositPage />} />
            <Route path="/deposit" element={<DepositPage />} />
            <Route path="*" element={<DepositPage />} />
          </Routes>
        </Suspense>
      </RouteWrapper>
    </BrowserRouter>
  );
};

export default App;
