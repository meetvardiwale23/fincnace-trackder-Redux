import React, { useContext, useEffect, useState } from "react";
import { LogicTable } from "../LogicTable";
import { useNavigate } from "react-router-dom";
import { localStorage } from "../localstorage";
import { GlobalData } from "../../../context/FormData";
//import Nodata from "../../No Data Found/components/Nodata";

// import all the arrays
//import { months,transactionTypeArr,fromAccount } from "../../Transaction Form/components/TransacForm";

export const ViewAllTable = () => {
  const navigate = useNavigate();
  //first get the local storage data

  // use data of context
  const { getData, setData } = useContext(GlobalData);

  // console.log("get data in viewall table pages", getData);

  const storageData = localStorage;

  const [maindata, setMainData] = useState(getData);
  const [orderBy, setOrderBy] = useState([]);
  const [globalKey, setGlobalKey] = useState("");
  const [groupByTitle, setGroupByTitle] = useState();
  const [searchData, setSearchData] = useState([
    {
      searchString: "",
    },
  ]);

  const handleGroupBy = (e) => {
    let finalData = [];

    setGlobalKey(e.target.value);

    const selectedValue = e.target.value;

    const result = getData.reduce((a, b) => {
      a[b[selectedValue]] = a[b[selectedValue]] || [];
      a[b[selectedValue]].push(b);
      return a;
    }, {});
    Object.keys(result).map((groupedData, index) => {
      finalData.push(result[groupedData]);
    });

    setOrderBy(finalData);
  };

  //call the useEffect when the data got deleted and the data have to reset in the group by data
  useEffect(() => {
    let finalData = [];

    const result = getData.reduce((a, b) => {
      a[b[globalKey]] = a[b[globalKey]] || [];
      a[b[globalKey]].push(b);
      return a;
    }, {});

    Object.keys(result).map((groupedData, index) => {
      return finalData.push(result[groupedData]);
    });

    setOrderBy(finalData);
  }, [getData]);

  // handle search function
  const handlerSearch = (val) => {
    setSearchData({ ...searchData, searchString: val.target.value });
  };

  const navigateToForm = () => {
    navigate("/makePayment");
  };

  return (
    <div>
      <nav className="navbar " style={{ backgroundColor: "#e3f2fd" }}>
        <div className="container-fluid">
          <a href="#!" className="navbar-brand">
            Navbar
          </a>
          <form className="d-flex">
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                gap: "40px",
              }}
            >
              <div>
                <button
                  className="btn btn-outline-dark"
                  onClick={navigateToForm}
                >
                  Cash In
                </button>
              </div>
              <div>
                <input
                  type="text"
                  onChange={handlerSearch}
                  placeholder="search"
                  className="form-control"
                />
              </div>

              <div>
                <select onChange={handleGroupBy} className="form-control">
                  <option value="" disabled selected hidden>
                    Select Group BY
                  </option>
                  <option value="transactionDate">Transaction Date</option>
                  <option value="monthYear">Month Year</option>
                  <option value="transactionType">Transaction Type</option>
                  <option value="fromAccount">From Account</option>
                  <option value="toAccount">To Account</option>
                  <option value="amount">Amount</option>
                  <option value="notes">Notes</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </nav>

      {/* {maindata && maindata.length > 0 ? (
        <LogicTable data={maindata} search={searchData} />
      ) : orderBy && orderBy.length > 0 ? (
        orderBy.map((groupData) => (
          <LogicTable data={groupData} search={searchData} />
        ))
      ) : (
        ""
      )} */}

      {orderBy && orderBy.length > 0 ? (
        orderBy.map((groupData, index) => (
          <LogicTable key={index} data={groupData} search={searchData} />
        ))
      ) : (
        <LogicTable data={getData} search={searchData} />
      )}

      {/* <SingleTable data={maindata} />} /> */}
    </div>
  );
};
