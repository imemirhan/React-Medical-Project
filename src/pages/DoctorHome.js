import Navbar from "../components/Navbar";
import '../styles/DoctorHome.css'
import DoctorContent from "../components/DoctorContent";

function DoctorHome() {
    return(
        <>
        <div className="doctor-home-container">
            <Navbar visitRole="doctor"/>
        </div>
        <DoctorContent/>
        </>
    );
}
export default DoctorHome;
