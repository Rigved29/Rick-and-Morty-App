import { Routes, Route, Navigate } from "react-router-dom";
import AllCharacters from "./pages/AllCharacters";
import Character from "./pages/Character";


const RoutesComp = () => {

    // All the routes defined here using Routes and Route

    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate replace to="/characters" />} />
                <Route
                    element={<AllCharacters />}
                    path="characters"
                />
                <Route
                    element={<Character />}
                    path="character/:id"
                />
            </Routes>
        </>
    )

}


export default RoutesComp;