import { useState, useEffect } from "react";
import TopBar from '../../components/topbar/TopBar';
import TeacherTable from './TeacherTable';

export default function App() {
    return (
        <>
        <TopBar choose='Teachers' style={{position: 'sticky', top: '0', zIndex: '1'}} />
        <div className="p-4">
            <TeacherTable />
        </div>
        </>
    )
}