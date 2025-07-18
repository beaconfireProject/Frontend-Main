import React, { useEffect, useState } from "react";
import axios from "axios";
import HRReportDetailModal from "./HRReportDetailModal";

type Facility = {
    type: string;
    description: string;
    quantity: number;
};

type Report = {
    id: number;
    title: string;
    description: string;
    createDate: string;
    status: string;
    reporterName: string; 
    employeeId: string; 
    facility: Facility;
};

const HRFacilityReportTable: React.FC<{ houseId: number }> = ({ houseId }) => {
    const [reports, setReports] = useState<Report[]>([]);
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        setSelectedReport(null);
        setPage(0);
    }, [houseId]);

    useEffect(() => {
        axios
            .get(`http://localhost:9000/api/housing/${houseId}/facility-reports?page=${page}&size=5`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
            .then((res) => {
                setReports(res.data.content);
                setTotalPages(res.data.totalPages);
            })
            .catch((err) => console.error("Failed to fetch reports:", err));
    }, [houseId, page]);

    return (
        <div>
            <h4>Facility Reports</h4>

            <ul>
                {reports.map((r) => (
                    <li key={r.id}>
                        <button onClick={() => { console.log("Clicked report:", r); setSelectedReport(r); }}>
                            {r.title} - {r.facility.type}
                        </button>
                    </li>
                ))}
            </ul>

            {selectedReport && (
                <HRReportDetailModal
                    report={selectedReport}
                    onClose={() => setSelectedReport(null)}
                />
            )}

            <div style={{ marginTop: "10px" }}>
                <button onClick={() => setPage(p => Math.max(p - 1, 0))} disabled={page === 0}>
                    Previous
                </button>
                <span style={{ margin: "0 10px" }}>Page {page + 1} of {totalPages}</span>
                <button onClick={() => setPage(p => Math.min(p + 1, totalPages - 1))} disabled={page >= totalPages - 1}>
                    Next
                </button>
            </div>


        </div>
    );
};

export default HRFacilityReportTable;
