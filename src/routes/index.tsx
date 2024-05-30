import { Routes, Route } from "react-router-dom";
import { useDrawerContext } from "../shared/contexts";
import { useEffect } from "react";
import {
  Dashboard,
  Usuarios,
  Clientes,
  Perfil,
  AcoesListadas,
  Carteira,
  Historico,
  Novoclientes,
  NovaAcao,
  Novacarteira,
  Novohistorico,
} from "../page";
import { MenuLateral } from "../shared/components/menu-lateral/MenuLateral";

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: "home",
        label: "Pagina Inicial",
        path: "/pagina-inicial",
      },
      {
        icon: "account_circleIcon",
        label: "Usuario",
        path: "/usuario",
      },
      {
        icon: "groupIcon",
        label: "Clientes",
        path: "/clientes",
      },
      {
        icon: "faceIcon",
        label: "Perfil",
        path: "/perfil",
      },
      {
        icon: "view_listIcon",
        label: "Ações listadas",
        path: "/acoes_listadas",
      },
      {
        icon: "trending_upIcon",
        label: "Carteira de investimeto",
        path: "/carteira",
      },
      {
        icon: "timelineIcon",
        label: "Histórico da ação",
        path: "/historico",
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route
        path="/novohistorico"
        element={
          <MenuLateral>
            <Novohistorico />
          </MenuLateral>
        }
      />
      <Route
        path="/novacarteira"
        element={
          <MenuLateral>
            <Novacarteira />
          </MenuLateral>
        }
      />
      <Route
        path="/NovaAcao"
        element={
          <MenuLateral>
            <NovaAcao />
          </MenuLateral>
        }
      />

      <Route
        path="/Novoclientes"
        element={
          <MenuLateral>
            <Novoclientes />
          </MenuLateral>
        }
      />
      <Route
        path="/pagina-inicial"
        element={
          <MenuLateral>
            <Dashboard />
          </MenuLateral>
        }
      />

      <Route
        path="/clientes"
        element={
          <MenuLateral>
            <Clientes />
          </MenuLateral>
        }
      />

      <Route
        path="/usuario"
        element={
          <MenuLateral>
            <Usuarios />
          </MenuLateral>
        }
      />

      <Route
        path="/perfil"
        element={
          <MenuLateral>
            <Perfil />
          </MenuLateral>
        }
      />

      {
        <>
          <Route
            path="/acoes_listadas"
            element={
              <MenuLateral>
                <AcoesListadas />
              </MenuLateral>
            }
          />

          <Route
            path="/carteira"
            element={
              <MenuLateral>
                <Carteira />
              </MenuLateral>
            }
          />
        </>
      }

      <Route
        path="/historico"
        element={
          <MenuLateral>
            <Historico />
          </MenuLateral>
        }
      />
    </Routes>
  );
};
