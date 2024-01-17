import dotenv from 'dotenv';
dotenv.config(); 
export default function useUrl(path){
    const base = process.env.REACT_APP_API_URL;
    // console.log(base);
    return (base + path);
}