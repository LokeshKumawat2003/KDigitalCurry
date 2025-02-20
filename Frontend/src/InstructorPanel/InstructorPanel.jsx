import React, { useEffect, useState } from "react";
import axios from "axios";

const CourseList1 = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/course");
                setCourses(response.data);
            } catch (err) {
                setError("Failed to fetch courses");
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    if (loading) return <p>Loading courses...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
            <h2>Available Courses</h2>
            {courses.map((course) => (
                <div
                    key={course._id}
                    style={{
                        border: "1px solid #ddd",
                        padding: "15px",
                        marginBottom: "10px",
                        borderRadius: "8px",
                    }}
                >
                    <h3>{course.name}</h3>
                    <p>
                        <strong>Scheduled Dates:</strong> {course.scheduledDates}
                    </p>
                    <h4>Lecture Details:</h4>
                    <ul>
                        {course.lectures.map((lecture, index) => (
                            <li key={index}>
                                {lecture.date}: {lecture.topic}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default CourseList1;
