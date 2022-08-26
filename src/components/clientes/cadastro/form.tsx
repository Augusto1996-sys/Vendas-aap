import { Cliente } from "app/models/clientes";
import { useFormik } from "formik";
import { Input, InputCPF, InputTelefone, InputDate} from "components/common/input";
import { formatWithOptions } from "util";

interface ClienteFormProps {
  cliente: Cliente;
  onSubmit: (cliente: Cliente) => void;
}

const formScheme: Cliente = {
  id: "",
  cpf: "",
  cadastro: "",
  nome: "", 
  nascimento: "",
  endereco: "",
  email: "",
  telefone: "",
};

export const ClienteForm: React.FC<ClienteFormProps> = ({
  cliente,
  onSubmit,
}) => {
  const formik = useFormik<Cliente>({
    initialValues: { ...formScheme, ...cliente },
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {formik.values.id && (
        <div className="columns">
          <Input
            label="Codigo: *"
            id="id"
            name="id"
            columnsClasses="is-half"
            disabled
            value={formik.values.id}
          />
          <Input
            label="Data de Registro: *"
            id="cadastro"
            name="cadastro"
            disabled
            columnsClasses="is-half"
            value={formik.values.cadastro}
          />
        </div>
      )}

      <div className="columns">
        <Input
          label="Nome: *"
          id="nome"
          name="nome"
          autoComplete="off"
          columnsClasses="is-full"
          onChange={formik.handleChange}
          value={formik.values.nome}
        />
      </div>
      <div className="columns">
        <InputCPF
          label="CPF: *"
          id="cpf"
          name="cpf"
          autoComplete="off"
          columnsClasses="is-half"
          onChange={formik.handleChange}
          value={formik.values.cpf}
        />
        <InputDate
          label="Data Nascimento [DD/MM/YYYY]: *"
          id="nascimento"
          name="nascimento"
          autoComplete="off"
          placeholder="mm/dd/yyyy"
          columnsClasses="is-half"
          onChange={formik.handleChange}
          value={formik.values.nascimento}
        />
      </div>

      <div className="columns">
        <Input
          label="Endereco: *"
          id="endereco"
          name="endereco"
          autoComplete="off"
          columnsClasses="is-full"
          onChange={formik.handleChange}
          value={formik.values.endereco}
        />
      </div>
      <div className="columns">
        <Input
          label="Email: *"
          id="email"
          name="email"
          autoComplete="off"
          columnsClasses="is-half"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <InputTelefone
          label="Telefone: *"
          id="telefone"
          name="telefone"
          autoComplete="off"
          columnsClasses="is-half"
          onChange={formik.handleChange}
          value={formik.values.telefone}
        />
      </div>
      <div className="field is-grouped">
        <div className="control is-link">
          <button type="submit" className="button is-success">
            {formik.values.id ? "Actualizar" : "Salvar"}
          </button>
        </div>
      </div>
    </form>
  );
};


