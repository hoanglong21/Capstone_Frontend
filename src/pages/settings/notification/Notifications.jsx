import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import UserSettingService from '../../../services/UserSettingService'

import FormStyles from '../../../assets/styles/Form.module.css'
import './notification.css'

const Notifications = () => {
    const { userInfo } = useSelector((state) => state.user)

    const [isStudyReminder, setIsStudyReminder] = useState(true)
    const [studyReminder, setStudyReminder] = useState({ value: '00:00' })
    const [isAssignDueDate, setIsAssignDueDate] = useState(true)
    const [assignDueDate, setAssignDueDate] = useState({ value: '0' })
    const [isTestDueDate, setIsTestDueDate] = useState(true)
    const [testDueDate, setTestDueDate] = useState({ value: '0' })
    const [setAdded, setSetAdded] = useState({ value: true })
    const [postAdded, setPostAdded] = useState({ value: true })
    const [assignAssigned, setAssignAssigned] = useState({ value: true })
    const [testAssigned, setTestAssigned] = useState({ value: true })
    const [submitGraded, setSubmitGraded] = useState({ value: true })

    const [successMess, setSuccessMess] = useState(false)

    // fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const settings = (
                    await UserSettingService.customSettings(userInfo.id)
                ).data
                // study reminder
                setStudyReminder({
                    user: {
                        id: userInfo.id,
                        username: userInfo.username,
                    },
                    setting: {
                        id: 1,
                    },
                    value: settings['study reminder'],
                })
                setIsStudyReminder(settings['study reminder'] ? true : false)
                // assign due date
                setAssignDueDate({
                    user: {
                        id: userInfo.id,
                        username: userInfo.username,
                    },
                    setting: {
                        id: 3,
                    },
                    value: settings['assignment due date reminder'],
                })
                setIsAssignDueDate(
                    settings['assignment due date reminder'] ? true : false
                )
                // test due date
                setTestDueDate({
                    user: {
                        id: userInfo.id,
                        username: userInfo.username,
                    },
                    setting: {
                        id: 4,
                    },
                    value: settings['test due date reminder'],
                })
                setIsTestDueDate(
                    settings['test due date reminder'] ? true : false
                )
                // set added
                setSetAdded({
                    user: {
                        id: userInfo.id,
                        username: userInfo.username,
                    },
                    setting: {
                        id: 5,
                    },
                    value: settings['set added'] ? settings['set added'] : true,
                })
                // post added
                setPostAdded({
                    user: {
                        id: userInfo.id,
                        username: userInfo.username,
                    },
                    setting: {
                        id: 6,
                    },
                    value: settings['post added']
                        ? settings['post added']
                        : true,
                })
                // assign assigned
                setAssignAssigned({
                    user: {
                        id: userInfo.id,
                        username: userInfo.username,
                    },
                    setting: {
                        id: 7,
                    },
                    value: settings['assignment assigned']
                        ? settings['assignment assigned']
                        : true,
                })
                // test assigned
                setTestAssigned({
                    user: {
                        id: userInfo.id,
                        username: userInfo.username,
                    },
                    setting: {
                        id: 8,
                    },
                    value: settings['test assigned']
                        ? settings['test assigned']
                        : true,
                })
                // submit graded
                setSubmitGraded({
                    user: {
                        id: userInfo.id,
                        username: userInfo.username,
                    },
                    setting: {
                        id: 9,
                    },
                    value: settings['submission graded']
                        ? settings['submission graded']
                        : true,
                })
            } catch (error) {
                if (error.response && error.response.data) {
                    console.log(error.response.data)
                } else {
                    console.log(error.message)
                }
            }
        }
        if (userInfo?.id) {
            fetchData()
        }
    }, [userInfo])

    const handleSave = async () => {
        setSuccessMess(false)
        try {
            // study reminder
            await UserSettingService.updateCustomSettings(
                userInfo.id,
                studyReminder.setting.id,
                studyReminder.value
            )
            // assign due date
            await UserSettingService.updateCustomSettings(
                userInfo.id,
                assignDueDate.setting.id,
                assignDueDate.value
            )
            // test due date
            await UserSettingService.updateCustomSettings(
                userInfo.id,
                testDueDate.setting.id,
                testDueDate.value
            )
            // set added
            await UserSettingService.updateCustomSettings(
                userInfo.id,
                setAdded.setting.id,
                setAdded.value
            )
            // post added
            await UserSettingService.updateCustomSettings(
                userInfo.id,
                postAdded.setting.id,
                postAdded.value
            )
            // assign assigned
            await UserSettingService.updateCustomSettings(
                userInfo.id,
                assignAssigned.setting.id,
                assignAssigned.value
            )
            // test assigned
            await UserSettingService.updateCustomSettings(
                userInfo.id,
                testAssigned.setting.id,
                testAssigned.value
            )
            // submit graded
            await UserSettingService.updateCustomSettings(
                userInfo.id,
                submitGraded.setting.id,
                submitGraded.value
            )
            setSuccessMess(true)
            setTimeout(function () {
                setSuccessMess(false)
            }, 5000)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data)
            } else {
                console.log(error.message)
            }
        }
        document.body.scrollTop = document.documentElement.scrollTop = 0
    }

    return (
        <div className="mx-5 ps-5">
            <h4>Email Notification</h4>
            <div className="mt-4">
                {/* successMess message */}
                {successMess && (
                    <div
                        className="alert alert-success col-12 mb-0"
                        role="alert"
                    >
                        Your changes have been successfully saved!
                    </div>
                )}
                <fieldset className="notification_formContainer form-check mb-3 ps-0">
                    <legend>STUDY REMINDERS</legend>
                    <input
                        className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                        type="checkbox"
                        checked={isStudyReminder}
                        id="studyReminder"
                        onChange={(event) => {
                            setIsStudyReminder(event.target.checked)
                        }}
                    />
                    <label className="form-check-label" htmlFor="studyReminder">
                        Email reminders
                    </label>
                    <div className="mt-2 notification_formTime">
                        <label
                            htmlFor="studyReminderTime"
                            className="form-label"
                        >
                            Time of day:
                        </label>
                        <input
                            type="time"
                            className={`form-control ${FormStyles.formControl} ms-0`}
                            id="studyReminderTime"
                            value={studyReminder?.value || ''}
                            disabled={!isStudyReminder}
                            onChange={(event) => {
                                setStudyReminder({
                                    ...studyReminder,
                                    value: event.target.value,
                                })
                            }}
                        />
                    </div>
                </fieldset>
                <fieldset className="notification_formContainer form-check mb-3 ps-0">
                    <legend>DUE DATE REMINDERS</legend>
                    <div className="mb-3">
                        <input
                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                            type="checkbox"
                            checked={isAssignDueDate}
                            id="assignmentReminder"
                            onChange={(event) => {
                                setIsAssignDueDate(event.target.checked)
                            }}
                        />
                        <label
                            className="form-check-label"
                            htmlFor="assignmentReminder"
                        >
                            Assignment reminders
                        </label>
                        <div className="mt-2">
                            <div className="row d-flex align-items-center">
                                <div className="col-2">
                                    <label
                                        htmlFor="assignDueDateReminderTime"
                                        className="form-label"
                                    >
                                        Before (hours):
                                    </label>
                                </div>
                                <div className="col-10 notification_formTime">
                                    <input
                                        type="number"
                                        className={`form-control ${FormStyles.formControl} ms-0`}
                                        id="assignDueDateReminderTime"
                                        disabled={!isAssignDueDate}
                                        value={assignDueDate?.value || ''}
                                        onChange={(event) => {
                                            setAssignDueDate({
                                                ...assignDueDate,
                                                value: event.target.value,
                                            })
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <input
                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                            type="checkbox"
                            checked={isTestDueDate}
                            id="testReminder"
                            onChange={(event) => {
                                setIsTestDueDate(event.target.checked)
                            }}
                        />
                        <label
                            className="form-check-label"
                            htmlFor="testReminder"
                        >
                            Test reminders
                        </label>
                        <div className="mt-2">
                            <div className="row d-flex align-items-center">
                                <div className="col-2">
                                    <label
                                        htmlFor="testDueDateReminderTime"
                                        className="form-label"
                                    >
                                        Before (hours):
                                    </label>
                                </div>
                                <div className="col-10 notification_formTime">
                                    <input
                                        type="number"
                                        className={`form-control ${FormStyles.formControl} ms-0`}
                                        id="testDueDateReminderTime"
                                        disabled={!isTestDueDate}
                                        value={testDueDate?.value || ''}
                                        onChange={(event) => {
                                            setTestDueDate({
                                                ...testDueDate,
                                                value: event.target.value,
                                            })
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </fieldset>
                <fieldset className="form-check notification_formContainer mb-3 ps-0">
                    <legend>IN YOUR CLASS, RECEIVE EMAIL WHEN:</legend>
                    <div>
                        <input
                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                            type="checkbox"
                            id="setAdded"
                            checked={setAdded?.value}
                            onChange={(event) => {
                                setSetAdded({
                                    ...setAdded,
                                    value: event.target.checked,
                                })
                            }}
                        />
                        <label className="form-check-label" htmlFor="setAdded">
                            A set is added
                        </label>
                    </div>
                    <div>
                        <input
                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                            type="checkbox"
                            id="postPosted"
                            checked={postAdded?.value}
                            onChange={(event) => {
                                setPostAdded({
                                    ...postAdded,
                                    value: event.target.checked,
                                })
                            }}
                        />
                        <label
                            className="form-check-label"
                            htmlFor="postPosted"
                        >
                            A post is posted
                        </label>
                    </div>
                    <div>
                        <input
                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                            type="checkbox"
                            id="assignmentAssigned"
                            checked={assignAssigned?.value}
                            onChange={(event) => {
                                setAssignAssigned({
                                    ...assignAssigned,
                                    value: event.target.checked,
                                })
                            }}
                        />
                        <label
                            className="form-check-label"
                            htmlFor="assignmentAssigned"
                        >
                            An assignment is assigned
                        </label>
                    </div>
                    <div>
                        <input
                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                            type="checkbox"
                            id="testAssigned"
                            checked={testAssigned?.value}
                            onChange={(event) => {
                                setTestAssigned({
                                    ...testAssigned,
                                    value: event.target.checked,
                                })
                            }}
                        />
                        <label
                            className="form-check-label"
                            htmlFor="testAssigned"
                        >
                            A test is assigned
                        </label>
                    </div>
                    <div>
                        <input
                            className={`form-check-input ${FormStyles.formCheckInput} ms-0`}
                            type="checkbox"
                            id="submissionGraded"
                            checked={submitGraded?.value}
                            onChange={(event) => {
                                setSubmitGraded({
                                    ...submitGraded,
                                    value: event.target.checked,
                                })
                            }}
                        />
                        <label
                            className="form-check-label"
                            htmlFor="submissionGraded"
                        >
                            Your submission is graded
                        </label>
                    </div>
                </fieldset>
                <button
                    className="btn btn-primary px-4 mt-4"
                    onClick={handleSave}
                >
                    Save
                </button>
            </div>
        </div>
    )
}
export default Notifications
