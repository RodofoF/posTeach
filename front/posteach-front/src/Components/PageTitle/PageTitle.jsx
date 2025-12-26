import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// `button`: quando true, exibe o botão Voltar; quando false, apenas o título
export default function PageTitle({ title, button = false }) {
  const navigate = useNavigate();

  return (
    <div className="mb-4 mt-5 pt-3">
      <div className="d-flex justify-content-between align-items-center">
        <h1>{title}</h1>
        {button && (
          <Button variant="secondary" onClick={() => navigate(-1)}>Voltar</Button>
        )}
      </div>
      <hr />
    </div>
  );
}