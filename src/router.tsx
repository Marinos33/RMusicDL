import { createBrowserRouter } from "react-router-dom";
import Playlists from "./Pages/Playlists";

export const router = createBrowserRouter([
    { 
        path: '/',
        element: <Playlists /> 
    },
]);