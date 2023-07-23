import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import tw from 'twin.macro';

const DepositPage = lazy(() => import('./pages/deposit'));
const TradePage = lazy(() => import('./pages/trade'));
const MyPage = lazy(() => import('./pages/my'));
const TestPage = lazy(() => import('./pages/_test'));

const RouteWrapper = tw.main`relative w-full h-full`;
const App = () => {
  return (
    <BrowserRouter>
      <RouteWrapper>
        <Suspense fallback={<></>}>
          <Routes>
            <Route path="/" element={<DepositPage />} />
            <Route path="/deposit" element={<DepositPage />} />
            <Route path="/trade" element={<TradePage />} />
            <Route path="/my" element={<MyPage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </RouteWrapper>
    </BrowserRouter>
  );
};

export default App;
