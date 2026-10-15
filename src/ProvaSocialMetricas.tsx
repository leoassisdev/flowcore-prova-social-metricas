// ProvaSocialMetricas · Criado por FlowCore Soluções LTDA · flowcoresolucoes.com.br/codigos · licença MIT
// Faixa de prova social: logos de clientes, métricas grandes com contagem
// animada ao montar e um depoimento curto de decisor para fechar o argumento.
// Props: tema ("claro" padrão | "escuro"), accent, eyebrow, title, logos,
// metricas, citacao, duracao.
// Requisitos: React 18+ e Tailwind CSS 3+. Zero dependências.

import { useEffect, useState, type CSSProperties } from "react";

type Tema = "claro" | "escuro";

type Metrica = {
  /** Valor final do contador. */
  valor: number;
  /** Casas decimais exibidas. */
  casas?: number;
  prefixo?: string;
  sufixo?: string;
  rotulo: string;
  detalhe?: string;
};

type Props = {
  /** Tema visual. Padrão "claro". */
  tema?: Tema;
  /** Cor de destaque (qualquer cor CSS). */
  accent?: string;
  eyebrow?: string;
  title?: string;
  logos?: string[];
  metricas?: Metrica[];
  citacao?: { texto: string; autor: string; cargo: string; empresa: string };
  /** Duração da contagem em ms. */
  duracao?: number;
};

// Paleta do tema aplicada como CSS vars na raiz (não depende do tailwind.config).
const TEMAS: Record<Tema, Record<string, string>> = {
  claro: {
    "--fc-bg": "#F7F8FB", "--fc-surface": "#FFFFFF", "--fc-surface-2": "#F1F4F9",
    "--fc-border": "#E3E8F0", "--fc-border-strong": "#CBD3E1",
    "--fc-text": "#0B1220", "--fc-muted": "#4B5565", "--fc-subtle": "#8A94A6",
    "--fc-pos": "#059669", "--fc-neg": "#E11D48", "--fc-warn": "#D97706",
    "--fc-shadow": "0 1px 2px rgba(16,24,40,.06), 0 12px 32px -16px rgba(16,24,40,.18)",
    "--fc-cell": "#FFFFFF", "--fc-strong": "#1E293B", "--fc-glow": "0.10",
  },
  escuro: {
    "--fc-bg": "#0B0F17", "--fc-surface": "rgba(255,255,255,0.03)", "--fc-surface-2": "rgba(255,255,255,0.06)",
    "--fc-border": "rgba(255,255,255,0.10)", "--fc-border-strong": "rgba(255,255,255,0.25)",
    "--fc-text": "#FFFFFF", "--fc-muted": "rgba(255,255,255,0.60)", "--fc-subtle": "rgba(255,255,255,0.40)",
    "--fc-pos": "#34D399", "--fc-neg": "#FB7185", "--fc-warn": "#FBBF24",
    "--fc-shadow": "0 24px 48px -24px rgba(0,0,0,.6)",
    "--fc-cell": "#0B0F17", "--fc-strong": "rgba(255,255,255,0.80)", "--fc-glow": "0.12",
  },
};

const CORES = ["var(--accent)", "#7C3AED", "#10B981", "#F59E0B", "#EC4899", "#06B6D4"];

const formatar = (n: number, casas = 0) =>
  n.toLocaleString("pt-BR", { minimumFractionDigits: casas, maximumFractionDigits: casas });

export default function ProvaSocialMetricas({
  tema = "claro",
  accent = "#0057FF",
  eyebrow = "Resultados medidos em produção",
  title = "Empresas que trocaram planilha por processo",
  logos = ["Vértice Engenharia", "Nortec", "Grupo Sena", "Alumi", "Lumen Saúde", "Arvo Logística"],
  metricas = [
    { valor: 312, rotulo: "empresas atendidas", detalhe: "indústria, saúde e serviços", prefixo: "+" },
    { valor: 48.6, casas: 1, prefixo: "R$ ", sufixo: " mi", rotulo: "processados por mês", detalhe: "em pedidos e cobranças" },
    { valor: 37, sufixo: "%", rotulo: "menos custo operacional", detalhe: "média após 6 meses" },
    { valor: 99.98, casas: 2, sufixo: "%", rotulo: "de disponibilidade", detalhe: "SLA contratual" },
  ],
  citacao = {
    texto:
      "Em 90 dias fechamos o mês financeiro em 2 dias, não em 9. O retorno pagou o projeto antes do primeiro trimestre.",
    autor: "Mariana Couto",
    cargo: "Diretora Financeira",
    empresa: "Grupo Sena",
  },
  duracao = 1600,
}: Props) {
  const [progresso, setProgresso] = useState(0);
  const escuro = tema === "escuro";

  // Contagem única ao montar, com easing de saída (cúbica).
  useEffect(() => {
    const inicio = performance.now();
    let raf = 0;
    const tick = (agora: number) => {
      const p = Math.min(1, (agora - inicio) / duracao);
      setProgresso(1 - Math.pow(1 - p, 3));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duracao]);

  const iniciais = citacao.autor
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  return (
    <section
      style={{ ...TEMAS[tema], "--accent": accent } as CSSProperties}
      className="relative isolate overflow-hidden bg-[var(--fc-bg)] px-6 py-20 text-[var(--fc-text)] sm:py-28 lg:px-8"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[24rem] w-[48rem] -translate-x-1/2 rounded-full bg-[var(--accent)] opacity-[var(--fc-glow)] blur-[120px]" />
        {!escuro && <div className="absolute left-[-8rem] top-[60%] h-[22rem] w-[22rem] rounded-full bg-[#7C3AED] opacity-[0.08] blur-[120px]" />}
        {!escuro && <div className="absolute right-[-8rem] top-[10%] h-[22rem] w-[22rem] rounded-full bg-[#06B6D4] opacity-[0.08] blur-[120px]" />}
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p
            className={`text-xs uppercase tracking-[0.2em] ${
              escuro
                ? "text-[var(--fc-subtle)]"
                : "inline-flex rounded-full bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] px-3 py-1 font-medium text-[var(--accent)]"
            }`}
          >
            {eyebrow}
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {title}
          </h2>
        </div>

        {/* Faixa de logos */}
        <ul
          aria-label="Clientes"
          className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--fc-border)] bg-[var(--fc-border)] shadow-[var(--fc-shadow)] sm:grid-cols-3 lg:grid-cols-6"
        >
          {logos.map((l) => (
            <li
              key={l}
              className="flex h-16 items-center justify-center bg-[var(--fc-cell)] px-4 text-center text-sm font-semibold tracking-tight text-[var(--fc-subtle)] transition-colors hover:text-[var(--fc-strong)]"
            >
              {l}
            </li>
          ))}
        </ul>

        {/* Métricas */}
        <dl className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metricas.map((m, i) => {
            const cor = escuro ? "var(--accent)" : CORES[i % CORES.length];
            return (
            <div
              key={m.rotulo}
              className="group relative overflow-hidden rounded-2xl border border-[var(--fc-border)] bg-[var(--fc-surface)] p-6 shadow-[var(--fc-shadow)] transition-all hover:border-[var(--fc-border-strong)] motion-safe:hover:-translate-y-0.5"
            >
              <div
                aria-hidden
                className={escuro ? "absolute inset-x-6 top-0 h-px opacity-60" : "absolute inset-x-0 top-0 h-1"}
                style={{ background: escuro ? `linear-gradient(90deg, transparent, ${cor}, transparent)` : cor }}
              />
              {!escuro && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-[0.12] blur-2xl"
                  style={{ background: cor }}
                />
              )}
              <dt className="sr-only">{m.rotulo}</dt>
              <dd>
                <p
                  className="text-4xl font-semibold tabular-nums tracking-tight sm:text-5xl"
                  aria-label={`${m.prefixo ?? ""}${formatar(m.valor, m.casas)}${m.sufixo ?? ""}`}
                >
                  <span aria-hidden>
                    {m.prefixo}
                    {formatar(m.valor * progresso, m.casas)}
                    <span style={{ color: cor }}>{m.sufixo}</span>
                  </span>
                </p>
                <p className="mt-3 text-sm font-medium text-[var(--fc-strong)]">{m.rotulo}</p>
                {m.detalhe && <p className="mt-1 text-xs text-[var(--fc-subtle)]">{m.detalhe}</p>}
              </dd>
            </div>
            );
          })}
        </dl>

        {/* Depoimento */}
        <figure
          className={`relative mx-auto mt-14 max-w-3xl overflow-hidden rounded-3xl border border-[var(--fc-border)] p-8 shadow-[var(--fc-shadow)] sm:p-10 ${
            escuro
              ? "bg-[var(--fc-surface)]"
              : "bg-[linear-gradient(135deg,color-mix(in_srgb,var(--accent)_7%,#fff),#fff_55%,color-mix(in_srgb,#7C3AED_6%,#fff))]"
          }`}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="text-[var(--accent)]">
            <path d="M9.6 6C6.5 7.4 4.5 10.3 4.5 13.8V18h6v-6h-3c0-2 1.2-3.7 3-4.5L9.6 6Zm9 0c-3.1 1.4-5.1 4.3-5.1 7.8V18h6v-6h-3c0-2 1.2-3.7 3-4.5L18.6 6Z" />
          </svg>
          <blockquote className="mt-5 text-pretty text-lg leading-relaxed text-[var(--fc-strong)] sm:text-xl">
            “{citacao.texto}”
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-3">
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
                escuro
                  ? "border border-[var(--fc-border)] bg-[var(--fc-surface-2)] text-[var(--fc-strong)]"
                  : "bg-gradient-to-br from-[var(--accent)] to-[#7C3AED] text-white"
              }`}
            >
              {iniciais}
            </span>
            <span className="text-sm">
              <span className="block font-semibold">{citacao.autor}</span>
              <span className="block text-[var(--fc-muted)]">
                {citacao.cargo} · {citacao.empresa}
              </span>
            </span>
          </figcaption>
        </figure>

        <p className="mt-14 text-center text-[11px] text-[var(--fc-subtle)]">
          <a href="https://flowcoresolucoes.com.br/codigos" target="_blank" rel="noopener" className="transition-colors hover:text-[var(--fc-text)]">
            Criado por FlowCore Soluções LTDA
          </a>
        </p>
      </div>
    </section>
  );
}
