import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NoData from "./NoData";

export default function List() {
  const [customers, setcustomers] = useState([]);

  useEffect(() => {
    fetchcustomers();
  }, []);

  const fetchcustomers = async () => {
    await axios.get(`http://127.0.0.1:8000/api/customers`).then(({ data }) => {
      setcustomers(data);
    });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12">
          <Link className="btn btn-success mb-2 float-end" to={"/create"}>
            Create Customer
          </Link>
        </div>
        <div className="col-8">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Registered customers</h4>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-bordered mb-0">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Gender</th>
                      <th className="text-center">Age</th>
                      <th>Date registered</th>
                      <th className="text-center">Photo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.length > 0 ? (
                      customers.map((cst, key) => (
                        <tr key={key}>
                          <td>
                            {cst.firstname} {cst.lastname}
                          </td>
                          <td>{cst.gender}</td>
                          <td align="center">{cst.age}</td>
                          <td>{cst.created}</td>
                          <td align="center">
                            <img
                              width="60px"
                              src={`http://127.0.0.1:8000/${cst.photo}`}
                              alt=""
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <NoData span="5" />
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
