import { useState, useEffect} from "react";
import Link from "next/link";
import { Layout, Input, Message,InputMoney } from "components";
import { Produto } from "app/models/produtos";
import { useProdutoService } from "app/services/produto.service";
import { converterEmBigDecimal, formatReal } from "app/util/money";
import { Alert } from "components/common/message";
import * as yup from "yup";
import { useRouter } from "next/router"; 
const msgCampoObrigatorio = "Campo Obrigatorio";

const validationSchema = yup.object().shape({
  sku: yup.string().trim().required(msgCampoObrigatorio),
  nome: yup.string().trim().required(msgCampoObrigatorio),
  descricao: yup.string().trim().required(msgCampoObrigatorio),
  preco: yup
    .number()
    .required(msgCampoObrigatorio)
    .moreThan(0, " Valor deve ser maior que 0"),
});

interface FormErros {
  sku?: string;
  nome?: string;
  descricao?: string;
  preco?: string;
}

export const CadastroProdutos: React.FC = () => {
  const service = useProdutoService();
  const [sku, setSku] = useState<string>("");
  const [id, setId] = useState<number>();
  const [cadastro, setCadastro] = useState<string>();
  const [preco, setPreco] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [messages, setMessages] = useState<Array<Alert>>([]);
  const [errors, setErrors] = useState<FormErros>({});
  const router = useRouter();

  const { id: queryId } = router.query;

  useEffect(() => {
    if (queryId) {
      service.carregarProduto(queryId).then((produtoEncontrado) => { 
        setId(produtoEncontrado.id);
        setDesc(`${produtoEncontrado.descricao}`);
        setNome(`${produtoEncontrado.nome}`);
        setPreco(formatReal(`${produtoEncontrado.preco}`));
        setSku(`${produtoEncontrado.sku}`);
        setCadastro(produtoEncontrado.cadastro)
      });
    }
  }, [queryId]);

  const submit = () => {
    const produto: Produto = {
      id,
      sku,
      preco: converterEmBigDecimal(preco),
      descricao: desc,
      nome,
    };

    validationSchema
      .validate(produto)
      .then((obj) => {
        setErrors({});
        if (id) {
          service
            .actualizar(produto)
            .then((res) =>
              setMessages([
                { tipo: "success", texto: "Produto Actualizado Com Sucesso" },
              ])
            );
        } else {
          service.salvar(produto).then((produtoResposta) => {
            setId(produtoResposta.id);
            setCadastro(produtoResposta.cadastro);
            setMessages([
              { tipo: "success", texto: "Produto Salvo Com Sucesso" },
            ]);
          });
        }
      })
      .catch((error) => {
        const field = error.path;
        const message = error.message;
        setErrors({
          [field]: message,
        });
      });
  };
  return (
    <Layout titulo="Cadastro de Produto" mensagens={messages}>
      {id && (
        <div className="columns">
          <Input
            label="Codigo:"
            columnsClasses="is-half"
            value={id + ""}
            id="inputId"
            disabled
          />

          <Input
            label="Data Cadastro: *"
            columnsClasses="is-half"
            value={cadastro}
            id="inputDataCadastro"
            disabled
          />
        </div>
      )}

      <div className="columns">
        <Input
          onChange={e => setSku(e.target.value)}
          label="SKU: *"
          columnsClasses="is-half"
          value={sku}
          id="inputSku"
          placeholder="Digita o SKU do Produto"
          error={errors.sku}
        />

        <InputMoney
          onChange={e => setPreco(e.target.value)}
          label="Preço: *"
          columnsClasses="is-one-quarter"
          value={preco}
          id="inputPreco"
          placeholder="Digita o Preço do Produto" 
          maxLength={16}
          error={errors.preco}
        />
      </div>

      <div className="columns">
        <Input
          onChange={e => setNome(e.target.value)}
          label="Nome: *"
          columnsClasses="is-full"
          value={nome}
          id="inputNome"
          placeholder="Digita o Nome do Produto"
          error={errors.nome}
        />
      </div>

      <div className="columns">
        <div className="field column is-full">
          <label className="label" htmlFor="inputDesc">
            Descrição: *
          </label>
          <div className="control">
            <textarea
              value={desc}
              onChange={(event) => {
                setDesc(event.target.value);
              }}
              id="inputDesc"
              className="textarea"
              placeholder="Digita a Descrição do Produto"
            />
            {errors.descricao && (
              <p className="help is-danger">{errors.descricao}</p>
            )}
          </div>
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <Link href="/consultas/produtos">
            <button className="button is-danger">Voltar</button>
          </Link>
        </div>
        <div className="control">
          <button className="button is-link" onClick={submit}>
            {id ? "Actualizar" : "Salvar"}
          </button>
        </div>
      </div>
    </Layout>
  );
};
