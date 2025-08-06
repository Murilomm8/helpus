async function carregarChamados() {
  try {
    const resposta = await fetch('http://localhost:3000/api/chamados');
    if (!resposta.ok) throw new Error(`Erro ${resposta.status}: ${resposta.statusText}`);

    const chamados = await resposta.json();
    if (!Array.isArray(chamados)) {
      console.warn('API retornou formato inesperado:', chamados);
      alert('Erro de formato ao carregar chamados.');
      return;
    }

    const tabela = document.querySelector('#tabelaChamados tbody');
    tabela.innerHTML = '';

    chamados.forEach(chamado => {
      const id = chamado._id || chamado.id;
      const statusFormatado = chamado.status?.toLowerCase();
      const linha = document.createElement('tr');

      if (statusFormatado === 'resolvido') linha.classList.add('table-success');

      let acoes = `
        <button class="btn btn-outline-info btn-sm me-1 visualizar" data-id="${id}" title="Visualizar">
          <i class="bi bi-eye"></i>
        </button>
      `;

      if (statusFormatado === 'aberto') {
        acoes += `
          <button class="btn btn-outline-success btn-sm me-1 resolver" data-id="${id}" title="Resolver">
            <i class="bi bi-check2-circle"></i>
          </button>
          <button class="btn btn-outline-danger btn-sm excluir" data-id="${id}" title="Excluir">
            <i class="bi bi-trash"></i>
          </button>
        `;
      } else {
        acoes += `
          <span class="text-success fw-semibold">
            <i class="bi bi-check-circle-fill me-1"></i>Resolvido
          </span>
        `;
      }

      linha.innerHTML = `
        <td>${id}</td>
        <td>${chamado.nome || '—'}</td>
        <td>${chamado.problema || '—'}</td>
        <td>${chamado.status || '—'}</td>
        <td>${acoes}</td>
      `;

      tabela.appendChild(linha);
    });

    conectarAcoes();
  } catch (erro) {
    console.error('Erro ao carregar chamados:', erro);
    alert('Erro ao obter chamados. Verifique a API.');
  }
}

async function resolverChamado(id) {
  if (!id) return alert('ID inválido para resolução.');

  try {
    const resposta = await fetch(`http://localhost:3000/api/chamados/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Resolvido' })
    });

    if (resposta.ok) {
      alert('Chamado resolvido com sucesso!');
      await carregarChamados();
    } else {
      const msg = await resposta.text();
      alert(`Erro ao resolver: ${msg || resposta.statusText}`);
    }
  } catch (erro) {
    console.error(`Erro ao resolver chamado ${id}:`, erro);
    alert('Erro ao resolver chamado.');
  }
}

async function excluirChamado(id) {
  if (!id) return alert('ID inválido para exclusão.');
  if (!confirm(`Deseja realmente excluir o chamado ID ${id}?`)) return;

  try {
    const resposta = await fetch(`http://localhost:3000/api/chamados/${id}`, {
      method: 'DELETE'
    });

    if (resposta.status === 404) {
      alert(`Chamado ID ${id} não encontrado no servidor.`);
      return;
    }

    if (resposta.ok) {
      alert('Chamado excluído com sucesso!');
      await carregarChamados();
    } else {
      const msg = await resposta.text();
      alert(`Falha ao excluir chamado: ${msg || resposta.statusText}`);
    }
  } catch (erro) {
    console.error(`Erro ao excluir chamado ${id}:`, erro);
    alert('Erro ao excluir chamado.');
  }
}

function visualizarChamado(id) {
  alert(`Visualizando chamado ID: ${id}\n(Futuramente será modal com detalhes).`);
}

function conectarAcoes() {
  document.querySelectorAll('.resolver').forEach(btn => {
    btn.onclick = () => resolverChamado(btn.dataset.id);
  });

  document.querySelectorAll('.excluir').forEach(btn => {
    btn.onclick = () => excluirChamado(btn.dataset.id);
  });

  document.querySelectorAll('.visualizar').forEach(btn => {
    btn.onclick = () => visualizarChamado(btn.dataset.id);
  });
}

window.addEventListener('DOMContentLoaded', carregarChamados);
