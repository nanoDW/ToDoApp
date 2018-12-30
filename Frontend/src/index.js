import "./style.sass";

function userLogging() {
  const nick = document.getElementById("nick").value;
  const password = document.getElementById("password").value;

  const data = {
    nick: nick,
    password: password
  };

  console.log("tu jestem");
  (async () => {
    const rawResponse = await fetch(
      "http://localhost:4500/api/auth", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        dataType: "application/json"
      }
    );
    JSON.stringify(rawResponse);
    console.log(rawResponse);
    const content = await JSON.stringify(rawResponse);
    console.log(JSON.parse(content));
  })();
}

document
  .getElementsByClassName("button-auth")[0]
  .addEventListener("click", userLogging);