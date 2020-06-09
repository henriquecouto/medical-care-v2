import React, { useContext, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./components/Header";
import { GlobalContext } from "./Context/global";
import {
  Grid,
  CircularProgress,
  Typography,
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  Link,
} from "@material-ui/core";
import Login from "./components/Login";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    overflowY: "auto",
    // width: "90%",
    height: "calc(100vh - 64px)",
    scrollBehavior: "smooth",
  },
}));

const menu = [
  {
    text: "Visão Geral",
    id: "visao-geral",
    desc:
      "A aplicação consiste em um assistente virtual, para o auxílio de pacientes. Com os comandos de voz descritos abaixo, é possível visualizar tratamentos que estão em execução e os que foram finalizados. A Aplicação também notifica o usuário quando é a hora de tomar o remédio.",
    command: [],
  },
  {
    text: "Instruções basicas (Importante!!!)",
    id: "instruçoes-basicas",
    desc:
      "Para usar os comandos de voz basta apertar o botão no centro inferior da tela e falar o comando. As notificações serão dadas com base nos remédios listados nos tratamentos que ja estão no dispositivo. Para confirmar que tomou o remédio feche a apllicação e aperte na notificação que chegou com o nome do remédio ai basta confirmar quando a assistente perguntar se você tomou o remedio. Também existe um bnotão para carregar os dados do servidor dentro do app no lado superior esquerdo da tela.",
    command: [],
  },
  {
    text: "Visualizar os tratamentos",
    id: "iniciar-atendimento",
    desc:
      "visualiza os tratamentos que estão em execução no momento, mostrando todas as informações do mesmo.",
    command: ["Mostrar Tratamento. - ou - Listar tratamentos."],
  },
  {
    text: "Atualizar",
    id: "finalizar-atendimento",
    desc: "Faz o app buscar e atualizar seudados com o servidor.",
    command: ["Atualizar. - ou - Atualizar tratamentos. - ou - recarregar."],
  },
  {
    text: "Mostrar tratamentos concluídos",
    id: "adicionar-exame",
    desc:
      "Lista todos os tratamentos que você ja finalizou.",
    command: ["Listar concluídos."],
  },
  {
    text: "Listar remédios",
    id: "remover-exame",
    desc: "Lista todos os remédios que você está tomando.",
    command: ["Mostrar remédios. - ou - Listar remédios."],
  },
];

export default function Manual() {
  const [{ user, api }] = useContext(GlobalContext);
  const classes = useStyles();
  const [selected, setSelected] = useState("");

  if (!api) {
    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  if (!user && false) {
    return <Login />;
  }
  return (
    <Header title="Manual - Medical Care">
      <div className={classes.root}>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <List>
              {menu.map(({ text, id }) => (
                <Link
                  href={"#" + id}
                  key={id}
                  style={{ textDecoration: "inherit" }}
                  onClick={() => {
                    setSelected(id);
                  }}
                >
                  <ListItem button>
                    <ListItemText primary={text} />
                  </ListItem>
                </Link>
              ))}
            </List>
          </div>
        </Drawer>
        <Grid
          container
          // direction="column"
          spacing={6}
          className={classes.content}
        >
          {menu.map(({ text, id, desc, command }) => {
            return (
              <Grid item xs={12} key={id}>
                <Typography
                  variant="h4"
                  id={id}
                  style={
                    selected === id
                      ? {
                          backgroundColor: "#00968822",
                          // color: "#fff",
                          borderRadius: 5,
                          padding: "0 20px",
                        }
                      : {}
                  }
                >
                  {selected === id && "👉 "}
                  {text}
                </Typography>
                <Typography variant="h6"> {desc} </Typography>
                {command.map((v, i) => (
                  <div key={i} style={{ marginTop: 20 }}>
                    Exemplo:{" "}
                    <Typography
                      variant="button"
                      style={{
                        backgroundColor: "#00968844",
                        padding: 10,
                        borderRadius: 5,
                      }}
                    >
                      {v}
                    </Typography>
                  </div>
                ))}
              </Grid>
            );
          })}
        </Grid>
      </div>
    </Header>
  );
}
