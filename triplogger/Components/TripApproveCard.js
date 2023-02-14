import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function TripApproveCard({
  date,
  startOdo,
  endOdo,
  startLoc,
  endLoc,
  startTime,
  endTime,
  approved,
  tripId,
  driverId,
}) {
  const [showContent, setShowContent] = useState();
  const totalTrip = endOdo - startOdo;
  const router = useRouter();

  return (
    <div className={!approved ? "bg-red-200 " : "bg-green-200"}>
      <div
        className="flex justify-between text-gray-700 p-3 mx-5 my-2 text-sm"
        onClick={() => setShowContent(!showContent)}
      >
        <p>{date}</p>
        <p>{totalTrip} Km</p>

        <div>
          <p>
            {startTime} - {endTime}
          </p>
        </div>
      </div>

      {showContent && (
        <div>
          <div className="flex justify-between mx-5 p-2 text-gray-600">
            <p>{startLoc}</p>
            <p className="text-sm px-2 border-solid border-2 border-gray-700 rounded-full">
              {startOdo}
            </p>
          </div>

          <div className="bg-gray-600 text-white rounded-l-full ml-5 p-2">
            <h1 className="ml-5 font-bold">{totalTrip} Km</h1>
          </div>
          <div className="flex justify-between mx-5 p-2 text-gray-600">
            <p>{endLoc}</p>
            <p
              className="text-sm px-2 border-solid 
                        border-2 border-gray-700 rounded-full"
            >
              {endOdo}
            </p>
          </div>

          <div className="mx-5 p-2">
            <button
              onClick={() => {
                try {
                  const res = axios.put(
                    `https://hfjn88-5000.preview.csb.app/feed/driver/${driverId}/dailytrips/${tripId}`,
                    {
                      withCredentials: true,
                    }
                  );
                  console.log("succesful");
                  alert("approved");
                  router.reload(window.location.engineerDash);
                } catch (err) {
                  console.log("unsuccessful", err);
                }
              }}
              className={
                approved
                  ? "hidden"
                  : "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              }
            >
              Approve Trip
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
