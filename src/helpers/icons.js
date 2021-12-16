import { faTrash, faSignOutAlt, faEdit, faEraser, faGhost, faPlusCircle, faPhone, faEnvelope, faMapMarkerAlt, faLock } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";


const Icons = () => {
    return library.add(faTrash, faSignOutAlt,faEraser, faEdit, faGhost, faPlusCircle, faPhone, faEnvelope, faMapMarkerAlt, faLock);
};

export default Icons;