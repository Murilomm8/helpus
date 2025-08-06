document.getElementById('formChamado').addEventListener('submit', async function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const problema = document.getElementById('problema').value.trim();

  if (!nome || !problema) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  try {
    const resposta = await fetch('http://localhost:3000/api/chamados', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, problema })
    });

    if (!resposta.ok) throw new Error('Erro ao salvar o chamado.');

    const dados = await resposta.json();

    // Feedback visual
    alert(`Chamado #${dados.id} criado com sucesso!`);

    this.reset();
  } catch (erro) {
    console.error('Erro:', erro);
    alert('Ocorreu um problema ao enviar o chamado. Tente novamente.');
  }
});
