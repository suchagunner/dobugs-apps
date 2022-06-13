import { useNavigate } from "react-router-dom";

import Btn from "../components/atoms/Btn";

function Page404() {
  const navigate = useNavigate();

  return (
    <main className="page 404">
      <h1 className="page__header">페이지가 존재하지 않습니다.</h1>

      <section className="page__body"></section>

      <div className="page__actions">
        <Btn
          label="홈으로 가기"
          onClick={() => navigate("/", { replace: true })}
        ></Btn>
      </div>
    </main>
  );
}

export default Page404;
