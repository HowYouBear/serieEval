import styles from "./Administration.module.scss"
import { NavLink, Outlet } from "react-router-dom";

export default function administration () {
    return(
        <div className={styles.wrapper}>
            <nav>
                <ul>
                    <NavLink to="/administration/addSerie" className={`mr10 tdn `}>
                        <li>Add a TV serie</li>
                    </NavLink>
                    <NavLink to="/administration/updateSerie" className={`mr10 tdn `}>
                        <li>Update serie</li>
                    </NavLink>
                </ul>
            </nav>
            <div className={styles.content}>
                <Outlet/>
            </div>
        </div>
    )
}