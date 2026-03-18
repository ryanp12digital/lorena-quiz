### Visão geral do fluxo

0. Boas-vindas / intenção (1 pergunta)  
1. Coleta do problema principal (categorização)  
2. Prazo do Evento  
3. Trajeto  
4. Impacto comercial / financeiro (ticket, adiamento, perda de conexão, danos materiais)  



### **QUIZ**

#### **Passo 0 — Boas-vindas**

**Texto:**   
Olá\! Sou Lorena Carvalho, advogada especialista em Direito Aéreo. Em menos de 2 minutos, vou analisar se você tem direito a uma indenização pelo que aconteceu no seu voo. Vamos começar?

#### **Passo 1 — Intenção inicial**

**Pergunta**: O que melhor descreve o seu problema?

**Opções**:

- `cancelamento_atraso` — Voo cancelado ou atrasado (mais de 4h)  
- `overbooking` — Overbooking / impedido de embarcar  
- `problema_com_bagagem` — Mala extraviada / danos à bagagem  
- `reembolso_tarifa` — Não recebi reembolso/indenização  
- `outro` — Outro (descrever)

* Se responder `outro` → abrir `q_outro_describe` (texto livre)

#### **Passo 2 — Prazo do evento**

**Pergunta**: Quando isso aconteceu?

**Opções**:

- `48hr` — Nas últimas 48 horas  
  - `3-7Dias` — Entre 3 e 7 dias  
    - `8-30Dias` — Entre 8 e 30 dias  
    - `1-12Meses` — 1 a 12 meses  
      `1-5Anos` — 1 a 5 anos  
    - `+5anos` — Mais de 5 anos

  - Regra: se `48h` → marcar `urgent=true` e aumentar score \+50.  
  - Regra se responder \+ de 5 anos: Desqualificar 

#### **Passo 3 — Trajeto**

- **Pergunta**: Qual era o trajeto do seu voo?  
    
  **Opções**:  
  \-  `brasil_para_exterior` Brasil para o Exterior  
  \- `exterior_para_brasil` Exterior para o Brasil   
  \- `voo_domestico` Voo dentro do Brasil (doméstico)   
  \- `voo_extrangeiro` Voo entre dois países estrangeiro 

#### **Passo 4 — Tipo de prejuízo / consequência**

- **Pergunta**:  Para finalizar, relate quais prejuízos/consequências que você teve com isso (ex: Perdi evento importante, gastos com hotel/transfer/acomodação, humilhação, etc)

  **Opção:** Resposta curta