import { TonConnectUIProvider } from "@tonconnect/ui-react";
import AppRoutes from "./AppRoutes";
import { Toaster } from "react-hot-toast";

// Replace with the actual URL where your manifest.json is hosted
const manifestUrl = 'https://your-app-url.com/manifest.json';

function App() {
    return (
        <>
        <TonConnectUIProvider manifestUrl={manifestUrl}>
            <AppRoutes />
            <Toaster
             position="bottom-center"
             reverseOrder={false}
             gutter={8}
             containerClassName=""
             containerStyle={{}}
             toastOptions={{
               // Define default options
               className: "",
               duration: 1000,
               style: {
                 background: "#363636",
                 color: "#fff",
               
               },
             }}
            />
            </TonConnectUIProvider>
        </>
    );
}

export default App;
