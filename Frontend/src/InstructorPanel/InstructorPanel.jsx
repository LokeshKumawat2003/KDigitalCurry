import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const InstructorPanel = () => {
    const [lectures, setLectures] = useState([]);

    useEffect(() => {
        // Simulating API call to fetch assigned lectures
        const fetchLectures = async () => {
            try {
                const response = await fetch("/api/instructor/lectures"); // Replace with actual API
                const data = await response.json();
                setLectures(data);
            } catch (error) {
                console.error("Error fetching lectures:", error);
            }
        };
        fetchLectures();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Instructor Panel</h1>
            <Card>
                <CardContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className="font-bold">Course Name</TableCell>
                                <TableCell className="font-bold">Scheduled Dates</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {lectures.length > 0 ? (
                                lectures.map((lecture, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{lecture.courseName}</TableCell>
                                        <TableCell>{lecture.scheduledDate}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan="2" className="text-center">No lectures assigned</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default InstructorPanel;
