import React, { useContext, useState, useCallback, useEffect } from "react";
import { Typography, Grid } from "@material-ui/core";
import { Route } from "react-router-dom";
import Header from "./components/Header";
import { GlobalContext } from "./Context/global";
import Login from "./components/Login";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import Card from "./components/Card";
import Axios from "axios";
import { getUrl } from "./utils/API";

const periodValues = ["daily", "monthly", "yearly"];

export default function Admin() {
  const [{ user, api }] = useContext(GlobalContext);
  const [selectedPeriod, setSelectedPeriod] = useState({
    value: periodValues[1],
    quantity: 5,
  });

  const [storage, setStorage] = useState([]);
  const [assurance, setAssurance] = useState([]);
  const [period, setPeriod] = useState([]);

  const loadData = useCallback(
    async (type, callback, body = {}, req) => {
      if (api) {
        const { data } = await Axios[req](`${api}/analytics/${type}`, body);
        callback(data);
      }
    },
    [api]
  );

  useEffect(() => {
    if (user) {
      loadData("blocked", setStorage, {}, "get");
    }
  }, [loadData, user, selectedPeriod]);

  useEffect(() => {
    if (user) {
      loadData("assurance", setAssurance, {}, "get");
    }
  }, [loadData, user]);

  useEffect(() => {
    if (user) {
      loadData("period", setPeriod, selectedPeriod, "get");
    }
  }, [loadData, user, selectedPeriod]);

  if (!user && api) {
    return <Login />;
  }

  console.log(period);

  return (
    <Header>
      <Route exact path="/admin">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Card title="Status de armazenamento blockchain">
              <BarChart
                width={window.innerWidth / 2 - 100}
                height={300}
                data={storage}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="blocked"
                  name="Armazenados"
                  stackId="a"
                  fill="#82ca9d"
                />
                <Bar
                  dataKey="waiting"
                  name="Aguardando armazenamento"
                  stackId="a"
                  fill="#8884d8"
                />
              </BarChart>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card title="Confiança de armazenamento blockchain">
              <BarChart
                width={window.innerWidth / 2 - 100}
                height={300}
                data={assurance}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="right"
                  name="Armazenados corretamente"
                  stackId="a"
                  fill="#82ca9d"
                />
                <Bar
                  dataKey="wrong"
                  name="Divergencia no objeto armazenado"
                  stackId="a"
                  fill="#8884d8"
                />
              </BarChart>
            </Card>
          </Grid>
          <Grid item xs>
            <Card title="Últimos 5 meses">
              <AreaChart
                width={window.innerWidth - 100}
                height={300}
                data={period}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="registered"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
                <Area
                  type="monotone"
                  dataKey="blocked"
                  stroke="#82ca9d"
                  fillOpacity={1}
                  fill="url(#colorPv)"
                />
              </AreaChart>
            </Card>
          </Grid>
        </Grid>
      </Route>
    </Header>
  );
}
