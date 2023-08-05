import React, { useState } from "react";
import SidebarforAdmin from "./SidebarforAdmin";
import HeaderAdmin from "./HeaderAdmin";
import { Link } from "react-router-dom";
import img from "../../assets/images/screen.png";
import { useEffect } from "react";
import AdminService from "../../services/AdminService";
import ReactApexChart from "react-apexcharts";
function AdminDashboard() {
  const [registernumber, setRegisterNumber] = useState();
  const [classnumber, setClassNumber] = useState();
  const [studySetnumber, setStudySetNumber] = useState();
  const [accessNumber, setAccessNumber] = useState();
  const [userGrowth, setUserGrowth] = useState();
  const [studySetGrowth, setStudySetGrowth] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const temp = (await AdminService.getRegisterNumber()).data;
        setRegisterNumber(temp);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };
    fetchData();

    const fetchDataClass = async () => {
      try {
        const temp = (await AdminService.getClassNumber()).data;
        setClassNumber(temp);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };
    fetchDataClass();

    const fetchDataStudySet = async () => {
      try {
        const temp = (await AdminService.getStudySetNumber()).data;
        setStudySetNumber(temp);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };
    fetchDataStudySet();

    const fetchDataAccess = async () => {
      try {
        const temp = (await AdminService.getAccessNumber()).data;
        setAccessNumber(temp);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };
    fetchDataAccess();

    const fetchDataUserGrowth = async () => {
      try {
        const temp = (await AdminService.getUserGrowth()).data;
        setUserGrowth(temp);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };
    fetchDataUserGrowth();

    const fetchDataStudySetGrowth = async () => {
      try {
        const temp = (await AdminService.getStudySetGrowth()).data;
        setStudySetGrowth(temp);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };
    fetchDataStudySetGrowth();
  }, []);

  const week = [
    "Week 1",
    "Week 2",
    "Week 3",
    "Week 4",
    "Week 5",
    "Week 6",
    "Week 7",
    "Week 8",
    "Week 9",
    "Week 10",
    "Week 11",
    "Week 12",
  ];

  const options = {
    chart: {
      id: "barchart",
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        columnWidth: "75%",
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      width: 2,
    },

    grid: {
      row: {
        colors: ["#fff", "#f2f2f2"],
      },
    },
    xaxis: {
      categories: week,
      tickPlacement: "on",
    },
    yaxis: {
      title: {
        text: "Person",
      },
      labels: {
        formatter: function (val) {
          return val.toFixed(0);
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "horizontal",
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 0.85,
        opacityTo: 0.85,
        stops: [50, 0, 100],
      },
    },
  };

  const series = [
    {
      name: "Person",
      data: userGrowth,
    },
  ];

  const optionLine = {
    chart: {
      id: "chartline",
    },
    stroke: {
      width: 5,
      curve: "smooth",
    },
    xaxis: {
      categories: week,
    },
    title: {
      text: "Study Set",
      align: "left",
      style: {
        fontSize: "16px",
        color: "#666",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        gradientToColors: ["#FDD835"],
        shadeIntensity: 1,
        type: "horizontal",
        opacityFrom: 1,
        opacityTo: 1,
        stops: [50, 100, 50, 100],
      },
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val.toFixed(0);
        },
      },
    },
  };

  const seriesLine = [
    {
      name: "Studyset",
      data: studySetGrowth,
    },
  ];

  return (
    <div className="container-fluid bg-white">
      <div className="row">
        <SidebarforAdmin />
        <div className="col-sm-10 col-lg-10 col-md-10">
          <HeaderAdmin />
          <div className="container">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
              <Link
                to="/"
                className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
              >
                <i className="bi bi-download text-white"></i> Generate Report
              </Link>
            </div>
            <div className="row">
              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left border-primary bg-primary shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="fw-bold text-white text-uppercase mb-1">
                          Access Number (Monthly)
                        </div>
                        <div className="h5 mb-0 fw-bold text-white">
                          {accessNumber}
                        </div>
                      </div>
                      <div className="col-auto">
                        <i class="bi bi-people fs-2 text-white"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left border-success bg-success shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-white text-uppercase mb-1">
                          Register (Monthly)
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-white">
                          {registernumber}
                        </div>
                      </div>
                      <div className="col-auto">
                        <i class="bi bi-person-plus fs-2 text-white"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left border-danger bg-danger shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-white text-uppercase mb-1">
                          Classes created (Monthly)
                        </div>
                        <div className="row no-gutters align-items-center">
                          <div className="col-auto">
                            <div className="h5 mb-0 mr-3 font-weight-bold text-white">
                              {classnumber}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="bi bi-person-workspace fs-2 text-white"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left border-warning bg-warning shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-white text-uppercase mb-1">
                          Sets created (Monthly)
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-white">
                          {studySetnumber}
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="bi bi-file-earmark-text fs-2 text-white"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {/*   <!-- Area Chart --> */}
            <div className="col-xl-6 col-lg-6">
              <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 fw-bold text-uppercase text-primary">
                    User growth over the last 3 months
                  </h6>
                </div>
                <div className="card-body">
                  <ReactApexChart
                    options={options}
                    series={series}
                    type="bar"
                    height={350}
                  />
                </div>
              </div>
            </div>

            {/*  <!-- Pie Chart --> */}
            <div className="col-xl-6 col-lg-6">
              <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 font-weight-bold text-secondary text-uppercase">
                    Sets created by users over the last 3 months
                  </h6>
                </div>
                {/*  <!-- Card Body --> */}
                <div className="card-body">
                  <ReactApexChart
                    options={optionLine}
                    series={seriesLine}
                    type="line"
                    height={350}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {/*   <!-- Content Column --> */}
            <div className="col-lg-6 mb-4">
              {/* <!-- Project Card Example --> */}
              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">
                    System
                  </h6>
                </div>
                <div className="card-body">
                  <h4 className="small font-weight-bold">
                    Server Migration <span className="float-right">20%</span>
                  </h4>
                  <div className="progress mb-4">
                    <div
                      className="progress-bar bg-danger"
                      role="progressbar"
                      style={{ width: "20%" }}
                      aria-valuenow="20"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <h4 className="small font-weight-bold">
                    User Tracking <span className="float-right">40%</span>
                  </h4>
                  <div className="progress mb-4">
                    <div
                      className="progress-bar bg-warning"
                      role="progressbar"
                      style={{ width: "40%" }}
                      aria-valuenow="40"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <h4 className="small font-weight-bold">
                    User Database <span className="float-right">60%</span>
                  </h4>
                  <div className="progress mb-4">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "60%" }}
                      aria-valuenow="60"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <h4 className="small font-weight-bold">
                    User Details <span className="float-right">80%</span>
                  </h4>
                  <div className="progress mb-4">
                    <div
                      className="progress-bar bg-info"
                      role="progressbar"
                      style={{ width: "80%" }}
                      aria-valuenow="80"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <h4 className="small font-weight-bold">
                    Account Setup <span className="float-right">Complete!</span>
                  </h4>
                  <div className="progress">
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{ width: "100%" }}
                      aria-valuenow="100"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 mb-4">
              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">
                    Illustrations
                  </h6>
                </div>
                <div className="card-body">
                  <div className="text-center">
                    <img
                      className="img-fluid px-3 px-sm-4 mt-3 mb-4 a6"
                      src={img}
                      alt="..."
                    />
                  </div>
                  <p>
                    In the future, the Nihongo Level Up development team will
                    release more new features for users to help people have a
                    better experience when using our website. Hope to work with
                    you all.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
