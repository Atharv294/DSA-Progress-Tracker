import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import Problems from "./pages/Problems";
import AddProblem from "./pages/AddProblem";
import EditProblem from "./pages/EditProblem";

import Notes from "./pages/Notes";
import AddNote from "./pages/AddNote";
import EditNote from "./pages/EditNote";

import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";

import "./App.css";


function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />


                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>

                            <MainLayout>

                                <Dashboard />

                            </MainLayout>

                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/problems"
                    element={
                        <ProtectedRoute>

                            <MainLayout>

                                <Problems />

                            </MainLayout>

                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/problems/add"
                    element={
                        <ProtectedRoute>

                            <MainLayout>

                                <AddProblem />

                            </MainLayout>

                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/problems/edit/:id"
                    element={
                        <ProtectedRoute>

                            <MainLayout>

                                <EditProblem />

                            </MainLayout>

                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/notes"
                    element={
                        <ProtectedRoute>

                            <MainLayout>

                                <Notes />

                            </MainLayout>

                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/notes/add"
                    element={
                        <ProtectedRoute>

                            <MainLayout>

                                <AddNote />

                            </MainLayout>

                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/notes/edit/:id"
                    element={
                        <ProtectedRoute>

                            <MainLayout>

                                <EditNote />

                            </MainLayout>

                        </ProtectedRoute>
                    }
                />
            </Routes>

        </BrowserRouter>

    );

}

export default App;