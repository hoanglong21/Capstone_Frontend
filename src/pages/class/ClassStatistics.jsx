import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ClassService from "../../services/ClassService";
import ReactApexChart from "react-apexcharts";

function ClassStatistics() {
  const { id } = useParams();
  const [classLearnerJoined, setclassLearnerJoined] = useState([]);
  const [classTest, setClassTest] = useState([]);
  const [classAssignment, setClassAssignment] = useState([]);
  const [learnerJoined, setLearnerJoined] = useState([]);
  const [postGrowth, setPostGrowth] = useState([]);

  useEffect(() => {
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
    <div>
        <div className="row gx-3 mb-3">
                <div className="col-xl-4 col-md-4 mb-4">
                  <div className="card border-left border-warning shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                            Member's Joined
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {classLearnerJoined}
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="bi bi-person-workspace fs-2 text-secondary"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-4 mb-4">
                  <div className="card border-left border-success shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                            Number of assignments
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {classAssignment}
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="bi bi-clipboard2-check fs-2 text-secondary"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-4 mb-4">
                  <div className="card border-left border-primary shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                            Number of tests
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {classTest}
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="bi bi-file-earmark-text fs-2 text-secondary"></i>
                        </div>
                      </div>
                    </div>
                  </div>
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
                        number of learners join class by month
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
    </div>
  )
}

export default ClassStatistics
