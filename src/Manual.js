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
      "A aplicação consiste em um assistente virtual, para o auxílio de médicos. Com os comandos de voz descritos abaixo, é possível registrar dados clínicos de consultas médicas.",
    command: [],
  },
  {
    text: "Iniciar atendimento",
    id: "iniciar-atendimento",
    desc:
      "Com base no número dos pacientes disponíveis, é possível iniciar um novo atendimento",
    command: ["Olívia, prepare um atendimento para o paciente número 4"],
  },
  {
    text: "Finalizar atendimento",
    id: "finalizar-atendimento",
    desc: "Usado para cadastrar os dados da consulta.",
    command: ["Olívia, finalize o atendimento"],
  },
  {
    text: "Adicionar exame",
    id: "adicionar-exame",
    desc:
      "Usado para adicionar exames a serem realizados pelo paciente. Esse exame será registrado e posteriormente alguma outra aplicação pode acessá-lo para disponibilização ao paciente.",
    command: ["Olívia, adicione o exame Tomografia Computadorizada"],
  },
  {
    text: "Remover exame",
    id: "remover-exame",
    desc: "Usado para remover algum exame.",
    command: ["Olívia, remova o exame Tomografia Computadorizada"],
  },
  {
    text: "Adicionar sintoma",
    id: "adicionar-sintoma",
    desc: "Use para adicionar algum sintoma relatado pelo paciente.",
    command: [
      "Olívia, o paciente relatou náuseas",
      "Olívia, adicione o sintoma vômito",
    ],
  },
  {
    text: "Remover sintoma",
    id: "remover-sintoma",
    desc: "Use para remover algum sintoma inserido incorretamente.",
    command: ["Olívia, remova o sintoma náuseas"],
  },
  {
    text: "Adicionar diagnóstico",
    id: "adicionar-diagnostico",
    desc:
      "Use para adicionar o diagnóstico do paciente. É opcional, pois pode ser necessária confirmação a partir de exames.",
    command: ["Olívia, adicione o diagnóstico covid-19"],
  },
  {
    text: "Remover diagnóstico",
    id: "remover-diagnostico",
    desc: "Remove algum diagnóstico",
    command: ["Olívia, remova o diagnóstico covid-19"],
  },
  {
    text: "Adicionar remédio",
    id: "adicionar-remedio",
    desc:
      "Não obrigatório. Usado para receitar algum medicamento ao paciente, informando a quantidade de vezes que deve ser tomado e o intervalo.",
    command: ["Olívia, o paciente deve tomar dipirona a cada 12 horas 6 vezes"],
  },
  {
    text: "Remover remédio",
    id: "remover-remedio",
    desc: "Remove algum medicamento",
    command: ["Olívia, remova o remédio dipirona"],
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
