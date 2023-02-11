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
        }
        const info = await res.data;

        setUsername(info.username);
        setVehicleNumber(info.assignedVehicle);
        setTrips(info.dailyTrips);
      } catch (err) {
        console.log("Error getting user", err);
        router.push("/login");
      }
    };

    getUser();
  }, []);

  console.log(username, vehicleNumber, trips);

  let totalTrip = 0;
  let totalWorkHours = 0;
  // Total Trip Function
  trips.forEach((data) => {
    totalTrip += data.endOdometer - data.startOdometer;

    // working hours
    let startingTime = new Date(`${data.date}T${data.startTime}`).getTime();
    let endingTime = new Date(`${data.date}T${data.endTime}`).getTime();
    let workingHours = (endingTime - startingTime) / 60000 / 60;
    totalWorkHours += workingHours;
  });

  console.log(totalWorkHours);
  
  const logout= async ()=>{
    try{
      const res= await axios.delete()
      
    }catch (err){
      
    }
  }

  return (
    <div>
      <div>
        {/* logout */}
        <p className="text-sm text-red-500 p-2"
        onClick={logout}>Logout</p>
      </div>
      <DriverCard name={username} vehicle={vehicleNumber} />

      <div className="flex justify-between items-center mx-5">
        <h1 className="text-xl p-2  font-bold text-gray-700">Trips</h1>

        <p className="text-gray-600">Total Milage: {totalTrip} Km</p>
      </div>
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
