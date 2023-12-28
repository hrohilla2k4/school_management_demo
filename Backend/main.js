const exp = require('express');
const cor = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');




const port = 8181;



const app = exp();
// app.use(cor());
app.use(cor({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Use an array of allowed methods
    // Add other CORS options if needed
}));
app.listen(port);
app.use(exp.json());

app.use(bodyParser.json());


const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'schoolsoftware'
});

conn.connect((err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Connection success");
    }
});

app.post('/become_admin', (req, res) => {
    const insertDataQuery = "insert into admincredentials (`admin_name`, `admin_designation`, `admin_email`, `admin_phone`,`admin_password`,`schoolId`,`schoolPassword`) values(?);";
    const gotData = [
        req.body.adminName,
        req.body.adminDesignation,
        req.body.adminEmail,
        req.body.adminPhone,
        req.body.adminPassword,
        req.body.schoolId,
        req.body.schoolPassword

    ]
    conn.query(insertDataQuery, [gotData], (err, data) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(data)
        }
    })
});

app.get('/admin_login', (req, res) => {
    const getQuery = "select * from admincredentials;";
    conn.query(getQuery, (err, data) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json(data);
        }

    })
})

app.get('/users', (req, res) => {
    const getQuery = "select * from admincredentials;";
    conn.query(getQuery, (err, data) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json(data);
        }

    })
});

app.put('/reset_admin_password', (req, res) => {
    const updateQuery = "update admincredentials set `admin_password` = ? WHERE `admin_phone` = ?;";
    conn.query(updateQuery, [req.body.password, req.body.adminPhone], (err, result) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(result);
        }
    })
})

app.post('/add_teacher', (req, res) => {
    const insertDataQuery = "insert into teacher_credentials (`teacher_name`, `teacher_age`, `teacher_phone`, `teacher_mail`, `teacher_password`,`teacher_salary`,`schoolId`) values(?);";
    const gotData = [
        req.body.teacherName,
        req.body.teacherAge,
        req.body.teacherPhone,
        req.body.teacherMail,
        req.body.teacherPassword,
        req.body.teacherSalary,
        req.body.schoolId
    ]
    conn.query(insertDataQuery, [gotData], (err, data) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(data)
        }
    })
});

app.get('/show_teachers', (req, res) => {
    const getQuery = 'select * from teacher_credentials ORDER BY teacher_id ASC;';
    conn.query(getQuery, (err, data) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(data)
        }
    })
})

app.get('/teacher_login', (req, res) => {
    const getQuery = 'select * from teacher_credentials;';
    conn.query(getQuery, [req.body.teacher_phone, req.body.teacher_password], (err, data) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(data)
        }
    })
})

app.post('/add_student', (req, res) => {
    const insertStudents = "insert into student_credentials (`class`,`sname`,`sfname`,`smname`,`srollno`,`saddress`,`sfeesamt`,`sfphone`,`smphone`,`sSection`,`schoolId`) values(?);"
    const retreivedData = [
        req.body.studentClass,
        req.body.studentName,
        req.body.studentFName,
        req.body.studentMName,
        req.body.studentRollno,
        req.body.studentAddress,
        req.body.studentFeesAmt,
        req.body.studentFPhone,
        req.body.studentMPhone,
        req.body.studentSection,
        req.body.schoolId

    ]
    conn.query(insertStudents, [retreivedData], (err, data) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(data);
        }
    })
})

app.get('/show_students', (req, res) => {
    const getQuery = 'select * from student_credentials ORDER BY srollno ASC;';
    conn.query(getQuery, (err, data) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(data)
        }
    })
})

app.get('/attendance_info', (req, res) => {
    const getQuery = "select DISTINCT sSection , schoolId from student_credentials;";
    conn.query(getQuery, (err, result) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(result);
        }
    })
})




app.get('/attendance_mark_data', (req, res) => {
    const getQuery = "select srollno,class,sSection,schoolId from student_credentials ORDER BY srollno ASC;";
    conn.query(getQuery, (err, data) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json(data);
        }
    })
})


app.post('/attendance_data_send', (req, res) => {
    const postQuery = "insert into student_attendance (`roll_no`,`status`,`section`,`currentDate`,`class`,`schoolId`) values(?)";
    const dataGot = [
        req.body.studentRollno,
        req.body.attendanceStatus,
        req.body.section,
        req.body.date,
        req.body.studentClass,
        req.body.schoolId
    ]
    conn.query(postQuery, [dataGot], (err, result) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(result);
        }
    })
});

app.get('/get_attendance', (req, res) => {
    const getQuery = 'select * from student_attendance ORDER BY roll_no ASC;';
    conn.query(getQuery, (err, data) => {
        if (err) {
            res.json(err)
        }
        else[
            res.json(data)
        ]
    })
})



app.get('/edit_teacher/:teacher_id', (req, res) => {
    const teacher_id = req.params.teacher_id;
    const getQuery = 'select * from teacher_credentials where `teacher_id` = ?'
    conn.query(getQuery, [teacher_id], (err, data) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(data)
        }
    })
})

app.put('/edited_teacher', (req, res) => {

    const putQuery = 'update teacher_credentials set `teacher_name`=?, `teacher_age`=?, `teacher_phone`=?, `teacher_mail`=?,  `teacher_password`=?, `teacher_salary`=? where `teacher_id` = ?;';
    const updatedTeacherData = req.body;

    conn.query(putQuery, [
        updatedTeacherData.teacher_name,
        updatedTeacherData.teacher_age,
        updatedTeacherData.teacher_phone,
        updatedTeacherData.teacher_mail,
        updatedTeacherData.teacher_password,
        updatedTeacherData.teacher_salary,
        updatedTeacherData.teacher_id
    ],


        (err, data) => {
            if (err) {
                res.status(500).json({ error: err.message }); // Send an error response
            } else {
                // Send a success response with the updated data
                res.status(200).json({ message: 'Teacher data updated successfully', updatedData: updatedTeacherData });
            }
        });
});

app.post('/accept_fees', (req, res) => {
    const postQuery = "insert into students_fees (`month`,`class`,`status`,`rollno`,`section`,`year`,`schoolId`) values(?)";
    const dataGot = [
        req.body.month,
        req.body.studentClass,
        req.body.feesStatus,
        req.body.studentRollno,
        req.body.section,
        req.body.year,
        req.body.schoolId
    ]
    conn.query(postQuery, [dataGot], (err, result) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(result);
        }
    })
});

app.get('/check_fees', (req, res) => {
    const getQuery = 'select * from students_fees;';
    conn.query(getQuery, (err, data) => {
        if (err) {
            res.json(err.message);
        }
        else {
            res.json(data);
        }
    })
});
app.delete('/check_fees/:rollno/:month/:year/:section/:studentClass', (req, res) => {
    const { rollno, month, year, section, studentClass } = req.params;

    // Adjust the SQL query to include these parameters for verification
    const sql = 'DELETE FROM students_fees WHERE `rollno` = ? AND `month` = ? AND `year` = ? AND `section` = ? AND `class` = ?;';

    conn.query(sql, [rollno, month, year, section, studentClass], (err, result) => {
        if (err) {
            console.error(err);
            res.json(err);
        } else {
            res.status(200).json({ message: 'Record deleted successfully' });
        }
    });
});

app.delete('/attendance_info/:rollno/:date/:section/:studentClass/:schoolId', (req, res) => {
    const { rollno, date, section, studentClass, schoolId } = req.params;

    // Adjust the SQL query to include these parameters for verification
    const sql = 'DELETE FROM student_attendance WHERE `roll_no` = ? AND `currentDate` = ? AND `section` = ? AND `class` = ? AND `schoolId` = ?;';

    conn.query(sql, [rollno, date, section, studentClass, schoolId], (err, result) => {
        if (err) {
            console.error(err);
            res.json(err);
        } else {
            res.status(200).json({ message: 'Record deleted successfully' });
        }
    });
});

app.get('/edit_student/:student_class/:student_rollno/:student_section', (req, res) => {
    const student_class = req.params.studentClass;
    const student_rollno = req.params.studentRollno;
    const student_section = req.params.studentSection;
    const getQuery = 'select * from student_credentials'
    conn.query(getQuery, [student_class, student_rollno, student_section], (err, data) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(data)
        }
    })
});

app.put('/edit_student', (req, res) => {
    const editQuery = 'UPDATE student_credentials SET `class`=?, `sname`=?, `sfname`=?, `smname`=?, `srollno`=?, `saddress`=?, `sfeesamt`=?, `sfphone`=?, `smphone`=?, `sSection`=? WHERE `sid`=?';

    const updatedStudentData = req.body;

    conn.query(editQuery, [
        updatedStudentData.class,
        updatedStudentData.sname,
        updatedStudentData.sfname,
        updatedStudentData.smname,
        updatedStudentData.srollno,
        updatedStudentData.saddress,
        updatedStudentData.sfeesamt,
        updatedStudentData.sfphone,
        updatedStudentData.smphone,
        updatedStudentData.sSection,
        updatedStudentData.sid // Match the sid in the WHERE clause

    ], (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            console.log(data);
            console.log("Update success");
            res.status(200).json({ message: 'Update success' });
        }
    });
});


app.delete('/delete_student/:sclass/:section/:rollno', (req, res) => {

    const { rollno, section, sclass } = req.params;
    const delQuery = 'delete from student_credentials where `class` = ? and `sSection` = ? and `srollno`=?;';

    conn.query(delQuery, [sclass, section, rollno], (err, data) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(data)
        }
    })
});

app.delete('/delete_teacher/:teacher_id', (req, res) => {

    const { teacher_id } = req.params;
    const delQuery = 'delete from teacher_credentials where teacher_id = ?;';

    conn.query(delQuery, [teacher_id], (err, data) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(data)
        }
    })
});

app.post('/add_peon', (req, res) => {
    const insertPeons = "insert into peons_credentials (`peon_name`,`peon_phoneno`,`peon_salary`,`peon_address`,`peon_designation`,`peon_age`,`schoolId`,`schoolPassword`) values(?);"
    const retreivedData = [
        req.body.peonName,
        req.body.peonPhone,
        req.body.peonSalary,
        req.body.peonAddress,
        req.body.peonDesignation,
        req.body.peonAge,
        req.body.schoolId,
        req.body.schoolPassword

    ]
    conn.query(insertPeons, [retreivedData], (err, data) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(data);
        }
    })
});



app.get('/school_login', (req, res) => {
    const getQuery = 'select * from schoolcredentials;';
    conn.query(getQuery, (err, data) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(data)
        }
    })
})

app.post('/teacher_salary_credentials',(req,res)=>{
    const postQuery = 'insert into teacher_salary_credentials (`teacherName`,`teacherId`,`Month`,`Year`,`status`,`schoolId`) values (?);';
    const gotData = [
        req.body.teacher_name,
        req.body.teacher_id,
        req.body.month,
        req.body.year,
        req.body.salaryStatus,
        req.body.schoolId
        
    ]
    conn.query(postQuery,[gotData],(err,result)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json(result)
        }
    })
})

app.get('/show_peons', (req, res) => {
    const getQuery = 'select * from peons_credentials ORDER BY peon_id ASC;';
    conn.query(getQuery, (err, data) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(data)
        }
    })
});


app.put('/edited_peon', (req, res) => {

    const putQuery = 'update peons_credentials set `peon_name`=?, `peon_age`=?, `peon_phoneno`=?, `peon_salary`=?,  `peon_designation`=? , `peon_address`=? where `peon_id` = ?;';
    const updatedPeonData = req.body;

    conn.query(putQuery, [
        updatedPeonData.peon_name,
        updatedPeonData.peon_age,
        updatedPeonData.peon_phoneno,
        updatedPeonData.peon_salary,
        updatedPeonData.peon_designation,
        updatedPeonData.peon_address,
        updatedPeonData.peon_id
    ],


        (err, data) => {
            if (err) {
                res.status(500).json({ error: err.message }); // Send an error response
            } else {
                // Send a success response with the updated data
                res.status(200).json({ message: 'Peon data updated successfully', updatedData: updatedPeonData });
            }
        });
});

app.get('/edit_peon/:peon_id', (req, res) => {
    const peon_id = req.params.peon_id;
    const getQuery = 'select * from peons_credentials where `peon_id` = ?'
    conn.query(getQuery, [peon_id], (err, data) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(data)
        }
    })
})

app.post('/peon_salary_credentials',(req,res)=>{
    const postQuery = 'insert into peon_salary_credentials (`peonName`,`peonId`,`Month`,`Year`,`status`,`schoolId`) values (?);';
    const gotData = [
        req.body.peon_name,
        req.body.peon_id,
        req.body.month,
        req.body.year,
        req.body.salaryStatus,
        req.body.schoolId
        
    ]
    conn.query(postQuery,[gotData],(err,result)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json(result)
        }
    })
})

app.get('/teacher_salary_data',(req,res)=>{
    const getQuery = 'select * from teacher_salary_credentials;';
    conn.query(getQuery,(err,data)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json(data)
        }
    })
})

app.get('/peon_salary_data',(req,res)=>{
    const getQuery = 'select * from peon_salary_credentials;';
    conn.query(getQuery,(err,data)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json(data)
        }
    })
})

app.delete('/delete_peon/:peon_id', (req, res) => {

    const { peon_id } = req.params;
    const delQuery = 'delete from peons_credentials where `peon_id` = ?;';

    conn.query(delQuery, [peon_id], (err, data) => {
        if (err) {
           res.json(err)
        }
        else {
           res.json(data)
        }
    })
});





