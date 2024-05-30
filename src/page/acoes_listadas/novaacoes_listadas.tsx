import { useState, FormEvent, useEffect } from "react";
import {} from "../../shared/components";
import { listedsharesService } from "../../shared/services/api/acoes_listadas/acoes_listadas";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import {
  IDetalhePerfil,
  PerfilService,
} from "../../shared/services/api/perfil/perfil";
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBase";
import { useNavigate } from "react-router-dom";

interface NovaAcao {
  ticker: string;
  name: string;
  b3_sector_classification: string;
  id_profile: string;
  active: boolean;
}

export const NovaAcao = () => {
  const [formData, setFormData] = useState<NovaAcao>({
    ticker: "",
    name: "",
    b3_sector_classification: "",
    id_profile: "",
    active: true,
  });
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<IDetalhePerfil>();
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await PerfilService.getAll();
        if (response instanceof Error) {
          console.error(response.message);
        } else {
          setProfiles(response.data.items);
        }
      } catch (error) {
        console.error("Erro ao buscar perfis:", error);
      }
    };
    fetchProfiles();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleProfileChange = (e: SelectChangeEvent<string>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      id_profile: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await listedsharesService.create(formData);
      setSubmitStatus("success");
      navigate("/acoes_listadas");
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
          Criar Ação
        </Typography>
        <TextField
          label="Ticker"
          name="ticker"
          value={formData.ticker}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
        />

        <TextField
          label="Nome"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
        />

        <TextField
          label="Classificação Setorial B3"
          name="b3_sector_classification"
          value={formData.b3_sector_classification}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="profile-select-label">Perfil</InputLabel>
          <Select
            labelId="profile-select-label"
            value={formData.id_profile}
            onChange={handleProfileChange}
            required
          >
            {profiles ? (
              profiles.map((a: { id: string; description: string }) => (
                <MenuItem key={a.id.toString()} value={a.id}>
                  {a.description}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="" disabled>
                Carregando perfis...
              </MenuItem>
            )}
          </Select>
        </FormControl>

        <div className="container-appointment-form-btn">
          <Button type="submit" variant="contained" color="primary">
            Criar Ação
          </Button>
        </div>

        {submitStatus === "success" && (
          <Alert severity="success" style={{ marginTop: "1rem" }}>
            Ação criada com sucesso!
          </Alert>
        )}
        {submitStatus === "error" && (
          <Alert severity="error" style={{ marginTop: "1rem" }}>
            Erro ao criar ação. Tente novamente.
          </Alert>
        )}
      </form>
    </LayoutBaseDePagina>
  );
};
