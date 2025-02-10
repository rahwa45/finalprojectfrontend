import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import "./components/App.css";
import CashierStatus from "./components/CashierStatus";
import DrugTable from "./components/DrugTable";
import DeleteDrug from "./components/DeleteDrug";
import Dashboard from "./pages/Dashboard";
import PrescriptionTable from "./components/PrescriptionTable";
import AddDrugForm from "./components/AddDrugForm";
import UpdateDrug from "./components/UpdateDrug";
import AddPrescription from "./components/AddPrescription";
import UpdatePrescriptionForm from "./components/UpdatePrescriptionForm";
import DeletePrescription from "./components/DeletePrescription";
import LandingPage from "./components/LandingPage";
import About from "./components/About";
import Footer from "./components/Footer";
import Demo from "./components/Demo";
import "./App.css";
import Search from "./components/Search";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify" element={<VerifyEmail />} />
          <Route path="/cashier" element={<CashierStatus />} />

          <Route path="/drugs" element={<DrugTable />} />

          <Route path="/drugs/add" element={<AddDrugForm />} />
          <Route path="/drugs/update/:id" element={<UpdateDrug />} />

          <Route path="/drugs/delete/:id" element={<DeleteDrug />} />
          <Route path="/prescriptions" element={<PrescriptionTable />} />
          <Route path="/prescriptions/add" element={<AddPrescription />} />
          <Route
            path="/prescriptions/update/:id"
            element={<UpdatePrescriptionForm />}
          />
          <Route
            path="/prescriptions/delete/:id"
            element={<DeletePrescription />}
          />
          <Route path="/" element={<LandingPage />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
