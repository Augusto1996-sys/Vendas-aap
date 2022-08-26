import { Produto } from "app/models/produtos";
import { useState } from "react";
import useSWR from "swr";
interface TabelaProdutoProps {
  produtos: Array<Produto>;
  onEdit: (produto: Produto) => void;
  onDelete: (produto: Produto) => void;
}

export const TabelaProdutos: React.FC<TabelaProdutoProps> = ({
  produtos,
  onEdit,
  onDelete,
}) => {
  return (
    <table className="table is-hoverable is-striped">
      <thead>
        <tr>
          <th>Sku</th>
          <th>Codigo</th>
          <th>Nome</th>
          <th>Preco</th>
          <th>Accoes</th>
        </tr>
      </thead>

      <tbody>
        {produtos.map((produto) => (
          <ProdutoRow
            onDelete={onDelete}
            onEdit={onEdit}
            key={produto.id}
            produto={produto}
          />
        ))}
      </tbody>
    </table>
  );
};

interface ProdutoRowProps {
  produto: Produto;
  onEdit: (produto: Produto) => void;
  onDelete: (produto: Produto) => void;
}

const ProdutoRow: React.FC<ProdutoRowProps> = ({
  produto,
  onEdit,
  onDelete,
}) => {
  const [deletando, setDeletando] = useState<Boolean>(false);

  const onDeleteClick = (produto: Produto) => {
    if (deletando) {
      onDelete(produto);
      setDeletando(false);
    } else {
      setDeletando(true);
    }
  };

  const canceladelete = () => setDeletando(false)
  return (
    <tr>
      <td>{produto.id}</td>
      <td>{produto.sku}</td>
      <td>{produto.nome}</td>
      <td>{produto.preco}</td>
      <td>
        {!deletando && (
          <button
            onClick={(e) => onEdit(produto)}
            className="button is-success is-rounded is-small"
          >
            Editar
          </button>
        )}
        <button
          onClick={(e) => onDeleteClick(produto)}
          className="button is-danger is-rounded is-small"
        >
          {deletando ? "Confirmar" : "Deletar"}
        </button>


        {deletando && (
          <button
            onClick={canceladelete}
            className="button is-warning is-rounded is-small"
          >
            Cancelar
          </button>
        )}
      </td>
    </tr>
  );
};
