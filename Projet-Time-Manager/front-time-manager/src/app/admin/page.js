"use client"
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import WorkerList from "../components/admin/WorkerList";
// import ModalHoraire from "../components/admin/ModalHoraire";
import { Modak } from "next/font/google";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

export default function page(){
    
    return (
        <div>
            <WorkerList/>
            
        </div>
    )
}