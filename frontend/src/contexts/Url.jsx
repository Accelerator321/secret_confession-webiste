// import dotenv from 'dotenv';
// dotenv.config(); 
export default function useUrl(path){
    // const base =import.meta.env.VITE_APP_API_URL;
    const base= "https://secret-confession-backend.vercel.app/";
    // console.log(base);
    return (base + path);
}