import React from "react";
import Card from "../Card";

export default function Clinical({
  exams,
  patient: { familyHistory },
  symptons,
  diagnosis,
  treatment,
}) {
  return (
    <Card title="Dados clínicos">
      {JSON.stringify({ familyHistory })}
      <br />
      {JSON.stringify({ exams })}
      <br />
      {JSON.stringify({ symptons })}
      <br />
      {JSON.stringify({ diagnosis })}
      <br />
      {JSON.stringify({ treatment })}
      <br />
    </Card>
  );
}
