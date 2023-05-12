import { useForm } from "react-hook-form";
import React, { useEffect, useState, useContext } from "react";
import {
  monthYearOptions,
  allAccountsOptions,
  transactionTypeOptions,
} from "../../../utils/ConstantValues";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { GlobalData } from "../../../context/FormData";
import { useLocation, useNavigate } from "react-router-dom";
const schema = yup.object().shape({
  date: yup.string().required("Transaction Date is required"),
  monthYear: yup.string().required("Month Year is required"),
  transactionType: yup.string().required("Transaction type is required"),
  fromAccount: yup.string().required("From Account is required"),
  toAccount: yup
    .string()
    .notOneOf(
      [yup.ref("fromAccount")],
      "From Account should not match with to account"
    )
    .required("To Account is required"),
  amount: yup
    .number()
    .min(5, "The amount should be alteast greater then 5")
    .required("Amount is required"),
  notes: yup
    .string()
    .max(240, "The length of your note must be less then 240")
    .required("Notes is required"),
});

export const PaymentForm = () => {
  //get state id for the edit
  const { state } = useLocation();

  const navigate = useNavigate();

  const [fomrValues, setFormValues] = useState({
    id: "",
    transactionDate: "",
    monthYear: "",
    transactionType: "",
    fromAccount: "",
    toAccount: "",
    amount: "",
    receipt: "",
    notes: "",
  });
  const { getData, setData } = useContext(GlobalData);

  // code to checkt the id
  // const newData = [
  //   { id: 1, name: "meet" },
  //   { id: 2, name: "tushar" },
  //   { id: 3, name: "naresh" },
  // ];
  // setData([...getData, newData]);

  //set id
  // useEffect(() => {
  //   const newId = new Date().getTime();

  //   setFormValues((formData) => ({
  //     ...formData,
  //     id: newId,
  //   }));

  // }, []);

  const values = fomrValues;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ values, resolver: yupResolver(schema) });

  //handle base 64 image
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleChange = async (e) => {
    const getFile = e.target.files[0];
    const base64 = await convertBase64(getFile);

    setFormValues({ ...fomrValues, receipt: base64 });
  };

  //handle registration sumit data
  const handleRegistration = (data) => {
    let newObject = { ...fomrValues, ...data };

    if (state) {
      alert("we will edit this");
      const getIndex = getData.findIndex((index) => {
        return index.id === state;
      });

      getData[getIndex] = newObject;

      setData([...getData]);
      navigate("/allTransaction");
      return;
    }

    newObject["id"] = new Date().getTime();

    setData([...getData, newObject]);
    navigate("/allTransaction");
  };

  // handle the edit the data
  const handleEdit = (id) => {
    // find the array from the globa context data and paste into the form
    const editData = getData.find((data) => {
      return data.id === state;
    });

    setFormValues({ ...editData });
  };

  useEffect(() => {
    handleEdit(state);
  }, [state]);

  // navigate to transactions
  const viewTransaction = () => {
    navigate("/allTransaction");
  };

  // naivigate to transaction form
  const viewTransactionForm = () => {
    navigate("/makePayment");
  };
  return (
    <div>
      <nav className="navbar" style={{ backgroundColor: "#e3f2fd" }}>
        <div className="container-fluid">
          <a className="navbar-brand">Navbar</a>
          <form className="d-flex">
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                gap: "40px",
              }}
            >
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={viewTransactionForm}
              >
                Cash In
              </button>

              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={viewTransaction}
              >
                View Transactions
              </button>
            </div>
          </form>
        </div>
      </nav>

      <div
        classNameName="Paymentform"
        style={{
          width: "500px",
          marginTop: "3%",
          justifyContent: "center",
          margin: "auto",
          border: "1px",
          borderRadius: "20px",
          marginBottom: "3%",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
        }}
      >
        <div>
          <h1>Make Payment</h1>
        </div>
        <form onSubmit={handleSubmit(handleRegistration)}>
          <div className="mb-4">
            <label for="exampleInputEmail1" className="form-label">
              Transaction Date
            </label>
            <input
              type="date"
              name="date"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              {...register("date")}
            />
            <p style={{ color: "red" }}>{errors.date?.message}</p>
          </div>

          <div className="mb-4">
            <label for="exampleInputEmail1" className="form-label">
              Month Year
            </label>
            <select
              name="monthYear"
              {...register("monthYear")}
              className="form-control"
              // value={fomrValues.monthYear}
            >
              <option value="" selected disabled hidden>
                Select Month Year
              </option>
              {monthYearOptions.map((items, index) => (
                <option key={index} value={items}>
                  {items}
                </option>
              ))}
            </select>
            <p style={{ color: "red" }}>{errors.monthYear?.message}</p>
          </div>

          <div className="mb-4">
            <label for="exampleInputEmail1" className="form-label">
              Transaction Type
            </label>
            <select
              name="transactionType"
              {...register("transactionType")}
              className="form-control"
              // value={fomrValues.transactionType}
            >
              <option value="" selected disabled hidden>
                Select Transaction Type
              </option>
              {transactionTypeOptions.map((items, index) => (
                <option key={index} value={items}>
                  {items}
                </option>
              ))}
            </select>
            <p style={{ color: "red" }}>{errors.transactionType?.message}</p>
          </div>

          <div className="mb-4">
            <label for="exampleInputEmail1" className="form-label">
              From Account
            </label>
            <select
              name="fromAccount"
              {...register("fromAccount")}
              className="form-control"
              // value={fomrValues.fromAccount}
            >
              <option value="" selected disabled hidden>
                Select From Account
              </option>
              {allAccountsOptions.map((items, index) => (
                <option key={index} value={items}>
                  {items}
                </option>
              ))}
            </select>
            <p style={{ color: "red" }}>{errors.fromAccount?.message}</p>
          </div>

          <div className="mb-4">
            <label for="exampleInputEmail1" className="form-label">
              To Account
            </label>
            <select
              name="toAccount"
              {...register("toAccount")}
              className="form-control"
              // value={fomrValues.toAccount}
            >
              <option value="" selected disabled hidden>
                Select To Account
              </option>
              {allAccountsOptions.map((items, index) => (
                <option key={index} value={items}>
                  {items}
                </option>
              ))}
            </select>
            <p style={{ color: "red" }}>{errors.toAccount?.message}</p>
          </div>

          <div className="mb-4">
            <label for="exampleInputEmail1" className="form-label">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              className="form-control"
              id="amount"
              aria-describedby="emailHelp"
              // value={fomrValues.amount}
              {...register("amount")}
            />
            <p style={{ color: "red" }}>{errors.amount?.message}</p>
          </div>

          <div className="mb-4">
            <label for="exampleInputEmail1" className="form-label">
              Recepit
            </label>

            <input
              type="file"
              name="recepit"
              className="form-control"
              id="file"
              onChange={(e) => handleChange(e)}
              aria-describedby="emailHelp"
            />
            <img
              src={fomrValues.receipt}
              alt="receipt"
              style={{ height: "100px", width: "100px" }}
            ></img>
          </div>

          <div className="mb-4">
            <label for="exampleInputEmail1" className="form-label">
              Notes
            </label>
            <input
              type="text"
              name="notes"
              className="form-control"
              id="notes"
              aria-describedby="emailHelp"
              // value={fomrValues.notes}
              {...register("notes")}
            />
            <p style={{ color: "red" }}>{errors.notes?.message}</p>
          </div>

          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
};
