import { useState, FormEvent, useEffect } from "react";
import {} from "../../shared/components";
import { HistoricoService } from "../../shared/services/api/historico/historico";
import {
  listedsharesService,
  IListagemlistedshares,
} from "../../shared/services/api/acoes_listadas/acoes_listadas";

import {
  PerfilService,
  IListagemPerfil,
} from "../../shared/services/api/perfil/perfil";

import { useNavigate } from "react-router-dom";

import {
  Avatar,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBase";

interface Novohistorico {
  id_listed_shares: string;
  id_profile: string;
  date: string;
  last_value: string;
  opening: string;
  high: string;
  low: string;
  trading_volume: string;
  percentage_change: string;
}

export const Novohistorico = () => {
  const [formData, setFormData] = useState<Novohistorico>({
    id_listed_shares: "",
    id_profile: "",
    date: "",
    last_value: "",
    opening: "",
    high: "",
    low: "",
    trading_volume: "",
    percentage_change: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  const [acoes, setAcoes] = useState<IListagemlistedshares>();
  const [perfis, setPerfis] = useState<IListagemPerfil>();
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  useEffect(() => {
    const fetchPerfis = async () => {
      try {
        const response = await PerfilService.getAll();
        if (response instanceof Error) {
          console.error(response.message);
        } else {
          setPerfis(response.data.items);
        }
      } catch (error) {
        console.error("Erro ao buscar perfis:", error);
      }
    };
    fetchPerfis();
  }, []);

  useEffect(() => {
    const fetchAcoes = async () => {
      try {
        const response = await listedsharesService.getAll();
        if (response instanceof Error) {
          console.error(response.message);
        } else {
          setAcoes(response.data.items);
        }
      } catch (error) {
        console.error("Erro ao buscar perfis:", error);
      }
    };
    fetchAcoes();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await HistoricoService.create(formData);
      setSubmitStatus("success");
      navigate("/historico");
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    }
  };

  const handlePerfilChange = (e: SelectChangeEvent<string>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      id_profile: e.target.value,
    }));
  };

  const handleAcoesChange = (e: SelectChangeEvent<string>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      id_listed_shares: e.target.value,
    }));
  };

  return (
    <LayoutBaseDePagina>
      <form
        onSubmit={handleSubmit}
        className="appointment-form"
        style={{ margin: "0 4rem" }}
      >
        <Typography variant="h3" align="center">
          Novo historico
        </Typography>

        <FormControl fullWidth margin="normal" sx={{ margin: "normal" }}>
          <InputLabel id=" ">Perfil</InputLabel>
          <Select
            labelId=""
            value={formData.id_profile}
            onChange={handlePerfilChange}
            required
          >
            {Array.isArray(perfis) ? (
              perfis.map((p: { id: string; description: string }) => (
                <MenuItem key={p.id.toString()} value={p.id}>
                  {p.description}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="" disabled></MenuItem>
            )}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" sx={{}}>
          <InputLabel id=" ">Ações</InputLabel>
          <Select
            labelId=""
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
              <MenuItem value="" disabled></MenuItem>
            )}
          </Select>
        </FormControl>

        <TextField
          name="date"
          type="date"
          value={formData.date}
          onChange={handleInputChange}
          required
          margin="normal"
        />
        <TextField
          name="last_value"
          label={<strong>Último valor</strong>}
          value={formData.last_value}
          onChange={handleInputChange}
          required
          margin="normal"
        />
        <TextField
          name="opening"
          label={<strong>Abertura</strong>}
          value={formData.opening}
          onChange={handleInputChange}
          required
          margin="normal"
        />

        <TextField
          name="high"
          label={<strong>Alto</strong>}
          value={formData.high}
          onChange={handleInputChange}
          required
          margin="normal"
        />

        <TextField
          name="low"
          label={<strong>Baixo</strong>}
          value={formData.low}
          onChange={handleInputChange}
          required
          margin="normal"
        />

        <TextField
          name="trading_volume"
          label={<strong>Volume de negociação</strong>}
          value={formData.trading_volume}
          onChange={handleInputChange}
          required
          margin="normal"
        />

        <TextField
          name="percentage_change"
          label={<strong>Alteração percentual</strong>}
          value={formData.percentage_change}
          onChange={handleInputChange}
          required
          margin="normal"
        />

        {submitStatus === "success" && (
          <Avatar sx={{ bgcolor: "success.main" }}></Avatar>
        )}
        {submitStatus === "error" && (
          <Avatar sx={{ bgcolor: "error.main" }}></Avatar>
        )}

        <div className="container-appointment-form-btn">
          <Button type="submit" variant="contained" color="primary">
            Criar Histórico
          </Button>
        </div>
      </form>
    </LayoutBaseDePagina>
  );
};
