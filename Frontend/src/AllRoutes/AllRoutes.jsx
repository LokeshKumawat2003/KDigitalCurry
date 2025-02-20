import React from 'react'
import { Navbar } from '../pages/navbar/Navbar'
import { Instructor } from '../pages/instructor/Instructor'
import { Route, Routes } from 'react-router-dom'
import { Letucre } from '../pages/letcure/Letucre'
import { Course } from '../pages/course/Course'
import { LoginPage } from '../Login/LoginPage'
import { SignupPage } from '../SignupPage/SignupPage'
import CourseList from '../InstructorPanel/InstructorPanel'

export const AllRoutes = () => {
  return (
    <div>

      <Navbar />
      <Routes>
        <Route path="/instructor" element={<Instructor />} />
        <Route path="/letucre" element={<Letucre />} />
        <Route path="/course" element={<Course />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/courseList" element={<CourseList />} />
      </Routes></div>
  )
}
