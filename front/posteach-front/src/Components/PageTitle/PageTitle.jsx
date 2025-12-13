import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function PageTitle({ title }) {
  const navigate = useNavigate();

  return (
    <div className="mb-4 mt-5 pt-3">
      <div className="d-flex justify-content-between align-items-center">
        <h1>{title}</h1>
        <Button variant="secondary" onClick={() => navigate(-1)}>Voltar</Button>
      </div>
      <hr />
    </div>
  );
}