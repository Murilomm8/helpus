// Função principal para carregar chamados da API e montar a tabela
async function carregarChamados() {
  try {
    const resposta = await fetch('http://localhost:3000/api/chamados');

    if (!resposta.ok) {
      throw new Error(`Erro ${resposta.status}: ${resposta.statusText}`);
    }

    const chamados = await resposta.json();

    if (!Array.isArray(chamados)) {
      console.warn('Retorno inesperado da API:', chamados);
      alert('Formato inválido ao carregar chamados.');
      return;
    }

    const tabela = document.querySelector('#tabelaChamados tbody');
    tabela.innerHTML = '';

    chamados.forEach(chamado => {
      const linha = document.createElement('tr');

      // Aplica estilo se resolvido
      const statusFormatado = chamado.status?.toLowerCase();
      if (statusFormatado === 'resolvido') {
        linha.classList.add('table-success');
      }

      // Ações condicionais
      let acoes = `
        <button class="btn btn-outline-info btn-sm me-1 visualizar" data-id="${chamado.id}" title="Visualizar">
          <i class="bi bi-eye"></i>
        </button>
      `;

      if (statusFormatado === 'aberto') {
        acoes += `
          <button class="btn btn-outline-success btn-sm me-1 resolver" data-id="${chamado.id}" title="Resolver">
            <i class="bi bi-check2-circle"></i>
          </button>
          <button class="btn btn-outline-danger btn-sm excluir" data-id="${chamado.id}" title="Excluir">
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
        <td>${chamado.id}</td>
        <td>${chamado.nome}</td>
        <td>${chamado.problema}</td>
        <td>${chamado.status}</td>
        <td>${acoes}</td>
      `;

      tabela.appendChild(linha);
    });

    conectarAcoes(); // Liga os botões
  } catch (erro) {
    console.error('Erro ao carregar chamados:', erro);
    alert('Erro ao carregar chamados. Verifique sua conexão com o servidor.');
  }
}

// Resolve chamado
async function resolverChamado(id) {
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
      alert('Falha ao atualizar chamado.');
    }
  } catch (erro) {
    console.error('Erro ao resolver chamado:', erro);
    alert('Erro ao resolver chamado.');
  }
}

// Exclui chamado
async function excluirChamado(id) {
  if (!confirm(`Deseja excluir o chamado ID ${id}?`)) return;

  try {
    const resposta = await fetch(`http://localhost:3000/api/chamados/${id}`, {
      method: 'DELETE'
    });

    if (resposta.ok) {
      alert('Chamado excluído com sucesso!');
      await carregarChamados();
    } else {
      alert('Erro ao excluir chamado.');
    }
  } catch (erro) {
    console.error('Erro ao excluir chamado:', erro);
    alert('Erro de comunicação com o servidor.');
  }
}

// Visualiza chamado
function visualizarChamado(id) {
  alert(`Visualizar chamado ID: ${id}\n(Futuramente pode abrir modal com detalhes)`);
}

// Liga os botões após renderizar a tabela
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

// Inicialização
window.addEventListener('DOMContentLoaded', carregarChamados);
