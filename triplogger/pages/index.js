import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import DriverCard from "../Components/DriverCard";
import TripCard from "../Components/TripCard";

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
      <DriverCard name={username} vehicle={vehicleNumber} />
      {trips?.map((trip) => (
        <div key={trip._id}>
          <TripCard
            key={trip.startTime}
            date={trip.date}
            startOdo={trip.startOdometer}
            endOdo={trip.endOdometer}
            startTime={trip.startTime}
            endTime={trip.endTime}
            startLoc={trip.startLocation}
            endLoc={trip.endLocation}
          />
        </div>
      ))}
    </div>
  );
}
