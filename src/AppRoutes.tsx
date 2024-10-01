import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import SplashScreen from "./pages/splash-screen/splashScreen";
import EarlyAdopters from "./pages/early-adopters/earlyAdopters";
import Stats from "./pages/stats/stats";
import PowerUp from "./pages/power-up/powerUp";
import Earn from "./pages/earn/earn";
import Referral from "./pages/referral/referral";
import Home from "./pages/home/home";
import History from "./pages/history/history";
import Character from "./pages/character/character";
import Congrats from "./pages/early-adopters/congrats";
import Starter from "./pages/starter/starter";
import Contest from "./pages/contest/contest";
import SplashScreen from "./pages/splash-screen/splashScreen";

export default function AppRoutes() {
    return (
        <Router>
            
            <Routes>
                <Route path="/splash-screen" element={<Starter />} />
                <Route path="/home" element={<Home />} />
                <Route path="/leaderboard" element={<Stats />} />
                <Route path="/invites" element={<Referral />} />


                <Route path="/" element={<SplashScreen />} />
                <Route path="/character" element={<Character />} />
                <Route path="/early-adopters" element={<EarlyAdopters />} />
                <Route path="/congrats" element={<Congrats />} />
                <Route path="/earn" element={<Earn />} />
                <Route path="/referral" element={<Referral />} />
                <Route path="/power-up" element={<PowerUp />} />
                <Route path="/stats" element={<Stats />} />
                <Route path="/history" element={<History />} />
                <Route path="/Contest" element={<Contest />} />
            </Routes>
        </Router>
    );
}
