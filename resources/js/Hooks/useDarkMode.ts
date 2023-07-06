import React, { useEffect, useState } from 'react';


const useDarkMode = () => {
    const [isDarkMode,setIsDarkMode]=useState<boolean>(false);
    const {classList}=document.documentElement;
    const toggleTheme = () =>{
        
        if(isDarkMode){
            setIsDarkMode(false);
            localStorage.removeItem('theme');    
            return classList.remove('dark');
        }
        setIsDarkMode(true);
        
        localStorage.setItem('theme','dark');
        return classList.add('dark');
    }

    useEffect(()=>{
        if (localStorage.getItem('theme')==='dark'){
            classList.add('dark');
            setIsDarkMode(true);
        }
    },[]);

    return {toggleTheme};
}

export default useDarkMode