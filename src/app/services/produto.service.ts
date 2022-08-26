import { httpClient } from 'app/http'
import { Produto } from 'app/models/produtos'
import { AxiosResponse } from 'axios'

const resourceURL: string = "/produto/registar_produto"
const resourceURLupdate: string = `/produto/actualizar_produto`
const resourceURLListarbyID: string = `/produto/listar_produto`
const resourceURLDeletarbyID: string = `/produto/delete_produtoByID`


export const useProdutoService = () => {

    const salvar = async (produto: Produto): Promise<Produto> => {
        const response: AxiosResponse<Produto> = await httpClient.post<Produto>(resourceURL, produto);
        return response.data;
    }


    const actualizar = async (produto: Produto): Promise<void> => {
        const url: string = `${resourceURLupdate}/${produto.id}`
        await httpClient.put<Produto>(url, produto);
    }


    const carregarProduto = async (id: any): Promise<Produto> => {
        const url: string = `${resourceURLListarbyID}/${id}`
        const response: AxiosResponse<Produto> = await httpClient.get<Produto>(url);
        return response.data;
    }

    const deletar = async (id: any): Promise<void> => {
        const url: string = `${resourceURLDeletarbyID}/${id}`
        const response: AxiosResponse<Produto> = await httpClient.get<Produto>(url);

    }

    return {
        salvar,
        actualizar,
        carregarProduto,
        deletar
    }
}