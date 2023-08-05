import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/v1'

export const customSettings = (id) => {
    return axios.get(API_BASE_URL + '/customsettings/' + id)
}

export const updateCustomSettings = (userId, settingId, value) => {
    return axios.get(
        API_BASE_URL +
            '/customsettings?userid=' +
            userId +
            '&settingid=' +
            settingId +
            '&value=' +
            value
    )
}

const UserSettingService = {
    customSettings,
    updateCustomSettings,
}

export default UserSettingService
