
import {
  useState,
  useEffect,
  FormEvent,

} from "react";
import {  } from "../../shared/components";
import { ClientesService } from "../../shared/services/api/cliente/clientes";
import {
  PerfilService,
  IDetalhePerfil,
} from "../../shared/services/api/perfil/perfil";
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
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBase";
import { useNavigate } from 'react-router-dom';
interface Novoclientes {
  type: string;
  name: string;
  document: string;
  observation: string;
  active: boolean;
  id_profile: string;
}

export const Novoclientes = () => {
  const [formData, setFormData] = useState<Novoclientes>({
    type: "F",
    name: "",
    document: "",
    observation: "",
    active: true,
    id_profile: "",
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

  const handleTypeChange = (e: SelectChangeEvent<string>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      type: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await ClientesService.create(formData);
      setSubmitStatus("success");
      navigate('/clientes');
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    }
  };

  return (
    <LayoutBaseDePagina>
      <form onSubmit={handleSubmit} className="appointment-form"  style={{ margin: "0 4rem" }}>
        <Typography variant="h3" align="center">
        Novo Cliente
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel id="type-select-label">Tipo</InputLabel>
          <Select
            labelId="type-select-label"
            name="type"
            value={formData.type}
            onChange={handleTypeChange}
            required
          >
            <MenuItem value="F">Física</MenuItem>
            <MenuItem value="J">Jurídica</MenuItem>
          </Select>
        </FormControl>

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
          label="Documento"
          name="document"
          value={formData.document}
          onChange={handleInputChange}
          required
          fullWidth
          margin="normal"
        />

        <TextField
          label="Observação"
          name="observation"
          value={formData.observation}
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
            Criar Cliente
          </Button>
        </div>

        {submitStatus === "success" && (
          <Alert severity="success" style={{ marginTop: "1rem" }}>
            Cliente criado com sucesso!
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
