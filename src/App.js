import "./App.css";
import { PaymentForm } from "./pages/Transactions/components/PaymentForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ProviderFunction } from "./context/FormData";
import { Fragment } from "react";
import { Login } from "./pages/Authentication/Login/components/Login";
import { Register } from "./pages/Authentication/Register/components/Register";
import store from "./app/store";
import { Provider } from "react-redux";
import { ProtectedComponents } from "./pages/Auth Gard/ProtectedComponents";
import { HomePage } from "./pages/Home page/homePage";

function App() {
  return (
    // <div className="App">
    //   <BrowserRouter>
    //     <ProviderFunction>
    //       <Fragment>
    //         <Routes>
    //           <Route path="/makePayment" element={<PaymentForm />} />
    //           <Route path="/allTransaction" element={<ViewAllTable />} />
    //         </Routes>
    //       </Fragment>
    //     </ProviderFunction>
    //   </BrowserRouter>
    // </div>

    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
          <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<ProtectedComponents />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
