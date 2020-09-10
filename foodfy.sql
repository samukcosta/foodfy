--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2
-- Dumped by pg_dump version 12.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: trigger_set_timestamp(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.trigger_set_timestamp() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: chefs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.chefs (
    id integer NOT NULL,
    name text NOT NULL,
    created_at timestamp without time zone NOT NULL,
    pk_files_id integer NOT NULL
);


--
-- Name: chefs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.chefs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: chefs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.chefs_id_seq OWNED BY public.chefs.id;


--
-- Name: files; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.files (
    id integer NOT NULL,
    name text NOT NULL,
    path text NOT NULL
);


--
-- Name: files_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.files_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: files_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.files_id_seq OWNED BY public.files.id;


--
-- Name: recipe_files; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.recipe_files (
    id integer NOT NULL,
    recipe_id integer,
    file_id integer
);


--
-- Name: recipe_files_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.recipe_files_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: recipe_files_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.recipe_files_id_seq OWNED BY public.recipe_files.id;


--
-- Name: recipes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.recipes (
    id integer NOT NULL,
    pk_user_id integer NOT NULL,
    title text NOT NULL,
    ingredients text[] NOT NULL,
    preparation text[] NOT NULL,
    information text,
    created_at timestamp without time zone NOT NULL
);


--
-- Name: recipes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.recipes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: recipes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.recipes_id_seq OWNED BY public.recipes.id;


--
-- Name: session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    reset_token text,
    reset_token_expires text,
    is_admin boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    is_chef boolean DEFAULT false,
    pk_files_id integer
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: chefs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.chefs ALTER COLUMN id SET DEFAULT nextval('public.chefs_id_seq'::regclass);


--
-- Name: files id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.files ALTER COLUMN id SET DEFAULT nextval('public.files_id_seq'::regclass);


--
-- Name: recipe_files id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recipe_files ALTER COLUMN id SET DEFAULT nextval('public.recipe_files_id_seq'::regclass);


--
-- Name: recipes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recipes ALTER COLUMN id SET DEFAULT nextval('public.recipes_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: chefs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.chefs (id, name, created_at, pk_files_id) FROM stdin;
\.


--
-- Data for Name: files; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.files (id, name, path) FROM stdin;
279	1597796684895-jorge-relato.jfif	public\\_img\\files\\1597796684895-jorge-relato.jfif
280	1597859283508-monic-laura.jpg	public\\_img\\files\\1597859283508-monic-laura.jpg
313	1597942655579-triplo-bacon.jfif	public\\_img\\files\\1597942655579-triplo-bacon.jfif
314	1597942655589-triplo-bacon3.jfif	public\\_img\\files\\1597942655589-triplo-bacon3.jfif
315	1597942655582-triplo-bacon2.jfif	public\\_img\\files\\1597942655582-triplo-bacon2.jfif
317	1597952153892-fabiana-melo.jfif	public\\_img\\files\\1597952153892-fabiana-melo.jfif
318	1597952311327-asinhas-frango.jfif	public\\_img\\files\\1597952311327-asinhas-frango.jfif
319	1597952311329-asinhas-frango2.jfif	public\\_img\\files\\1597952311329-asinhas-frango2.jfif
320	1597952363881-juliano-vieira.jfif	public\\_img\\files\\1597952363881-juliano-vieira.jfif
321	1597952546986-lasagna.jfif	public\\_img\\files\\1597952546986-lasagna.jfif
322	1597952546990-lasagna3.jfif	public\\_img\\files\\1597952546990-lasagna3.jfif
323	1597952546988-lasagna2.jfif	public\\_img\\files\\1597952546988-lasagna2.jfif
324	1597952604663-ricardo-golvea.jfif	public\\_img\\files\\1597952604663-ricardo-golvea.jfif
325	1597952891346-spaghetti.jfif	public\\_img\\files\\1597952891346-spaghetti.jfif
326	1597952939925-vania-steroski.jfif	public\\_img\\files\\1597952939925-vania-steroski.jfif
327	1597953184641-pao-do-ceu.jfif	public\\_img\\files\\1597953184641-pao-do-ceu.jfif
328	1597953184643-pao-do-ceu2.jfif	public\\_img\\files\\1597953184643-pao-do-ceu2.jfif
329	1597953321492-IMG_20200215_142755.jpg	public\\_img\\files\\1597953321492-IMG_20200215_142755.jpg
\.


--
-- Data for Name: recipe_files; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.recipe_files (id, recipe_id, file_id) FROM stdin;
126	109	313
127	109	314
128	109	315
130	111	318
131	111	319
132	112	321
133	112	322
134	112	323
135	113	325
136	114	327
137	114	328
\.


--
-- Data for Name: recipes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.recipes (id, pk_user_id, title, ingredients, preparation, information, created_at) FROM stdin;
109	19	Triplo bacon burger	{"3 kg de carne moída (escolha uma carne magra e macia)","300 g de bacon moído","1 ovo","3 colheres (sopa) de farinha de trigo","3 colheres (sopa) de tempero caseiro: feito com alho",sal,"cebola, pimenta e cheiro verde processados no liquidificador","30 ml de água gelada"}	{"Misture todos os ingredientes muito bem e amasse para que fique tudo muito bem misturado.","Faça porções de 90 g a 100 g.","Forre um plástico molhado em uma bancada e modele os hambúrgueres utilizando um aro como base.","Faça um de cada vez e retire o aro logo em seguida.","Forre uma assadeira de metal com plástico, coloque os hambúrgueres e intercale camadas de carne e plásticos (sem apertar).","Faça no máximo 4 camadas por forma e leve para congelar.","Retire do congelador","Frite ou asse e está pronto."}	Preaqueça a chapa, frigideira ou grelha por 10 minutos antes de levar os hambúrgueres. Adicione um pouquinho de óleo ou manteiga e não amasse os hambúrgueres.~n~nVocê sabia que a receita que precede o hambúrguer surgiu no século XIII, na Europa? A ideia de moer a carne chegou em Hamburgo no século XVII, onde um açougueiro resolveu também temperá-la. Assim, a receita foi disseminada nos Estados Unidos por alemães da região. Lá surgiu a ideia de colocar hambúrguer no meio do pão e adicionar outros ingredientes, como queijo, tomates e alfaces.	2020-08-20 00:00:00
112	21	Lasanha mac n' cheese	{"massa pronta de lasanha","400 g de presunto","400 g de mussarela ralada","2 copos de requeijão","150 g de mussarela para gratinar"}	{"Em uma panela, coloque a manteiga para derreter.","Acrescente a farinha de trigo e misture bem com auxílio de um fouet.","Adicione o leite e misture até formar um creme homogêneo.","Tempere com sal, pimenta e noz-moscada a gosto.","Desligue o fogo e acrescente o creme de leite; misture bem e reserve."}	Recheie a lasanha com o que preferir.	2020-08-20 00:00:00
113	23	Espaguete ao alho	{"1 pacote de macarrão 500 g (tipo do macarrão a gosto)","1 saquinho de alho granulado","1/2 tablete de manteiga (não use margarina)","1 colher (sopa) de azeite extra virgem","ervas (manjericão, orégano, salsa, cebolinha, tomilho, a gosto)",sal,"1 dente de alho","gengibre em pó a gosto","1 folha de louro"}	{"Quando faltar mais ou menos 5 minutos para ficar no ponto de escorrer o macarrão, comece o preparo da receita.","Na frigideira quente coloque a manteiga, o azeite, a folha de louro, e o alho granulado.","Nesta hora um pouco de agilidade, pois o macarrão escorrido vai para a frigideira, sendo mexido e dosado com sal a gosto, as ervas, o gengibre em pó a gosto também.","O dente de alho, serve para você untar os pratos onde serão servidos o macarrão.","Coloque as porções nos pratos já com o cheiro do alho, e enfeite com algumas ervas."}	Não lave o macarrão nem passe óleo ou gordura nele depois de escorrê-lo. Coloque direto na frigideira.	2020-08-20 00:00:00
111	20	Asinhas de frango ao barbecue	{"12 encontros de asinha de galinha, temperados a gosto"}	{"Em uma tigela coloque o encontro de asinha de galinha e polvilhe a farinha de trigo e misture com as mãos."}		2020-08-20 00:00:00
114	24	Docinhos pão-do-céu	{"1 kg de batata - doce","100g de manteiga","3 ovos","1 pacote de coco seco ralado (100g)","3 colheres (sopa) de açucar","1 lata de Leite Moça","1 colher (sopa) de fermento em pó","manteiga para untar","açúcar de confeitero"}	{"Cozinhe a batata-doce numa panela de pressão, com meio litro de água, por cerca de 20 minutos. Descasque e passe pelo espremedor, ainda quente.","Junte a manteiga,os ovos, o coco ralado,o açúcar, o Leite Moça e o fermento em pó, mexendo bem após cada adição.","Despeje em assadeira retangular média, untada e leve ao forno médio (180°C), por aproximadamente 45 minutos.","Depois de frio, polvilhe, com o,açúcar de confeiteiro e corte em quadrados."}		2020-08-20 00:00:00
\.


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.session (sid, sess, expire) FROM stdin;
mKMU9w5EUIjj9glwaTDxFsE80Q6wEidZ	{"cookie":{"originalMaxAge":86399998,"expires":"2020-08-22T01:45:40.443Z","httpOnly":true,"path":"/"},"userID":18}	2020-08-21 22:45:41
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, name, email, password, reset_token, reset_token_expires, is_admin, created_at, updated_at, is_chef, pk_files_id) FROM stdin;
25	Durval Jogador	durval-jogador@foodfy.com	$2a$08$YI1hhVrnau8517tejfEyTeGSilMJuhc/FX/261AWQtbopkYgbr37W			f	2020-08-19 17:48:29.482647	2020-08-19 18:05:54.397611	f	\N
20	Fabiana Melo	fabiana_melo@foodfy.com	$2a$08$cN1BZ6ouHXV.xeZwoDHVOeQOu8r5cL47YXlDrtodruy2oTTJeLZjW			f	2020-08-12 17:54:34.04243	2020-08-20 16:35:53.930991	t	317
19	Jorge Relato	jorge_relato@foodfy.com	$2a$08$/XO0.eabJQKGWInd4fkp/OQ6OWpWkMmylXXGd4jG8U2U9hfKsY6Ee			f	2020-08-12 17:53:27.632159	2020-08-19 16:36:07.092181	t	279
21	Juliano Vieira	juliano_vieira@foodfy.com	$2a$08$D.cWDIhb.XWhKye5mvwXJewV9WS2vNzCTCUx84EgMbZ2JSE206xli			f	2020-08-12 17:55:31.184641	2020-08-20 16:39:24.279257	t	320
24	Vania Steroski	vania_steroski@foodfy.com	$2a$08$LoFztUb7kuRuZgsMjQ/LCOtgfBVtQJD7goiQPTlyUiS4DgEpvuiwq			f	2020-08-12 17:58:24.747541	2020-08-20 16:48:59.984182	t	326
18	Samuel Costa	samu.ks@outlook.com	$2a$08$OpsXlGQWZVb7Tt1KZdfs7un8gPlamwLnQfX0O0deP/G.NVouCW2zq			t	2020-08-04 14:57:09.427812	2020-08-20 16:55:21.532028	f	329
23	Ricardo Golvea	ricardo_golvea@foodfy.com	$2a$08$DRzrxdiEobKF8qB0u.7Xp.iLW..D5/GzyMe1iH52JVBVlubkb/RGu			f	2020-08-12 17:57:31.192822	2020-08-20 17:02:44.15996	t	324
26	Monic Laura	monic-laura@foodfy.com	$2a$08$PEJ1PyiQ7zysh4XmH9apZ.7rOoIuIbF0/Z5BuyGH5M6mbEHRFOM3W			f	2020-08-19 17:51:08.380773	2020-08-20 17:02:51.535548	t	280
\.


--
-- Name: chefs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.chefs_id_seq', 28, true);


--
-- Name: files_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.files_id_seq', 329, true);


--
-- Name: recipe_files_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.recipe_files_id_seq', 137, true);


--
-- Name: recipes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.recipes_id_seq', 114, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 28, true);


--
-- Name: chefs chefs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.chefs
    ADD CONSTRAINT chefs_pkey PRIMARY KEY (id);


--
-- Name: files files_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_pkey PRIMARY KEY (id);


--
-- Name: recipe_files recipe_files_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recipe_files
    ADD CONSTRAINT recipe_files_pkey PRIMARY KEY (id);


--
-- Name: recipes recipes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_pkey PRIMARY KEY (id);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users trigger_set_timestamp; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER trigger_set_timestamp BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();


--
-- Name: chefs chefs_pk_files_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.chefs
    ADD CONSTRAINT chefs_pk_files_id_fkey FOREIGN KEY (pk_files_id) REFERENCES public.files(id);


--
-- Name: recipe_files recipe_files_file_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recipe_files
    ADD CONSTRAINT recipe_files_file_id_fkey FOREIGN KEY (file_id) REFERENCES public.files(id);


--
-- Name: recipe_files recipe_files_recipe_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recipe_files
    ADD CONSTRAINT recipe_files_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(id);


--
-- Name: recipes recipes_pk_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_pk_user_id_fkey FOREIGN KEY (pk_user_id) REFERENCES public.users(id);


--
-- Name: users users_pk_files_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk_files_id_fkey FOREIGN KEY (pk_files_id) REFERENCES public.files(id);


--
-- PostgreSQL database dump complete
--

