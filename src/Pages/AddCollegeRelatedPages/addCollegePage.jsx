import React, { useState, useEffect } from 'react';
import AddCollegeCard from '../../components/AddCollegeComponents/AddCollegeCard';
import { getAddCollegeList } from '../../Services/operations/AddCollege';
import { useDispatch } from 'react-redux';

const AddCollegePage = () => {
  const [addCollegeData, setAddCollegeData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // Async function to fetch data
    const fetchAddCollegeData = async () => {
      try {
        dispatch(getAddCollegeList(setAddCollegeData)); // Assuming getAddCollegeList is an async function

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAddCollegeData(); // Call the async function
  }, []); // Empty dependency array to run only once on mount

  return (
    <div>
      {addCollegeData.map((data, index) => (
        <AddCollegeCard
          key={index}  // Use a unique key if possible (e.g., data.collegeId)
          mobileNumber={data?.mobileNumber}
          email={data?.email}
          collegeName={data?.collegeName}
          campusType={data?.campusType}
          streetAddress={data?.streetAddress}
          city={data?.city}
          locality={data?.locality}
          state={data?.state}
          postalCode={data?.postalCode}
          country={data?.country}
        />
      ))}
    </div>
  );
};

export default AddCollegePage;
