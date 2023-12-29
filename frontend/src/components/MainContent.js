import { useEffect, useState } from "react";

export default function MainContent({ setPushListenerAttached = () => { }, pushListenerAttached = false, userData }) {
    const [location, setLocation] = useState("");

    useEffect(() => {
        if (!pushListenerAttached) {
            //Removing to avoid duplication, in the rare case that it may occur
            document.removeEventListener("onpushstate", onNavigation);
            document.addEventListener("onpushstate", onNavigation);
            setPushListenerAttached(true);
        }
    }, [pushListenerAttached, setPushListenerAttached])

    function onNavigation(e) {
        //console.log(e.detail.url);
        setLocation(e.detail.url);
    }

    return (
        <div className="content-container">
            This page's content, location: {location}
        </div>
    );
}