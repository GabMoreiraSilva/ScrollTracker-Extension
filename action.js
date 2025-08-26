document.addEventListener("DOMContentLoaded", () => {
	const btn = document.getElementsByClassName("btn-submit");

		btn[0].addEventListener("click", () => {
			const nomeObra = document.getElementById("nomeObra").value
			const descricao = document.getElementById("descricao").value
			const capitulos = document.getElementById("capitulos").value
			const capitulosLidos = document.getElementById("capitulosLidos").value
			const statusObra = document.getElementById("statusObra").value
			const statusLeitura = document.getElementById("statusLeitura").value
			const urlCapa = document.getElementById("urlCapa").value
			if (!nomeObra || !descricao || !capitulos || !capitulosLidos || !statusObra || !statusLeitura || !urlCapa)
			{
				return
			}
			status_code = salvarNoBanco(nomeObra, descricao, capitulos, capitulosLidos, statusObra, statusLeitura, urlCapa);
		});

		async function salvarNoBanco(nomeObra, descricao, capitulos, capitulosLidos, statusObra, statusLeitura, urlCapa) {
			const status = document.getElementById("status");
			try {
				const response = await fetch("http://localhost:5000/api/ScrollsTracker/CadastrarObra", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						titulo: String(nomeObra),
						descricao: String(descricao),
						totalCapitulos: String(capitulos),
						ultimoCapituloLido: String(capitulosLidos),
						imagem: String(urlCapa),
						status: String(statusObra),
						statusLeitura: String(statusLeitura)
					})
				});

				if (!response.ok) throw new Error("Erro ao enviar para o servidor");
				const data = await response.json();
				status.textContent = "✅ Registro salvo"
				status.style.color = "green"
				console.log("✅ Registro salvo:", JSON.stringify(data));
			} catch (error) {
				status.textContent = "❌ Erro ao tentar enviar"
				status.style.color = "red"
				console.error("❌ Erro:", error);
			}
		}
});