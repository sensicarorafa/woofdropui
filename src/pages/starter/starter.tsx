import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Starter = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<Telegram.InitDataUser | null>(null);

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
      try {
        const fetchUserData = async () => {
          const getUserData = await axios.post(`${import.meta.env.VITE_APP_URL}/get-user-data`, {user})
          sessionStorage.setItem('authUserLoggedInAI', JSON.stringify(getUserData))
          if (getUserData?.data?.success) {
            navigate('/splash-screen');
          }
        }
        if (user) {
          fetchUserData();
        }
      } catch (error: any) {
        alert(error.message)
      }
        
    }, [user])

    return (
        <></>
    );
};

export default Starter;
