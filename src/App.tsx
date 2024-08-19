import AppRoutes from "./AppRoutes";
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <>
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
        </>
    );
}

export default App;
