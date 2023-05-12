import "./App.css";
import { PaymentForm } from "./pages/Transactions/components/PaymentForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ViewAllTable } from "./pages/View-All-Transactions/components/ViewAllTable";
import { ProviderFunction } from "./context/FormData";
import { Fragment } from "react";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ProviderFunction>
          <Fragment>
            <Routes>
              <Route path="/makePayment" element={<PaymentForm />} />
              <Route path="/allTransaction" element={<ViewAllTable />} />
            </Routes>
          </Fragment>
        </ProviderFunction>
      </BrowserRouter>
    </div>
  );
}

export default App;
