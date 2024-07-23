'use client'
import { useEffect } from "react";

export default function BootstrapClient(){
    useEffect(()=>{
        require("../../public/assets/js/bootstrap.bundle.min.js")
    },[]);
    return null;
}