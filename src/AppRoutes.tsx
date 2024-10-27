import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import SplashScreen from "./pages/splash-screen/splashScreen";

import SplashScreen from "./pages/splash-screen/splashScreen";
import Woofdrop from "./pages/woofdrop/woofdrop";
import Woofnomics from "./pages/woofnomics/woofnomics";
import Woofrens from "./pages/woofrens/woofrens";

export default function AppRoutes() {
    return (
        <Router>
            
            <Routes>
                <Route path="/" element={<SplashScreen />} />
                <Route path="/woofnomics" element={<Woofnomics />} />
                <Route path="/woofrens" element={<Woofrens />} />
                <Route path="/home" element={<Woofdrop />} />
            </Routes>
        </Router>
    );
}
