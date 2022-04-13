export default function useApi() {

    const axios = require('axios');

    const getClientList = async(validation, type, value) => {
        console.log(validation, type, value)
        try {
            if (validation == 0 && type != 'default' && value != 'default') {
                const response = await axios.get(process.env.API_VNA_GCBC, {
                    params: {
                        type,
                        value
                    }
                })
                return response.data
            } else {
                const response = await axios.get(process.env.API_VNA_GCLI)
                return response.data
            }
        } catch (error) {
            console.log(error)
        }
    }

    const postClient = async(cliform) => {

        try {
            const resp = await axios.post(process.env.API_VNA_PCLI, cliform)
            console.log(resp.status + "post")
        } catch (error) {
            console.log(error)
        }
    }

    const upClient = async(idUp, nameUp, locationUp, cliDate) => {

        const upCli = {
            id: idUp,
            name: nameUp,
            location: locationUp,
            date: cliDate
        }
        try {
            const resp = await axios.put(process.env.API_VNA_UCLI, upCli)
            return resp.status
        } catch (error) {
            return resp.status
        }
    }

    const getServices = async() => {
        try {
            const response = await axios.get(process.env.API_VNA_GSER)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    const postService = async(s_form) => {
        try {
            const response = await axios.post(process.env.API_VNA_PSER, s_form)
            return response.status
        } catch (error) {
            console.log(error)
        }
    }

    const upProduct = async(serialUp, modelUp, valueUp) => {

        const upPro = {
            serial: serialUp,
            model: modelUp,
            valor: valueUp
        }
        try {
            const response = await axios.put(process.env.API_VNA_UPRO, upPro)
            return response.status
        } catch (error) {
            console.log(error)
        }
    }


    const getStaff = async() => {
        try {
            const response = await axios.get(process.env.API_VNA_GSTA)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    const postStaff = async(st_form) => {
        try {
            const response = await axios.post(process.env.API_VNA_PSTF, st_form)
            return response.status
        } catch (error) {
            console.log(error)
        }
    }

    const upSale = async(sup_id, sup_serial, sup_model, sup_cli, sup_value, sup_date) => {

        const upSaleForm = {
            sale_id: sup_id,
            serial: sup_serial,
            model: sup_model,
            client_id: sup_cli,
            valor: sup_value,
            date: sup_date
        }

        try {
            const response = await axios.put(process.env.API_VNA_USAL, upSaleForm)
            return response.status
        } catch (error) {
            console.log(error)
        }
    }

    const getSuppliers = async() => {
        try {
            const response = await axios.get(process.env.API_VNA_GSUP)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    const postSupplier = async(sup_form) => {
        try {
            const response = await axios.post(process.env.API_VNA_PSUP, sup_form)
            return response.status
        } catch (error) {
            console.log(error)
        }
    }

    const verifyUser = async(token_inp) => {
        try {
            const response = await axios.get(process.env.API_VNA_VTKN + token_inp)
            return response.data
        } catch (error) {
            return response.status
        }
    }

    return {
        getClientList,
        postClient,
        upClient,
        getServices,
        postService,
        upProduct,
        getStaff,
        postStaff,
        upSale,
        getSuppliers,
        postSupplier,
        verifyUser
    }
}