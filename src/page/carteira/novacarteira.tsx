import { useState, FormEvent, useEffect } from "react";
import {} from "../../shared/components";
import { CarteiraService } from "../../shared/services/api/carteira/carteira";
import {
  TextField,
  Button,
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import {
  ClientesService,
  IDetalheCliente,
} from "../../shared/services/api/cliente/clientes";
import {
  listedsharesService,
  IListagemlistedshares,
  IDetalhelistedshares,
} from "../../shared/services/api/acoes_listadas/acoes_listadas";

import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBase";
import { useNavigate } from "react-router-dom";

interface Novacarteira {
  id_client: string;
  id_listed_shares: string;
  share_price: string;
  quantity_purchased: string;
  invested_amount: string;
}

export const Novacarteira = () => {
  const [formData, setFormData] = useState<Novacarteira>({
    id_client: "",
    id_listed_shares: "",
    share_price: "",
    quantity_purchased: "",
    invested_amount: "",
  });
  const navigate = useNavigate();
  const [cliente, setCliente] = useState<IDetalheCliente>();
  const [acoes, setAcoes] = useState<IListagemlistedshares>();

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await ClientesService.getAll();
        if (response instanceof Error) {
          console.error(response.message);
        } else {
          setCliente(response.data.items);
        }
      } catch (error) {
        console.error("Erro ao buscar perfis:", error);
      }
    };
    fetchCliente();
  }, []);

  useEffect(() => {
    const fetchAcoes = async () => {
      try {
        if (formData.id_client) {
          // Se houver cliente selecionado, busca apenas as ações disponíveis para esse cliente
          const response = await listedsharesService.getAll();
          if (response instanceof Error) {
            console.error(response.message);
          } else {
            // Filtra as ações com base no id_profile do cliente selecionado
            const acoesFiltradas = response.data.items.filter(
              (acao: IDetalhelistedshares) =>
                acao.id_profile === formData.id_client
            );
            setAcoes(acoesFiltradas);
          }
        } else {
          // Se não houver cliente selecionado, busca todas as ações disponíveis
          const response = await listedsharesService.getAll();
          if (response instanceof Error) {
            console.error(response.message);
          } else {
            setAcoes(response.data.items);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar ações:", error);
      }
    };
    fetchAcoes();
  }, [formData.id_client]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleClienteChange = (e: SelectChangeEvent<string>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      id_client: e.target.value,
    }));
  };

  const handleAcoesChange = (e: SelectChangeEvent<string>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      id_listed_shares: e.target.value,
    }));
  };

  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await CarteiraService.create(formData);
      setSubmitStatus("success");
      navigate("/carteira");
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    }
  };

  return (
    <LayoutBaseDePagina>
      <form
        onSubmit={handleSubmit}
        className="appointment-form"
        style={{ margin: "0 4rem" }}
      >
        <Typography variant="h3" align="center">
          Criar Carteira
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel id="cliente-select-label">Cliente</InputLabel>
          <Select
            labelId="cliente-select-label"
            value={formData.id_client}
            onChange={handleClienteChange}
            required
          >
            {Array.isArray(cliente) ? (
              cliente.map(
                (a: { id: string; name: string; id_profile: number }) => (
                  <MenuItem key={a.id.toString()} value={a.id}>
                    {a.name} (
                    {a.id_profile === 1
                      ? "Conservador"
                      : a.id_profile === 2
                      ? "Moderado"
                      : a.id_profile === 3
                      ? "Arrojado"
                      : "Indefinido"}
                    )
                  </MenuItem>
                )
              )
            ) : (
              <MenuItem value="" disabled>
                Carregando clientes...
              </MenuItem>
            )}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel id="acoes-select-label">Ações</InputLabel>
          <Select
            labelId="acoes-select-label"
            value={formData.id_listed_shares}
            onChange={handleAcoesChange}
            required
          >
            {Array.isArray(acoes) ? (
              acoes.map((a: { id: string; name: string }) => (
                <MenuItem key={a.id.toString()} value={a.id}>
                  {a.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="" disabled>
                Carregando ações...
              </MenuItem>
            )}
          </Select>
        </FormControl>

        <TextField
          name="share_price"
          label="Preço da Ação"
          variant="outlined"
          value={formData.share_price}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />

        <TextField
          name="quantity_purchased"
          label="Quantidade Comprada"
          variant="outlined"
          value={formData.quantity_purchased}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />

        <TextField
          name="invested_amount"
          label="Valor Investido"
          variant="outlined"
          value={formData.invested_amount}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />

        <div className="container-appointment-form-btn">
          <Button type="submit" variant="contained" color="primary">
            Criar Carteira
          </Button>
        </div>

        {submitStatus === "success" && (
          <Alert severity="success" style={{ marginTop: "1rem" }}>
            Carteira criada com sucesso!
          </Alert>
        )}
        {submitStatus === "error" && (
          <Alert severity="error" style={{ marginTop: "1rem" }}>
            Erro ao criar cliente. Tente novamente.
          </Alert>
        )}
      </form>
    </LayoutBaseDePagina>
  );
};
