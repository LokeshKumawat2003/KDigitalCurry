import React, { useState } from "react";
import axios from "axios";
import "./course.css";

export const Course = () => {
    const [formData, setFormData] = useState({
        courseName: "",
        level: "Beginner",
        description: "",
        lectures: [""],
        image: null, 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLectureChange = (index, value) => {
        if (value.trim() === "") return; 
        const updatedLectures = [...formData.lectures];
        updatedLectures[index] = value;
        setFormData((prev) => ({
            ...prev,
            lectures: updatedLectures,
        }));
    };

    const addLecture = () => {
        setFormData((prev) => ({
            ...prev,
            lectures: [...prev.lectures, ""],
        }));
    };

    const handleImageChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            image: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.courseName || !formData.description || formData.lectures.some(l => l.trim() === "")) {
            alert("All fields are required, and lectures cannot be empty.");
            return;
        }

        const data = new FormData();
        data.append("courseName", formData.courseName);
        data.append("level", formData.level);
        data.append("description", formData.description);
        formData.lectures.forEach((lecture, index) => {
            data.append(`lectures[${index}]`, lecture);
        });
        if (formData.image) {
            data.append("image", formData.image);
        }

        console.log("FormData Values:");
        for (let pair of data.entries()) {
            console.log(pair[0], pair[1]);
        }

        try {
            const response = await axios.post("http://localhost:3000/api/course", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("Response:", response.data);
        } catch (error) {
            console.error("Error submitting form:", error.response?.data || error.message);
        }
    };

    return (
        <div>
            <p className="course-head">Add a New Course And Course Details</p>
            <div className="course-container">
                <div className="course-card1">
                    <h2 className="course-title">Add a New Course Details</h2>
                    <form onSubmit={handleSubmit} className="course-form">
                        <input
                            type="text"
                            name="courseName"
                            placeholder="Enter Course Name"
                            value={formData.courseName}
                            onChange={handleChange}
                            className="course-input"
                        />
                        <select name="level" value={formData.level} onChange={handleChange} className="course-input">
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                        <textarea
                            name="description"
                            placeholder="Enter Course Description"
                            value={formData.description}
                            onChange={handleChange}
                            className="course-textarea"
                        />
                        {formData.lectures.map((lecture, index) => (
                            <input
                                key={index}
                                type="text"
                                placeholder={`Lecture ${index + 1}`}
                                value={lecture}
                                onChange={(e) => handleLectureChange(index, e.target.value)}
                                className="lecture-input"
                            />
                        ))}
                        <input type="file" accept="image/*" onChange={handleImageChange} className="file-input" />
                        <div className="button-group">
                            <button type="button" onClick={addLecture} className="add-btn">
                                + Add Lecture
                            </button>
                            <button type="submit" className="submit-btn">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
