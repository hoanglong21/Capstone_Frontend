import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import SidebarforAdmin from './SidebarforAdmin'
import HeaderAdmin from './HeaderAdmin'
import UserService from '../../services/UserService'
import defaultAvatar from '../../assets/images/avatar-default.jpg'
import ReactApexChart from 'react-apexcharts'

function ViewDetailsUser() {
    const [users, setUsers] = useState([])
    const { username } = useParams()
    const [studySetLearned, setStudySetLearned] = useState([])
    const [classJoined, setClassJoined] = useState([])
    const [access, setAccess] = useState([])
    const [learning, setLearning] = useState([])

    const [seriesDataHeapChart, setSeriesDataHeapChart] = useState([])
    // const [seriesDataLabel, setSeriesDataLabel] = useState([]);
    // const [seriesDataChart, setSeriesDataChart] = useState([]);
    // const [seriesRadar, setSeriesRadar] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const temp = (await UserService.getUser(username)).data
            setUsers(temp)
        }
        if (username) {
            fetchData()
        }
    }, [username])

    const optionsDataLabel = {
        plotOptions: {
            bar: {
                borderRadius: 10,
                dataLabels: {
                    position: 'top', // top, center, bottom
                },
            },
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val
            },
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: ['#304758'],
            },
        },
        xaxis: {
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
            ],
            position: 'top',
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            crosshairs: {
                fill: {
                    type: 'gradient',
                    gradient: {
                        colorFrom: '#D8E3F0',
                        colorTo: '#BED1E6',
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5,
                    },
                },
            },
            tooltip: {
                enabled: true,
            },
        },
        yaxis: {
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: false,
                formatter: function (val) {
                    return Number(val).toFixed(0)
                },
            },
        },
        title: {
            text: '',
            floating: true,
            offsetY: 330,
            align: 'center',
            style: {
                color: '#444',
            },
        },
    }

    const seriesDataLabel = [
        {
            name: 'Person',
            data: studySetLearned,
        },
    ]

    const week = [
        'Week 1',
        'Week 2',
        'Week 3',
        'Week 4',
        'Week 5',
        'Week 6',
        'Week 7',
        'Week 8',
        'Week 9',
        'Week 10',
        'Week 11',
        'Week 12',
    ]

    const day = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
    ]

    const optionsDataChart = {
        xaxis: {
            categories: week,
            tickPlacement: 'on',
        },
        yaxis: {
            title: {
                text: 'Class',
            },
            labels: {
                formatter: function (val) {
                    return Number(val).toFixed(0)
                },
            },
        },
    }

    const seriesDataChart = [
        {
            name: 'Class Joined',
            data: classJoined,
        },
    ]

    const optionRadar = {
        xaxis: {
            categories: ['Kanji', 'Vocabulary', 'Grammar'],
        },
    }

    const seriesRadar = [
        {
            name: 'Learning',
            data: learning,
        },
    ]

    const optionDataHeapChart = {
        dataLabels: {
            enabled: false,
        },
        colors: ['#008FFB'],
    }

    useEffect(() => {
        const fetchDataStudySetLearned = async () => {
            try {
                const temp = (
                    await UserService.getStudySetLearnedStatistic(users.id)
                ).data
                setStudySetLearned(temp)
                // const tempSeriesDataLabel = [
                //   {
                //     name: "Person",
                //     data: temp,
                //   },
                // ];
                // setSeriesDataLabel(tempSeriesDataLabel);
            } catch (error) {
                console.error('Error fetching statistics:', error)
            }
        }

        const fetchDataClassJoined = async () => {
            try {
                const temp = (
                    await UserService.getClassJoinedStatistic(users.id)
                ).data
                setClassJoined(temp)
                // const tempSeriesDataChart = [
                //   {
                //     name: "Class Joined",
                //     data: temp,
                //   },
                // ];
                // setSeriesDataChart(tempSeriesDataChart);
            } catch (error) {
                console.error('Error fetching statistics:', error)
            }
        }

        const fetchDataAccess = async () => {
            try {
                const temp = (await UserService.getAccessStatistic(users.id))
                    .data
                setAccess(temp)
                var tempSeriesDataHeapChart = []
                for (let index = 0; index < day.length; index++) {
                    const tempDay = day[index]
                    const tempArr = temp[index]
                    tempSeriesDataHeapChart.push({
                        name: tempDay,
                        data: tempArr,
                    })
                }
                setSeriesDataHeapChart(tempSeriesDataHeapChart)
                console.log(seriesDataHeapChart)
            } catch (error) {
                console.error('Error fetching statistics:', error)
            }
        }

        const fetchDataLearning = async () => {
            try {
                const temp = (await UserService.getLearningStatistic(users.id))
                    .data
                setLearning(temp)
                // const tempSeriesRadar = [
                //   {
                //     name: "Learning",
                //     data: temp,
                //   },
                // ];
                // setSeriesRadar(tempSeriesRadar);
            } catch (error) {
                console.error('Error fetching statistics:', error)
            }
        }

        if (users.id) {
            fetchDataStudySetLearned()
            fetchDataClassJoined()
            fetchDataAccess()
            fetchDataLearning()
        }
    }, [users.id])

    return (
        <div className="container-fluid">
            <div className="row">
                <SidebarforAdmin />
                <div className="col-sm-10">
                    <HeaderAdmin />
                    <div className="card mb-4">
                        <div className="card-header fs-5 fw-bold text-uppercase">
                            Account Details
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="small mb-1 fs-6">
                                    Profile Picture{' '}
                                </label>
                                <img
                                    className="img-account-profile rounded-circle"
                                    src={
                                        users?.avatar
                                            ? users?.avatar
                                            : defaultAvatar
                                    }
                                    alt=""
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        marginLeft: '35%',
                                    }}
                                />
                            </div>
                            <div className="row gx-3 mb-3">
                                <div className="col-md-6">
                                    <label className="small mb-1 fs-6">
                                        Username
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        readOnly
                                        value={users?.username}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="small mb-1 fs-6">
                                        Bio
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        readOnly
                                        value={users?.bio}
                                    />
                                </div>
                            </div>
                            <div className="row gx-3 mb-3">
                                <div className="col-md-6">
                                    <label className="small mb-1 fs-6">
                                        First name
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        readOnly
                                        value={users?.first_name}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="small mb-1 fs-6">
                                        Last name
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        readOnly
                                        value={users?.last_name}
                                    />
                                </div>
                            </div>

                            <div className="row gx-3 mb-3">
                                <div className="col-md-6">
                                    <label className="small mb-1 fs-6">
                                        Date of birth
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        readOnly
                                        value={users?.dob}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="small mb-1 fs-6">
                                        Address
                                    </label>
                                    <input
                                        className="form-control"
                                        readOnly
                                        type="text"
                                        value={users?.address}
                                    />
                                </div>
                            </div>

                            <div className="row gx-3 mb-3">
                                <div className="col-md-6">
                                    <label className="small mb-1 fs-6">
                                        Email address
                                    </label>
                                    <input
                                        className="form-control"
                                        type="tel"
                                        readOnly
                                        value={users?.email}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="small mb-1 fs-6">
                                        Phone number
                                    </label>
                                    <input
                                        className="form-control"
                                        type="tel"
                                        readOnly
                                        value={users?.phone}
                                    />
                                </div>
                            </div>

                            <div className="row gx-3 mb-3">
                                <div className="col-md-6">
                                    <label className="small mb-1 fs-6">
                                        Status
                                    </label>
                                    <input
                                        className="form-control"
                                        type="tel"
                                        readOnly
                                        value={users?.status}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="small mb-1 fs-6">
                                        Role
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        readOnly
                                        value={users?.role}
                                    />
                                </div>
                            </div>
                            <div className="row gx-3 mb-3">
                                <div className="col-xl-12 col-lg-12">
                                    <div className="card shadow mb-4">
                                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                            <h6 className="m-0 fw-bold text-uppercase text-info">
                                                Number of logins day by day
                                            </h6>
                                        </div>
                                        <div className="card-body">
                                            {seriesDataHeapChart?.length >
                                                0 && (
                                                <ReactApexChart
                                                    options={
                                                        optionDataHeapChart
                                                    }
                                                    series={seriesDataHeapChart}
                                                    type="heatmap"
                                                    height={350}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row gx-3 mb-3">
                                <div className="col-xl-6 col-lg-6">
                                    <div className="card shadow mb-4">
                                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                            <h6 className="m-0 fw-bold text-uppercase text-primary">
                                                Number sets to learn
                                            </h6>
                                        </div>
                                        <div className="card-body">
                                            {seriesDataLabel?.length > 0 && (
                                                <ReactApexChart
                                                    options={optionsDataLabel}
                                                    series={seriesDataLabel}
                                                    type="bar"
                                                    height={350}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6">
                                    <div className="card shadow mb-4">
                                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                            <h6 className="m-0 fw-bold text-uppercase text-success">
                                                Number of join classes
                                            </h6>
                                        </div>
                                        <div className="card-body">
                                            <ReactApexChart
                                                options={optionsDataChart}
                                                series={seriesDataChart}
                                                type="bar"
                                                height={350}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-xl-6 col-lg-6 ms-auto me-auto">
                                        <div className="card shadow mb-4">
                                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                                <h6 className="m-0 fw-bold text-uppercase text-warning">
                                                    Learn studyset kanji,
                                                    grammar and vocabulary
                                                </h6>
                                            </div>
                                            <div className="card-body">
                                                <ReactApexChart
                                                    options={optionRadar}
                                                    series={seriesRadar}
                                                    type="radar"
                                                    height={350}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <Link
                                    className="btn btn-primary"
                                    to="/manageusers"
                                >
                                    Close
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewDetailsUser
