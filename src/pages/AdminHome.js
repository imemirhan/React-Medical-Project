import Navbar from "../components/Navbar"
import '../styles/AdminHome.css'
import AdminContent from "../components/AdminContent"
function AdminHome() {
    // Body Styling
    //#region 
    document.body.style.backgroundImage = 'linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%)'
    document.body.style.backgroundImage = 'linear-gradient(to top, #d9afd9 0%, #97d9e1 100%)'
    document.body.style.backgroundAttachment = 'fixed'
    document.body.style.backgroundRepeat = "no-repeat"
    document.body.style.fontFamily = "Vibur"
    document.body.style.fontFamily = "Abel"
    document.body.style.opacity = "0.95"
    //#endregion
    return(
        <>
            <Navbar visitRole="admin"/>
            <AdminContent/>
        </>
    );
};
export default AdminHome;
