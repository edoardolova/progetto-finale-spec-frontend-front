# Metricly

## 📘 Web Dev Project – Single Page Application per la Gestione di Record

Questo progetto è una **Single Page Application (SPA)** che simula l’esperienza di un utente **non autenticato**, consentendogli di **sfogliare, cercare, filtrare, confrontare e salvare preferiti** tra i record modellati nel file `types.ts`.

La realizzazione del progetto rappresenta l’esercitazione finale del corso di Web Development.

## 🔌 Backend

Questo progetto frontend comunica con un backend sviluppato come supporto didattico
durante il corso di Web Development.

Per eseguire correttamente l’applicazione è necessario clonare e avviare anche il repository backend:

https://github.com/edoardolova/progetto-finale-spec-frontend-back.git

### Avvio del backend

1. Clona il repository:

```bash
git clone https://github.com/edoardolova/progetto-finale-spec-frontend-back.git
```

2. Installa le dipendenze

```bash
npm install
```

3. Avvia il server

```bash
npm run start
```

Nota: il backend non è stato sviluppato dall’autore di questo progetto, ma fornito come base dal docente del corso e successivamente adattato.

## 🧩 Obiettivi del Progetto

L’applicazione permette all’utente di:

- 📄 **Sfogliare, cercare e filtrare i record**
- 🔍 **Effettuare ricerche ottimizzate tramite debounce**
- ↕️ **Ordinare i dati**
- 🆚 **Confrontare più elementi tra loro**
- ⭐ **Aggiungere e rimuovere preferiti con persistenza nel browser**

## 🚀 Funzionalità Implementate

### 📋 Lista dei Record

- Visualizzazione completa della risorsa definita in `types.ts`.
- Layout chiaro e ottimizzato per la consultazione rapida.

### 🔍 Ricerca con Debounce

- Ricerca dinamica basata sul valore del campo `title`.
- Implementazione del **debounce** per ridurre ricerche ripetute e migliorare la UX.

### 🎛️ Filtri e Ordinamento

- Filtri multipli per restringere rapidamente il set di record.
- Ordinamento in ordine crescente o decrescente sulle proprietà principali.

### 📄 Pagina di Dettaglio

- Pagina dedicata per ogni singolo record.
- Mostra tutte le proprietà in modo chiaro ed esteso.
- Possibilità di aggiungere o rimuovere il record dai preferiti.

### 🆚 Comparatore di Record

- Selezione di **2 o più record** da confrontare.
- Layout responsivo automaticamente adattato per visualizzare i record affiancati.

### ⭐ Sistema di Preferiti con Persistenza

- Aggiunta e rimozione dei record dai preferiti tramite UI dedicata.
- Persistenza tramite **localStorage**, così da mantenere i dati anche dopo il refresh.
- Sezione dedicata alla visualizzazione dei record preferiti.

```

```
