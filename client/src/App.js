// Styles
import "./App.css";

// MUI Components
import { Box, Container } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';

// Routes
import { ROUTE_URL } from "./configs/routes";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

// UI subelements
import AppHeader from "./components/app-header/app-header";

// Lazy-loaded Components
import React, { Suspense } from "react";
import { Loading } from "./suspense-fallback";
import { NoRoute } from "./components/views/no-route";

//Redux
import { Provider } from 'react-redux'
import { store } from "./redux/store/store";
// import SpeechToText from "./components/views/speech";

// Lazy import for views
const Home = React.lazy(() => import("./components/views/home"));
const Interview = React.lazy(() => import("./components/views/interview"));
const Dashboard = React.lazy(() => import("./components/views/dashboard"));

function App() {
  return (
    <Provider store={store}>
      <Box position={"relative"}>
        <CssBaseline />
        <Container maxWidth="lg">
          {/* Place your header */}
          <AppHeader />
          <Box marginTop={3}>
            <Router>
              <Suspense fallback={<Loading />}>
                <Routes>
                  <Route element={<Home />} path={`${ROUTE_URL.HOME}`} />
                  <Route element={<Interview />} path={`${ROUTE_URL.INETRVIEW}`} />
                  <Route element={<Dashboard />} path={`${ROUTE_URL.DASHBOARD}`} />
                  <Route element={<NoRoute />} path={`${ROUTE_URL.NO_ROUTE}`} />
                  {/* <Route element={<SpeechToText />} path={`/speech`} /> */}
                </Routes>
              </Suspense>
            </Router>
          </Box>
        </Container>
      </Box>
    </Provider>
  );
}

export default App;
