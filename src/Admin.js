import React, { useContext, useState, useCallback, useEffect } from "react";
import { Typography } from "@material-ui/core";
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
} from "recharts";
import API from "./utils/API";
import Card from "./components/Card";

export default function Admin() {
  const [{ user }] = useContext(GlobalContext);

  const [appointments, setAppointments] = useState([]);

  const loadAppointments = useCallback(() => {
    API.get("/appointments", {
      headers: { Authorization: `Bearer ${user.token}` },
    }).then(({ data: { data } }) => {
      let parsedData = data.map(
        ({ _id, blocked, blockedCorrect, registrationDate }) => {
          console.log(_id, registrationDate, blockedCorrect);
          return {
            blocked,
            // date: registrationDate.split("T")[0],
            date: "Tudo",
            blockedCorrect,
          };
        }
      );

      const quantitiesBlocked = {};
      const quantitiesUnblocked = {};

      const quantitiesBlockedCorrectly = {};
      const quantitiesBlockedUncorrectly = {};

      parsedData = parsedData.filter((v, i) => {
        if (v.blocked) {
          typeof quantitiesBlocked[JSON.stringify(v.date)] === "number"
            ? (quantitiesBlocked[JSON.stringify(v.date)] += 1)
            : (quantitiesBlocked[JSON.stringify(v.date)] = 1);

          if (v.blockedCorrect) {
            typeof quantitiesBlockedCorrectly[JSON.stringify(v.date)] ===
            "number"
              ? (quantitiesBlockedCorrectly[JSON.stringify(v.date)] += 1)
              : (quantitiesBlockedCorrectly[JSON.stringify(v.date)] = 1);
          } else {
            typeof quantitiesBlockedUncorrectly[JSON.stringify(v.date)] ===
            "number"
              ? (quantitiesBlockedUncorrectly[JSON.stringify(v.date)] += 1)
              : (quantitiesBlockedUncorrectly[JSON.stringify(v.date)] = 1);
          }
        } else {
          typeof quantitiesUnblocked[JSON.stringify(v.date)] === "number"
            ? (quantitiesUnblocked[JSON.stringify(v.date)] += 1)
            : (quantitiesUnblocked[JSON.stringify(v.date)] = 1);
        }

        if (
          JSON.stringify(v.date) !==
          (parsedData[i - 1] && JSON.stringify(parsedData[i - 1].date))
        ) {
          return v;
        }
      });

      parsedData = parsedData.map((v) => {
        return {
          ...v,
          blocked: quantitiesBlocked[JSON.stringify(v.date)] || 0,
          unblocked: quantitiesUnblocked[JSON.stringify(v.date)] || 0,
          blockedCorrect:
            quantitiesBlockedCorrectly[JSON.stringify(v.date)] || 0,
          blockedUncorrect:
            quantitiesBlockedUncorrectly[JSON.stringify(v.date)] || 0,
        };
      });

      setAppointments(parsedData);
    });
  }, [user]);

  useEffect(() => {
    if (user) {
      loadAppointments();
    }
  }, [loadAppointments, user]);

  if (!user) {
    return <Login />;
  }

  return (
    <Header>
      <Route exact path="/admin">
        <Card title="Status de armazenamento blockchain">
          <BarChart
            width={window.innerWidth - 100}
            height={300}
            data={appointments}
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
              dataKey="unblocked"
              name="Aguardando armazenamento"
              stackId="a"
              fill="#8884d8"
            />
          </BarChart>
        </Card>
        <br />
        <br />
        <Card title="Confiança de armazenamento blockchain">
          <BarChart
            width={window.innerWidth - 100}
            height={300}
            data={appointments}
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
              dataKey="blockedCorrect"
              name="Armazenados corretamente"
              stackId="a"
              fill="#82ca9d"
            />
            <Bar
              dataKey="blockedUncorrect"
              name="Divergencia no objeto armazenado"
              stackId="a"
              fill="#8884d8"
            />
          </BarChart>
        </Card>
      </Route>
    </Header>
  );
}
