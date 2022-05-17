// import { useHttp } from "@/middleware/httpMiddleware";
async function auth() {
  // Хотел fake json использовать, но там поля сино отличаются
  /*  const data = await useHttp({
    url: "users/3",
  }); */
  const data = {
    name: "Артем",
    surname: "Масловский",
    patronymic: "Андреевич",
    birthday: "1995-08-31",

    number: "89218868661",
    email: "email@mail.ru",
  };
  return data;
}

export { auth };
