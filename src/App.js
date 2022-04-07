import './App.css';
import React, { useState, useEffect } from 'react';
import { addScheduleTimes } from './utilities/times.js';
import CourseList from './components/CourseList.js'

const Banner = ({ title }) => (
  <h1>{title}</h1>
);

const App = () => {
  const [schedule, setSchedule] = useState();
  const url = 'https://courses.cs.northwestern.edu/394/data/cs-courses.php';
  useEffect(() => {
    const fetchSchedule = async () => {
      const response = await fetch(url);
      if (!response.ok) throw response;
      const json = await response.json();
      setSchedule(addScheduleTimes(json));
    }
    fetchSchedule();
  }, []);
  //If an empty list is given, then React runs the function only when the component is first added. That's what we want here:
  if (!schedule) return <h1>Loading schedule...</h1>;
  return (
    <div className="container">
      <Banner title={schedule.title} />
      <CourseList courses={schedule.courses} />
    </div>
  );
};


export default App;
