import React, { useState } from "react";
import axios from "axios";
import "./letucre.css";

export const Letucre = () => {
    let arr = [
        { course: "Biology", lectures: ["Lecture 1", "Lecture 2", "Lecture 5"] },
        { course: "Python", lectures: ["Lecture 1", "Lecture 2"] },
        { course: "Computer Science", lectures: ["Lecture 1", "Lecture 2"] },
    ];

    let teachers = ["Lokesh", "Prakash", "Anjali", "Rahul"];

    const [selectedData, setSelectedData] = useState({});

    const handleSelectChange = (course, lecture, field, value) => {
        setSelectedData((prev) => ({
            ...prev,
            [`${course}-${lecture}`]: {
                ...prev[`${course}-${lecture}`],
                [field]: value,
            },
        }));
    };

    const handleSubmit = async (course, lectures) => {
        const submissionData = lectures.map((lecture) => ({
            lecture,
            teacher: selectedData[`${course}-${lecture}`]?.teacher || "Not Assigned",
            date: selectedData[`${course}-${lecture}`]?.date || "Not Selected",
        }));

        console.log("Submitting:", submissionData);

        try {
            const response = await axios.post("http://localhost:5000/api/schedule", { lectures: submissionData });
            console.log("Success:", response.data);
            alert("Lectures scheduled successfully!");
        } catch (error) {
            console.error("Error submitting lectures:", error);
            alert("Error scheduling lectures.");
        }
    };

    return (
        <div>
            <div className="letucre-head">
                <p>Add The Lecture And Assigned Lectures</p>
            </div>

            <div className="letucre-box">
                {arr.map((item, index) => (
                    <div key={index} className="course-card">
                        <h3 className="course-title">{item.course}</h3>
                        <ul className="lecture-list">
                            {item.lectures.map((lecture, i) => (
                                <li key={i} className="lecture-item">
                                    {lecture}
                                    <label>
                                        <input
                                            type="date"
                                            onChange={(e) =>
                                                handleSelectChange(item.course, lecture, "date", e.target.value)
                                            }
                                        />
                                        <select
                                            name={`teacher-${index}-${i}`}
                                            onChange={(e) =>
                                                handleSelectChange(item.course, lecture, "teacher", e.target.value)
                                            }
                                        >
                                            <option value="">Select Teacher</option>
                                            {teachers.map((teacher, tIndex) => (
                                                <option key={tIndex} value={teacher}>
                                                    {teacher}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                </li>
                            ))}
                        </ul>

                        <button onClick={() => handleSubmit(item.course, item.lectures)}>Submit</button>
                    </div>
                ))}
            </div>
        </div>
    );
};
