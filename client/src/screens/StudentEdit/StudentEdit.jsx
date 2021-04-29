import { useParams, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import "./StudentEdit.css"

function StudentEdit({handlePutStudent, students, handlePostComment}) {
    const [student, setStudent] = useState({})
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
        setStudentData(stud)
    }, [])

    {}

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
    
    const handleUpdate = () => {
        handlePutStudent(Number(id), studentData)
        if (comment) {
            handlePostComment(commentData)
        }
        // console.log(student_id)
        history.push(`/students/${id}`)
    }

    return (
        <div className='studentDetails'>
            <div className="clipboard-border">
                <div className="clipboard">
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
                                type='text'
                                name='grade'
                                value={grade}
                                onChange={handleStudentChange}
                            />
                        </label>
                        <label className="period-column">Period
                            <input
                                type='text'
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
                    <div className="buttons">
                        <button onClick={()=>handleUpdate()}>Update</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentEdit
