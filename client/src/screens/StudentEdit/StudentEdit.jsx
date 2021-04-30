import { useParams, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import "./StudentEdit.css"

function StudentEdit({ handlePutStudent, students, handlePostComment, updateStudent, fetchStudents }) {
    // const [student, setStudent] = useState({})
    const params = useParams()
    const { id } = params
    const history = useHistory()
    const [studentData, setStudentData] = useState({
        firstName: '',
        lastName: '',
        grade: '',
        period: ''
    })
    const [commentData, setCommentData] = useState({
        student_id: Number(id),
        comment: ''
    })
    const { firstName, lastName, grade, period } = studentData
    const { comment, student_id } = commentData

    // useEffect(() => {
    //     console.log(id)
    //     const stud = students.find(student => student.id === Number(id))
    //     setStudent(stud)
    //     fetchComments(Number(id))
    // }, [])

    useEffect(() => {
        if (students.length === 0) {
            history.push('/students')
        }
        const stud = students.find(student => student.id === Number(id))
        setStudentData({
            firstName: stud.firstName,
            lastName: stud.lastName,
            grade: stud.grade,
            period: stud.period
        })
    }, [])

    { }

    const handleStudentChange = (e) => {
        const { name, value } = e.target
        setStudentData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleCommentChange = (e) => {
        const { name, value } = e.target
        setCommentData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        // updateStudent(students, studentData, Number(id))
        fetchStudents()
        await handlePutStudent(Number(id), studentData)
        if (comment) {
            handlePostComment(commentData)
        }
        // console.log(student_id)
        history.push(`/students/${id}`)
    }

    return (
        <div className='studentDetails'>
            <div className="clipboard-border">
                <form className="clipboard" onSubmit={handleUpdate} >
                    <div className="student-info">
                        <label className="firstName-column">First name
                            <input
                                type='text'
                                name='firstName'
                                value={firstName}
                                onChange={handleStudentChange}
                            />
                        </label>
                        <label className="lastName-column">Last name
                            <input
                                type='text'
                                name='lastName'
                                value={lastName}
                                onChange={handleStudentChange}
                            />
                        </label>
                        <label className="grade-column">Grade
                            <input
                                type='number'
                                name='grade'
                                value={grade}
                                onChange={handleStudentChange}
                            />
                        </label>
                        <label className="period-column">Period
                            <input
                                type='number'
                                name='period'
                                value={period}
                                onChange={handleStudentChange}
                            />
                        </label>
                    </div>
                    <div className="student-comments">New comment
                        <textarea
                            type='text'
                            name='comment'
                            value={comment}
                            onChange={handleCommentChange}
                        />
                    </div>
                    <input className="button" type="submit" value='Update' />
                </form>
            </div>
        </div>
    )
}

export default StudentEdit
