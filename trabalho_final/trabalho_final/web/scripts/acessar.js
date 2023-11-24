function onSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.currentTarget);
  const valores = Object.fromEntries(data);

  fetch(`http://localhost:3000/login/${valores.usuario}/${valores.senha}`, {
    method: 'get',
  }).then((response) => { 
    response.json().then((json)=>{
      localStorage.setItem("cliente", JSON.stringify(json));

      window.location.href = `site.html`
    })
  });
}

function usuarioJaLogado() {
  const cliente = localStorage.getItem("cliente");

  if(cliente){
    window.location.href = `site.html`
  }
}

usuarioJaLogado();

document.getElementById('acessarForm').addEventListener('submit', onSubmit)