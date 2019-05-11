import axios from

axios

const URL = 'https://localhost:5000/api/devices'
:

class DeviceService {

    static getDevices() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(URL);
                const data = res.data;
                resolve(data.map(device => ({
                    ...data,
                    createAt: new Date(device.createdAt)
                })))
            } catch (err) {
                reject(err);
            }
        })
    }

    //Add new device
    static addDevice(data){
        return axios.post(URL, data);

    }

    /**
     * Delete a device
     */
    static deleteDevice(id){
        return axios.delete(`${URL}${id}`)
    }
}

export default DeviceService;
