
export default function useApi(){

  const axios = require('axios');

  const getClientList = async () =>{
    try {
      const response = await axios.get(process.env.API_VNA_GCLI)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  const postClient = async (nameAux, locationAux, regis_date) =>{

    const newCli={
      name: nameAux,
      location: locationAux,
      date: regis_date
    }
    try {
      const resp = await axios.post(process.env.API_VNA_PCLI, newCli)
      console.log(resp.status + "post")
    }catch (error) {
      console.log(error)
    }
  }

  const upClient = async (idUp, nameUp, locationUp, cliDate) =>{

    const upCli={
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

  const topCliLocation = async() =>{
    try {
      const response = await axios.get(process.env.API_VNA_TCLI)
      return response.data
    } catch (error) {
      return response.status
    }
  }

  const getProducts = async () =>{
    try {
      const response = await axios.get(process.env.API_VNA_GPRO)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  const postProduct = async (serialAux, modelAux, valueAux) =>{

    const newPro={
      serial: serialAux,
      model: modelAux,
      valor: valueAux
    }
    try {
      const response = await axios.post(process.env.API_VNA_PPRO, newPro)
      return response.status
    }catch (error) {
      console.log(error)
    }
  }

  const upProduct = async (serialUp, modelUp, valueUp) =>{

    const upPro={
      serial: serialUp,
      model: modelUp,
      valor: valueUp
    }
    try {
      const response = await axios.put(process.env.API_VNA_UPRO, upPro)
      return response.status
    }catch (error) {
      console.log(error)
    }
  }

  const topProduct = async () =>{
    try {
      const response = await axios.get(process.env.API_VNA_TPRO)
      return response.data
    } catch (error) {
      return response.status
    }
  }

  const getSales = async () =>{
    try {
      const response = await axios.get(process.env.API_VNA_GSAL)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  const postSale = async (s_serial, s_model, s_cli, s_value, s_date) =>{

    const newSale={
      serial: s_serial,
      model: s_model,
      client_id: s_cli,
      valor: s_value,
      date: s_date
    }

    try {
      const response = await axios.post(process.env.API_VNA_PSAL, newSale)
      return response.status
    }catch (error) {
      console.log(error)
    }
  }

  const upSale = async (sup_id, sup_serial, sup_model, sup_cli, sup_value, sup_date) =>{

    const upSaleForm={
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
    }catch (error) {
      console.log(error)
    }
  }

  const verifyUser = async (token_inp) => {
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
    topCliLocation,
    getProducts,
    postProduct,
    upProduct,
    topProduct,
    getSales,
    postSale,
    upSale,
    verifyUser
  }
}
