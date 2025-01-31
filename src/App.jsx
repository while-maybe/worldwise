import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

// these need to come before the dynamic imports
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import Homepage from "./pages/Homepage";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";
const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

// BEFORE:
// dist/assets/index-77610629.css   30.24 kB │ gzip:   5.07 kB
// dist/assets/index-d42aa4ea.js   509.10 kB │ gzip: 148.78 kB
// AFTER:
// dist/assets/Logo-515b84ce.css             0.03 kB │ gzip:   0.05 kB
// dist/assets/Login-f39ef3ff.css            0.35 kB │ gzip:   0.22 kB
// dist/assets/Product-cf1be470.css          0.47 kB │ gzip:   0.27 kB
// dist/assets/Homepage-b9276e6f.css         0.51 kB │ gzip:   0.30 kB
// dist/assets/PageNav-d3c5d403.css          0.51 kB │ gzip:   0.28 kB
// dist/assets/AppLayout-d95dd89e.css        1.91 kB │ gzip:   0.70 kB
// dist/assets/index-5c065e9e.css           26.57 kB │ gzip:   4.38 kB
// dist/assets/Product.module-02d70b80.js    0.06 kB │ gzip:   0.07 kB
// dist/assets/PageNotFound-f627a92e.js      0.15 kB │ gzip:   0.15 kB
// dist/assets/Logo-b268c41a.js              0.21 kB │ gzip:   0.19 kB
// dist/assets/PageNav-f6b03c87.js           0.49 kB │ gzip:   0.27 kB
// dist/assets/Pricing-51f3696c.js           0.65 kB │ gzip:   0.41 kB
// dist/assets/Homepage-f639540d.js          0.67 kB │ gzip:   0.41 kB
// dist/assets/Product-3e0492c6.js           0.85 kB │ gzip:   0.48 kB
// dist/assets/Login-7d8e3c25.js             1.01 kB │ gzip:   0.54 kB
// dist/assets/AppLayout-d3308f21.js       156.98 kB │ gzip:  46.20 kB
// dist/assets/index-63788c89.js           350.56 kB │ gzip: 102.07 kB

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />

              <Route path="pricing" element={<Pricing />} />
              <Route path="product" element={<Product />} />
              <Route path="login" element={<Login />} />

              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }>
                {/* think of the Navigate component as a redirect */}
                {/* the replace keyword is needed to enable back as it will replace the element in the browser's history stack*/}
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                {/* :id below defines the name of the passed param, in this case 'id', this is essentially an object */}
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
