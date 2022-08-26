import { Produto } from "app/models/produtos";
import { Layout, Loader } from "components";
import Link from "next/link";
import Router from "next/Router";
import { TabelaProdutos } from "./tabela";
import useSWR from "swr";
import { useProdutoService } from "app/services";
import { httpClient } from "app/http";
import { AxiosResponse } from "axios";
import { Alert } from "components/common/message";
import { useEffect, useState } from "react";

export const ListagemDeProdutos: React.FC = () => {
  const service = useProdutoService();
  const [messages, setMessages] = useState<Array<Alert>>([]);
  const { data: result, error } = useSWR<AxiosResponse<Produto[]>>(
    "produto/listar_produto",
    (url) => httpClient.get(url)
  );
  const [lista, setLista] = useState<Produto[]>([]);

  useEffect(() => {
    setLista(result?.data || []);
  }, [result]);

  const editar = (produto: Produto) => {
    const url = `/cadastros/produtos?id=${produto.id}`;
    Router.push(url);
  };

  const deletar = (produto: Produto) => {
    service.deletar(produto.id).then((resp) => {
      setMessages([{ tipo: "success", texto: "Produto Excluido" }]);
    });
    const listaAlterada: Produto[] = lista?.filter((p) => p.id !== produto.id);
    setLista(listaAlterada);
  };
  return (
    <Layout mensagens={messages} titulo="Listagem de Produtos">
      <div className="control">
        <Link href="/cadastros/produtos">
          <button className="button is-warning">Novo</button>
        </Link>
        <br />
        <br />
        <Loader show={!result} />
      </div>
      <TabelaProdutos produtos={lista} onEdit={editar} onDelete={deletar} />
    </Layout>
  );
};
