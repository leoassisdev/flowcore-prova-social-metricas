# Prova social com métricas

> Logos de clientes, métricas grandes com contagem animada e depoimento de decisor. Transforma resultado em argumento de compra para quem assina o contrato.

**Ver ao vivo, com preview e manual:** https://flowcoresolucoes.com.br/codigos/prova-social-metricas

Criado por **FlowCore Soluções LTDA**.

## Arquivos

- [`src/ProvaSocialMetricas.tsx`](src/ProvaSocialMetricas.tsx)

## Como instalar

1. **Tenha um projeto React com Tailwind** Já tem (Vite, Next.js, Remix)? Pule este passo. Se não, crie um em 1 minuto e adicione ./src/**/*.{ts,tsx} ao content do tailwind.config.

   ```bash
   npm create vite@latest minha-app -- --template react-ts
   cd minha-app
   npm install -D tailwindcss@3 postcss autoprefixer
   npx tailwindcss init -p
   ```

2. **Crie o arquivo src/components/ProvaSocialMetricas.tsx** Copie o conteúdo de `src/ProvaSocialMetricas.tsx` deste repositório. Ele é um arquivo só, sem dependência além de React.
3. **Use na sua página**

   ```tsx
   import ProvaSocialMetricas from "./components/ProvaSocialMetricas";
   
   <ProvaSocialMetricas tema="claro" accent="#0057FF" title="Empresas que trocaram planilha por processo" />
   ```

4. **Personalize** Textos, dados e a cor de destaque (prop accent) são props com valor padrão. Troque pelos da sua marca ou ligue na sua API.

## Tema e cor

Abre em tema claro. Use `tema="escuro"` para o escuro e `accent` para a cor de destaque:

```tsx
<ProvaSocialMetricas tema="claro" accent="#0057FF" title="Empresas que trocaram planilha por processo" />
```

## Licença

MIT. Pode usar em projeto pessoal ou comercial, de graça. A única condição é manter a linha **“Criado por FlowCore Soluções LTDA”** (ou o crédito de adaptação) onde ela está.

---

Precisa disso integrado no seu sistema? A [FlowCore](https://flowcoresolucoes.com.br) desenvolve sob medida.
