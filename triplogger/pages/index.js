import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import DriverCard from "../Components/DriverCard";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [trips, setTrips] = useState([]);
  //get user
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          "https://hfjn88-5000.preview.csb.app/auth/driver/user",
          {
            withCredentials: true,
          }
        );

        if (!res.data) {
          router.push("/login");
        }
        const info = await res.data;
        setUsername(info.username);
        setVehicleNumber(info.assignedVehicle);
        setTrips(info.dailyTrips);
      } catch (err) {
        console.log("Error getting user", err);
      }
    };

    getUser();
  }, []);

  console.log(username, vehicleNumber, trips);

  return (
    <div>
      <h1>{username}</h1>
      <DriverCard />
    </div>
  );
}
