import StudentSubject from "../model/StudentSubject"

export const getStudentSubjectById = async (id : string, semester : string) => {
    try{
        const studentSubjects = await StudentSubject
            .find({ student_id: id, semester: semester})
            .populate({
                path: "instructor",
                populate: {
                    path: "department", 
                    model: "Department"
                }
            })
            .populate("subject")

        return studentSubjects

    }catch(err : any){
        throw new Error(err.message)
    }
}