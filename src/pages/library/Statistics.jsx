import { useState, useEffect } from 'react'
import UserService from '../../services/UserService'
import ReactApexChart from 'react-apexcharts'
import { useSelector } from 'react-redux'

function Statistics() {
    const { userInfo } = useSelector((state) => state.user)

    const [studySetLearned, setStudySetLearned] = useState([])
    const [classJoined, setClassJoined] = useState([])
    const [access, setAccess] = useState([])
    const [learning, setLearning] = useState([])
    const [seriesDataHeapChart, setSeriesDataHeapChart] = useState([])
    const [loading, setLoading] = useState(true)

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
                    await UserService.getStudySetLearnedStatistic(userInfo.id)
                ).data
                setStudySetLearned(temp)
            } catch (error) {
                console.error('Error fetching statistics:', error)
            }
        }

        const fetchDataClassJoined = async () => {
            try {
                const temp = (
                    await UserService.getClassJoinedStatistic(userInfo.id)
                ).data
                setClassJoined(temp)
            } catch (error) {
                console.error('Error fetching statistics:', error)
            }
        }

        const fetchDataAccess = async () => {
            try {
                const temp = (await UserService.getAccessStatistic(userInfo.id))
                    .data
                setAccess(temp)
                var tempSeriesDataHeapChart = []
                for (let index = 0; index < day.length; index++) {
                    const tempDay = day[index]
                    const tempArr = access[index]
                    tempSeriesDataHeapChart.push({
                        name: tempDay,
                        data: tempArr,
                    })
                }
                setSeriesDataHeapChart(tempSeriesDataHeapChart)
            } catch (error) {
                console.error('Error fetching statistics:', error)
            }
        }

        const fetchDataLearning = async () => {
            try {
                const temp = (
                    await UserService.getLearningStatistic(userInfo.id)
                ).data
                setLearning(temp)
            } catch (error) {
                console.error('Error fetching statistics:', error)
            }
        }
        if (userInfo.id) {
            setLoading(true)
            fetchDataStudySetLearned()
            fetchDataClassJoined()
            fetchDataAccess()
            fetchDataLearning()
            setLoading(false)
        }
    }, [userInfo])

    if (!loading) {
        return (
            <div>
                <div className="row gx-3 mb-3 mt-3">
                    <div className="col-xl-12 col-lg-12">
                        <div className="card shadow mb-4">
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 fw-bold text-uppercase text-info">
                                    Number of logins day by day
                                </h6>
                            </div>
                            <div className="card-body">
                                {seriesDataHeapChart?.length > 0 && (
                                    <ReactApexChart
                                        options={optionDataHeapChart}
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
                                <ReactApexChart
                                    options={optionsDataLabel}
                                    series={seriesDataLabel}
                                    type="bar"
                                    height={350}
                                />
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
                                        Learn studyset kanji, grammar and
                                        vocabulary
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
            </div>
        )
    }
}

export default Statistics
