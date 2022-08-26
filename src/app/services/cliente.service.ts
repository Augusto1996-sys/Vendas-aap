import { httpClient } from 'app/http'
import { Cliente } from 'app/models/clientes' 
import { AxiosResponse } from 'axios'

const resourceURL: string = "/cliente/registar_cliente"
const resourceURLListarCliente: string = "/cliente/listar_cliente"
const resourceURLDeletarbyID: string = "/cliente/delete_clienteByID"


export const useClienteService = () => {
    const salvar = async (cliente: Cliente): Promise<Cliente> => {  
        const response: AxiosResponse<Cliente> = await httpClient.post<Cliente>(resourceURL, cliente)
        return response.data;
    }

    const actualizar = async (cliente: Cliente): Promise<void> => {
        const url: string = `${resourceURL}/${cliente.id}`
        await httpClient.put<Cliente>(url, cliente);
    }

    const carregarCliente = async (id: any): Promise<Cliente> => {
        const url: string = `${resourceURLListarCliente}/${id}`
        const response: AxiosResponse<Cliente> = await httpClient.get<Cliente>(url);
        return response.data;
    }
    const deletar = async (id: any): Promise<void> => {
        const url: string = `${resourceURLDeletarbyID}/${id}`
        await httpClient.delete(url);

    }

    return {
        salvar,
        actualizar,
        carregarCliente,
        deletar

    }
}