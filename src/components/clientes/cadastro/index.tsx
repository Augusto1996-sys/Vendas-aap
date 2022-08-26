import { Layout } from "components/layout";
import { ClienteForm } from "./form";
import { Cliente } from "app/models/clientes";
import { useState } from "react";
import {useClienteService} from "app/services"

export const CadastroCliente: React.FC = () => {
  const [cliente, setCliente] = useState<Cliente>({});
  const service = useClienteService()



  const handleSubmit = (cliente: Cliente) => {
    if(cliente.id){
      service.actualizar(cliente).then(response => {
        console.log("Cliente Actualizado")
      })
    }else{
      
      service.salvar(cliente).then(clienteSalvo => {
        setCliente(clienteSalvo) 
        console.log(clienteSalvo)
      })
    }
  };

  return (
    <Layout titulo="Clientes">
      <ClienteForm cliente={cliente} onSubmit={handleSubmit} />
    </Layout>
  );
};
