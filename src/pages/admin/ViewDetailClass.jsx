import React, { useState, useEffect } from "react";
import SidebarforAdmin from "./SidebarforAdmin";
import HeaderAdmin from "./HeaderAdmin";
import { Link, useParams } from "react-router-dom";
import ClassService from "../../services/ClassService";
import ReactApexChart from "react-apexcharts";

function ViewDetailClass() {
  const [classes, setClasses] = useState([]);
  const { id } = useParams();
  const [classLearnerJoined, setclassLearnerJoined] = useState([]);
  const [classTest, setClassTest] = useState([]);
  const [classAssignment, setClassAssignment] = useState([]);
  const [learnerJoined, setLearnerJoined] = useState([]);
  const [postGrowth, setPostGrowth] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const temp = (await ClassService.getClassroomById(id)).data;
        setClasses(temp);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };
    fetchData();

    const fetchDataClassLearnerJoined = async () => {
      try {
        const temp = (await ClassService.getLeanerJoined(id)).data;
        setclassLearnerJoined(temp);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };
    fetchDataClassLearnerJoined();

    const fetchDataClassAssignmentNumber = async () => {
      try {
        const temp = (await ClassService.getAssignmentNumber(id)).data;
        setClassAssignment(temp);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };
    fetchDataClassAssignmentNumber();

    const fetchDataClassTestNumber = async () => {
      try {
        const temp = (await ClassService.getTestNumber(id)).data;
        setClassTest(temp);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };
    fetchDataClassTestNumber();

    const fetchDataLearnerJoined = async () => {
      try {
        const temp = (await ClassService.getLeanerJoinedGrowth(id)).data;
        setLearnerJoined(temp);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };
    fetchDataLearnerJoined();

    const fetchDataPostGrowth = async () => {
      try {
        const temp = (await ClassService.getPostGrowth(id)).data;
        setPostGrowth(temp);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };
    fetchDataPostGrowth();
  }, [id]);

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

  const weekInMonth = ["Week 1", "Week 2", "Week 3", "Week 4"];
  const optionsLearnJoined = {
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val;
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
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
        formatter: function (val1) {
          return Number(val1).toFixed(0);
        },
      },
    },
    position: "top",
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    crosshairs: {
      fill: {
        type: "gradient",
        gradient: {
          colorFrom: "#D8E3F0",
          colorTo: "#BED1E6",
          stops: [0, 100],
          opacityFrom: 0.4,
          opacityTo: 0.5,
        },
      },
    },
    tooltip: {
      enabled: true,
    },
  };

  const seriesLearnerJoined = [
    {
      name: "Person",
      data: learnerJoined,
    },
  ];

  const optionsPostGrowth = {
    xaxis: {
      categories: weekInMonth,
      group: {
        style: {
          fontSize: "12px",
          fontWeight: 700,
        },
        groups: [{ title: "In Month", cols: 4 }],
      },
    },
    yaxis: {
      title: {
        text: "Post",
      },
      labels: {
        formatter: function (val) {
          return Number(val).toFixed(0);
        },
      },
    },
  };

  const seriesPostGrowth = [
    {
      name: "Person",
      data: postGrowth,
    },
  ];
  
  return (
    <div className="container-fluid">
      <div className="row">
        <SidebarforAdmin />
        <div className="col-sm">
          <HeaderAdmin />
          <div className="card mb-4">
            <div className="card-header fs-5 fw-bold text-uppercase">
              Class Details
            </div>
            <div className="card-body">
              <div className="row gx-3 mb-3">
                <div className="col-xl-4 col-md-4 mb-4">
                  <div className="card border-left bg-warning border-warning shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-white text-uppercase mb-1">
                            Member's Joined
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-white">
                            {classLearnerJoined}
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="bi bi-person-workspace fs-2 text-white"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-4 mb-4">
                  <div className="card border-left bg-success border-success shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-white text-uppercase mb-1">
                            Number of assignments
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-white">
                            {classAssignment}
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="bi bi-clipboard2-check fs-2 text-white"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-4 mb-4">
                  <div className="card border-left bg-danger border-danger shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-white text-uppercase mb-1">
                            Number of tests
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-white">
                            {classTest}
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
              <div className="mb-3">
                <label className="small mb-1 fs-6">Class Name </label>
                <input
                  className="form-control"
                  type="text"
                  readOnly
                  value={classes?.class_name}
                />
              </div>
              <div className="row gx-3 mb-3">
                <div className="col-md-4">
                  <label className="small mb-1 fs-6">Class ID</label>
                  <input
                    className="form-control"
                    type="text"
                    readOnly
                    value={classes?.id}
                  />
                </div>
                <div className="col-md-4">
                  <label className="small mb-1 fs-6">Tutor guide</label>
                  <input
                    className="form-control"
                    type="text"
                    readOnly
                    value={classes?.user?.username}
                  />
                </div>
                <div className="col-md-4">
                  <label className="small mb-1 fs-6">Create Date</label>
                  <input
                    className="form-control"
                    type="text"
                    readOnly
                    value={classes?.created_date}
                  />
                </div>
              </div>
              <div className="row gx-3 mb-3">
                <div className="col-md-12">
                  <label className="small mb-1 fs-6">Description</label>
                  <input
                    className="form-control"
                    type="text"
                    readOnly
                    value={classes?.description}
                  />
                </div>
              </div>
              <div className="row gx-3 mb-3">
                <div className="col-xl-6 col-lg-6">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6 className="m-0 fw-bold text-uppercase text-primary">
                        number of posts per week
                      </h6>
                    </div>
                    <div className="card-body">
                      <ReactApexChart
                        options={optionsPostGrowth}
                        series={seriesPostGrowth}
                        type="bar"
                        height={350}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6 className="m-0 fw-bold text-uppercase text-primary">
                        number of learners join class OVER 3 MONTHS
                      </h6>
                    </div>
                    <div className="card-body">
                      <ReactApexChart
                        options={optionsLearnJoined}
                        series={seriesLearnerJoined}
                        type="bar"
                        height={350}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <Link className="btn btn-primary" to="/manageclass">
                  Close
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewDetailClass;
