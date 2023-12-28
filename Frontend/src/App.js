import HomePage from "./components/homepage";
import Becomeadmin from "./components/becomeadmin";
import Adminpanel from "./components/adminpanel";
import Adminlogin from "./components/adminlogin";
import ResetAdminPassword from "./components/resetadminpassword";
import Checkpreviousadmin from "./components/checkpreviousadmin";
import Addteacher from "./components/addteacher";
import './index.css';
import { Route , Routes , Outlet , BrowserRouter} from 'react-router-dom';
import Showteachers from "./components/showteachers";
import Teacherlogin from "./components/teacherlogin";
import Addstudent from "./components/add_student";
import Showstudents from "./components/show_students";
import Teacherpanel from "./components/teacher_panel";
import Attendanceinfo from "./components/attendance_info";
import Showattendance from "./components/show_attendance";
import Editteacher from "./components/edit_teacher";
import Checkfees from "./components/check_fees";
import AcceptFees from "./components/accept_fees";
import FeesReceipt from "./components/printFeesReceipt";
import Editstudent from "./components/edit_student";
import AddPeon from "./components/add_peon";
import Homeworkmsg from "./components/homework_messages";
import Schoolloginscreen from "./components/school_login_screen";
import Paysalary from "./components/pay_salary";
import Showpeons from "./components/show_peons";
import Editpeon from "./components/edit_peon";
import Checksalaries from "./components/check_salaries";
import Exportdata from "./components/Export_Data_Here";
import Exportteacherdata from "./components/ExportTeacherData";
import Exportpeondata from "./components/ExportPeonData";
import Exportfeesdata from "./components/ExportFeesData";
import Exportattendancedata from "./components/ExportAttendanceData";
import Exportsalarydata from "./components/ExportSalaryData";
import ExportStudentdata from "./components/ExportStudentData";


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/" element={<Schoolloginscreen />} />
        <Route path ="/become_admin" element={<Becomeadmin />} /> 
        <Route path = "/admin_login" element = {<Adminlogin/>} />
        <Route path = "/admin_panel" element = {<Adminpanel />} />
        <Route path = "/previous_admins" element = {<Checkpreviousadmin />} />
        <Route path = "/reset_admin_password" element = {<ResetAdminPassword />} />
        <Route path = "/add_teacher" element = {<Addteacher />} />
        <Route path = "/show_teachers" element = {<Showteachers />} />
        <Route path = "/teacher_login" element = {<Teacherlogin />} />
        <Route path = "/add_students" element = {<Addstudent />} />
        <Route path = "/show_students" element = {<Showstudents />} />
        <Route path = "/teacher_panel" element = {<Teacherpanel />} />
        <Route path = "/take_attendance" element = {<Attendanceinfo />} />
        <Route path = "/show_attendance" element = {<Showattendance />} />
        <Route path = "/edit_teacher/:id" element = {<Editteacher />} /> 
        <Route path = "/check_fees" element = {<Checkfees />} /> 
        <Route path = "/accept_fees" element = {<AcceptFees />} /> 
        <Route path = "/print_fees" element = {<FeesReceipt />} /> 
        <Route path = "/edit_student" element = {<Editstudent />} /> 
        <Route path = "/add_peons" element = {<AddPeon />} /> 
        <Route path = "/send_hmwrk_msg" element = {<Homeworkmsg />} /> 
        <Route path = "/home_screen" element = {<HomePage />} /> 
        <Route path = "/pay_salary" element = {<Paysalary />} /> 
        <Route path = "/show_peons" element = {<Showpeons />} /> 
        <Route path = "/edit_peon" element = {<Editpeon />} /> 
        <Route path = "/check_salaries" element = {<Checksalaries />} /> 
        <Route path = "/export_data" element = {<Exportdata />} /> 
        <Route path = "/student_data_export" element = {<ExportStudentdata />} /> 
        <Route path = "/teacher_data_export" element = {<Exportteacherdata />} /> 
        <Route path = "/peon_data_export" element = {<Exportpeondata />} /> 
        <Route path = "/fees_data_export" element = {<Exportfeesdata />} /> 
        <Route path = "/attendance_data_export" element = {<Exportattendancedata />} /> 
        <Route path = "/salary_data_export" element = {<Exportsalarydata />} /> 
        
   
        
        
        
      </Routes>
      <Outlet />
    </div>
  </BrowserRouter>
)}

export default App;
