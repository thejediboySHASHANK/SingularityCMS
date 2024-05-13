import {Outlet} from "react-router-dom";

export default function Layout() {
    return (
        <div className="py-3 px-8">
            <Outlet/>
        </div>
    );
}