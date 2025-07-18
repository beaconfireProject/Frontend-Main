import React, { useEffect, useState } from "react";
import axios from "axios";

type HouseSummary = {
    houseId: number;
    address: string;
    numEmployees: number;
    landlord: {
        firstName: string;
        lastName: string;
        phone: string;
        email: string;
    };
};

type HRHouseListProps = {
    onSelectHouse: (id: number) => void;
};

const HRHouseList: React.FC<HRHouseListProps> = ({ onSelectHouse }) => {
    const [houses, setHouses] = useState<HouseSummary[]>([]);

    useEffect(() => {
        axios
            .get("http://localhost:9000/api/housing", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
            .then((res) => setHouses(res.data))
            .catch((err) => console.error("Failed to fetch houses:", err));
    }, []);

    return (
        <div>
            <ul>
                {houses.map((house) => (
                    <li key={house.houseId}>
                        <button onClick={() => onSelectHouse(house.houseId)}>
                            {house.address} ({house.numEmployees} people)
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HRHouseList;
