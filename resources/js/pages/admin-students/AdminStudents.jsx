import { useState, useEffect } from "react";
import TopBar from '../../components/topbar/TopBar';
import StudentTable from './StudentTable';

export default function App() {
    return (
        <>
        <TopBar choose='Students' style={{position: 'sticky', top: '0', zIndex: '1'}} />
        <div className="p-4">
            <StudentTable />
        </div>
        </>
    )
}