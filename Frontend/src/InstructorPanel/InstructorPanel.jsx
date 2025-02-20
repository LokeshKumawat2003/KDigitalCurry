import React, { useState } from "react";

const CourseList1 = () => {
    const hardcodedCourses = [
        {
            _id: 1,
            name: "React for Beginners",
            scheduledDates: "March 10 - March 20, 2025",
            lectures: [
                { topic: "Introduction to React", date: "March 10" },
                { topic: "State and Props", date: "March 12" },
                { topic: "Handling Events", date: "March 15" },
            ],
        },
        {
            _id: 2,
            name: "Advanced JavaScript",
            scheduledDates: "April 5 - April 15, 2025",
            lectures: [
                { topic: "ES6+ Features", date: "April 5" },
                { topic: "Async JavaScript", date: "April 8" },
                { topic: "Functional Programming", date: "April 12" },
            ],
        },
    ];

    // Directly setting the state with hardcoded data
    const [courses] = useState(hardcodedCourses);

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
