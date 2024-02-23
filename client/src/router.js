import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
  } from "react-router-dom";

import App from './App';
import SingleView from "./components/pages/SingleView";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <App />
        ),
    },
    {
        path: "people/:id",
        element: <SingleView/>
    },
]);

export default router;