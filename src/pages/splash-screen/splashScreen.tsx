
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../context/UserContext";

const SplashScreen = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<Telegram.InitDataUser | null>(null);
  const { handleSetUser } = useUser();

  useEffect(() => {
      // Ensure the Telegram Web Apps SDK is ready
      Telegram.WebApp.ready();
  
      // Access the user information
      const userInfo = Telegram.WebApp.initDataUnsafe.user;
  
      // Check if the user information is available
      if (userInfo) {
        console.log({userInfo, url: window.location.href});
        setUser(userInfo);
      } else {
        console.log('No user information available.');
        setUser({
          allows_write_to_pm: true,
          first_name: "Qanda",
          id: 1354055384,
          language_code: "en",
          last_name: "Sensei",
          username: "qandasensei"
        })
      }
  }, []);

  useEffect (() => {
      const fetchUserData = async () => {
        Telegram.WebApp.ready();
    
        const startParam = window.Telegram.WebApp.initDataUnsafe.start_param;
        console.log({startParam})
    
        const getUserData = startParam ? await axios.post(`${import.meta.env.VITE_APP_URL}/get-user-data`, {user, referralCode: startParam}) : await axios.post(`${import.meta.env.VITE_APP_URL}/get-user-data`, {user});
        handleSetUser(getUserData);
        // if(getUserData?.data?.success )
        
        if (!getUserData?.data?.userData) {
          setTimeout(() => {
              navigate(`/`);
          }, 2000);
        } else {
          sessionStorage.setItem('authUserLoggedInAI', JSON.stringify(getUserData))
          setTimeout(() => {
              navigate(`/home`);
          }, 2000);
        }
      }

  

      if (user) {
        fetchUserData();
        //fetchBoostUserData();
      }
  }, [user])

    return (
        <section className="h-screen w-full bg-[#000000] flex flex-col items-center justify-center py-5 gap-10 overflow-hidden relative font-OpenSans md:hidden">
            <div className="absolute top-0 bottom-0 left-0 right-0">
              
            </div>
            <div className="flex flex-col items-center">

      
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 750" id="dog-footprint" height='200px'>
  <path fill="#0a3960" d="M375 318.87c-77.82 0-157.11 90.67-157.11 179.66 0 .82 0 1.64.08 2.46a137.7 137.7 0 0 0 2 22.54l.23 1.13c0 .11.27 1.31.3 1.43a85.09 85.09 0 0 0 5.88 16.91 45.33 45.33 0 0 0 2 4.21c1.05 2 2.11 4 3.37 6s2.53 3.93 3.57 5.31a40.85 40.85 0 0 0 3.27 4.19c13.73 16.22 33.38 25.52 53.91 25.52a69.34 69.34 0 0 0 44-15.76 60.08 60.08 0 0 1 30.39-13.87 64.26 64.26 0 0 1 16.1 0 60.43 60.43 0 0 1 30.85 14.1 69.19 69.19 0 0 0 43.74 15.55c21.93 0 42.39-10.35 56-28.2.66-.83 1.32-1.77 1.61-2.22.83-1.17 1.66-2.32 2.8-4.06 1.14-1.93 2.29-3.95 3.44-6.14.51-1 1-2.09 1.36-2.85a85.18 85.18 0 0 0 6.77-18.76l.29-1.39.31-1.51a138.18 138.18 0 0 0 2-22.16c.06-.82.08-1.64.08-2.46-.09-88.96-79.42-179.63-157.24-179.63Zm132.71 202a63.12 63.12 0 0 1-5.17 14.13l-1.08 2.3c-.9 1.7-1.86 3.39-2.51 4.52s-1.35 1.95-2.28 3.26l-.84 1.16c-9.47 12.42-23.43 19.55-38.3 19.55a46.74 46.74 0 0 1-29.41-10.39A82.76 82.76 0 0 0 386 536.38a82 82 0 0 0-22.13 0 82.44 82.44 0 0 0-41.69 18.83 46.93 46.93 0 0 1-29.66 10.6c-13.92 0-27.33-6.41-36.84-17.64a25 25 0 0 1-2-2.54c-1-1.36-1.95-2.78-2.8-4.14-1-1.59-1.8-3.19-2.89-5.26a8.49 8.49 0 0 1-.56-1.18 13.57 13.57 0 0 0-.56-1.37 61.36 61.36 0 0 1-4.43-12.48l-.37-1.8a111.64 111.64 0 0 1-1.65-18.95c0-.45 0-1.51-.08-1.94 0-76.4 69.22-157.21 134.66-157.21s134.7 80.83 134.7 157.23v.61a11.73 11.73 0 0 0-.08 1.33 111.64 111.64 0 0 1-1.62 18.95Z"></path>
  <path fill="#f0f2f0" d="M507.67 520.88a63.12 63.12 0 0 1-5.13 14.12l-1.08 2.3c-.9 1.7-1.86 3.39-2.51 4.52s-1.35 1.95-2.28 3.26l-.84 1.16c-9.47 12.42-23.43 19.55-38.3 19.55a46.74 46.74 0 0 1-29.41-10.39A82.76 82.76 0 0 0 386 536.38a82 82 0 0 0-22.13 0 82.44 82.44 0 0 0-41.69 18.83 46.93 46.93 0 0 1-29.66 10.6c-13.92 0-27.33-6.41-36.84-17.64a25 25 0 0 1-2-2.54c-1-1.36-1.95-2.78-2.8-4.14-1-1.59-1.8-3.19-2.89-5.26a8.49 8.49 0 0 1-.56-1.18 13.57 13.57 0 0 0-.56-1.37 61.36 61.36 0 0 1-4.43-12.48l-.37-1.8a111.64 111.64 0 0 1-1.65-18.95c0-.45 0-1.51-.08-1.94 0-76.4 69.22-157.21 134.66-157.21s134.7 80.83 134.7 157.23v.61a11.73 11.73 0 0 0-.08 1.33 111.64 111.64 0 0 1-1.62 18.95Z"></path>
  <path fill="#0a3960" d="M195.4 251.52c-31 0-56.13 30.22-56.13 67.35s25.18 67.36 56.13 67.36 56.12-30.22 56.12-67.36-25.18-67.35-56.12-67.35Zm0 112.25c-18.57 0-33.68-20.14-33.68-44.9S176.83 274 195.4 274s33.67 20.15 33.67 44.9-15.07 44.87-33.67 44.87Z"></path>
  <path fill="#f0f2f0" d="M229.07 318.87c0 24.76-15.1 44.9-33.67 44.9s-33.68-20.14-33.68-44.9S176.83 274 195.4 274s33.67 20.12 33.67 44.87Z"></path>
  <path fill="#0a3960" d="M307.65 161.72c-30.95 0-56.13 30.21-56.13 67.35s25.18 67.35 56.13 67.35 56.12-30.21 56.12-67.35-25.17-67.35-56.12-67.35Zm0 112.25c-18.57 0-33.68-20.14-33.68-44.9s15.11-44.9 33.68-44.9 33.67 20.15 33.67 44.9S326.22 274 307.65 274Z"></path>
  <path fill="#f0f2f0" d="M341.32 229.07c0 24.76-15.1 44.9-33.67 44.9S274 253.83 274 229.07s15.11-44.9 33.68-44.9 33.64 20.15 33.64 44.9Z"></path>
  <path fill="#0a3960" d="M442.35 161.72c-31 0-56.12 30.21-56.12 67.35s25.17 67.35 56.12 67.35 56.13-30.21 56.13-67.35-25.18-67.35-56.13-67.35Zm0 112.25c-18.57 0-33.67-20.14-33.67-44.9s15.1-44.9 33.67-44.9S476 204.32 476 229.07 460.92 274 442.35 274Z"></path>
  <path fill="#f0f2f0" d="M476 229.07c0 24.76-15.11 44.9-33.68 44.9s-33.67-20.14-33.67-44.9 15.1-44.9 33.67-44.9S476 204.32 476 229.07Z"></path>
  <path fill="#0a3960" d="M554.6 251.52c-30.94 0-56.12 30.22-56.12 67.35s25.18 67.36 56.12 67.36 56.13-30.22 56.13-67.36-25.18-67.35-56.13-67.35Zm0 112.25c-18.57 0-33.67-20.14-33.67-44.9S536 274 554.6 274s33.68 20.15 33.68 44.9-15.11 44.87-33.68 44.87Z"></path>
  <path fill="#f0f2f0" d="M588.28 318.87c0 24.76-15.11 44.9-33.68 44.9s-33.67-20.14-33.67-44.9S536 274 554.6 274s33.68 20.12 33.68 44.87Z"></path>
</svg>
            <p className="text-white m-auto text-center library  w-full text-3xl">
            Woof! Woof!! 
            </p>
            </div>
     
            <div className="flex flex-col items-center justify-center gap-3">

             
                <p className="text-[#A6A6A6] text-lg">Loading...</p>
            </div>
        </section>
    );
};

export default SplashScreen;



