import { CircularProgress } from "@material-ui/core";
import Axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { GlobalContext } from "../../Context/global";
import Appointment from "../Appointment";
import Demographic from "../Demographic";

const ExternalAccess = () => {
  const params = new URLSearchParams(useLocation().search);
  const [{ api }] = useContext(GlobalContext);

  const [clinicalData, setClinicalData] = useState();

  const loadData = useCallback(async () => {
    if (api) {
      const contractAddress = JSON.parse(params.get("contractAddress"));
      const accountAddress = JSON.parse(params.get("accountAddress"));

      const { data } = await Axios.patch(`${api}/appointments/external`, {
        contractAddress,
        accountAddress,
      });
      setClinicalData(data);
    }
  }, [api]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (!clinicalData) {
    return <CircularProgress />;
  }

  return (
    <>
      <Demographic patient={clinicalData.patient} />
      <Appointment data={clinicalData.appointment} />
    </>
  );
};

export default ExternalAccess;
