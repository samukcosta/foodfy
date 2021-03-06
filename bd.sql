PGDMP       *    (                x            foodfy    12.2    12.2 #    +           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ,           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            -           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            .           1262    49207    foodfy    DATABASE     �   CREATE DATABASE foodfy WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Portuguese_Brazil.1252' LC_CTYPE = 'Portuguese_Brazil.1252';
    DROP DATABASE foodfy;
                postgres    false            �            1259    49239    chefs    TABLE     �   CREATE TABLE public.chefs (
    id integer NOT NULL,
    name text NOT NULL,
    created_at timestamp without time zone NOT NULL,
    pk_files_id integer NOT NULL
);
    DROP TABLE public.chefs;
       public         heap    postgres    false            �            1259    49237    chefs_id_seq    SEQUENCE     �   CREATE SEQUENCE public.chefs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.chefs_id_seq;
       public          postgres    false    205            /           0    0    chefs_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.chefs_id_seq OWNED BY public.chefs.id;
          public          postgres    false    204            �            1259    65657    files    TABLE     g   CREATE TABLE public.files (
    id integer NOT NULL,
    name text NOT NULL,
    path text NOT NULL
);
    DROP TABLE public.files;
       public         heap    postgres    false            �            1259    65655    files_id_seq    SEQUENCE     �   CREATE SEQUENCE public.files_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.files_id_seq;
       public          postgres    false    207            0           0    0    files_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.files_id_seq OWNED BY public.files.id;
          public          postgres    false    206            �            1259    65668    recipe_files    TABLE     j   CREATE TABLE public.recipe_files (
    id integer NOT NULL,
    recipe_id integer,
    file_id integer
);
     DROP TABLE public.recipe_files;
       public         heap    postgres    false            �            1259    65666    recipe_files_id_seq    SEQUENCE     �   CREATE SEQUENCE public.recipe_files_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.recipe_files_id_seq;
       public          postgres    false    209            1           0    0    recipe_files_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.recipe_files_id_seq OWNED BY public.recipe_files.id;
          public          postgres    false    208            �            1259    49228    recipes    TABLE        CREATE TABLE public.recipes (
    id integer NOT NULL,
    pk_chef_id integer NOT NULL,
    title text NOT NULL,
    ingredients text[] NOT NULL,
    preparation text[] NOT NULL,
    information text,
    created_at timestamp without time zone NOT NULL
);
    DROP TABLE public.recipes;
       public         heap    postgres    false            �            1259    49226    recipes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.recipes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.recipes_id_seq;
       public          postgres    false    203            2           0    0    recipes_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.recipes_id_seq OWNED BY public.recipes.id;
          public          postgres    false    202            �
           2604    49242    chefs id    DEFAULT     d   ALTER TABLE ONLY public.chefs ALTER COLUMN id SET DEFAULT nextval('public.chefs_id_seq'::regclass);
 7   ALTER TABLE public.chefs ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    204    205    205            �
           2604    65660    files id    DEFAULT     d   ALTER TABLE ONLY public.files ALTER COLUMN id SET DEFAULT nextval('public.files_id_seq'::regclass);
 7   ALTER TABLE public.files ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    207    206    207            �
           2604    65671    recipe_files id    DEFAULT     r   ALTER TABLE ONLY public.recipe_files ALTER COLUMN id SET DEFAULT nextval('public.recipe_files_id_seq'::regclass);
 >   ALTER TABLE public.recipe_files ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    208    209    209            �
           2604    49231 
   recipes id    DEFAULT     h   ALTER TABLE ONLY public.recipes ALTER COLUMN id SET DEFAULT nextval('public.recipes_id_seq'::regclass);
 9   ALTER TABLE public.recipes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    202    203            $          0    49239    chefs 
   TABLE DATA           B   COPY public.chefs (id, name, created_at, pk_files_id) FROM stdin;
    public          postgres    false    205   %       &          0    65657    files 
   TABLE DATA           /   COPY public.files (id, name, path) FROM stdin;
    public          postgres    false    207   �&       (          0    65668    recipe_files 
   TABLE DATA           >   COPY public.recipe_files (id, recipe_id, file_id) FROM stdin;
    public          postgres    false    209   �/       "          0    49228    recipes 
   TABLE DATA           k   COPY public.recipes (id, pk_chef_id, title, ingredients, preparation, information, created_at) FROM stdin;
    public          postgres    false    203   J0       3           0    0    chefs_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.chefs_id_seq', 27, true);
          public          postgres    false    204            4           0    0    files_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.files_id_seq', 277, true);
          public          postgres    false    206            5           0    0    recipe_files_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.recipe_files_id_seq', 125, true);
          public          postgres    false    208            6           0    0    recipes_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.recipes_id_seq', 108, true);
          public          postgres    false    202            �
           2606    49247    chefs chefs_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.chefs
    ADD CONSTRAINT chefs_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.chefs DROP CONSTRAINT chefs_pkey;
       public            postgres    false    205            �
           2606    65665    files files_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.files DROP CONSTRAINT files_pkey;
       public            postgres    false    207            �
           2606    65673    recipe_files recipe_files_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.recipe_files
    ADD CONSTRAINT recipe_files_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.recipe_files DROP CONSTRAINT recipe_files_pkey;
       public            postgres    false    209            �
           2606    49236    recipes recipes_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.recipes DROP CONSTRAINT recipes_pkey;
       public            postgres    false    203            �
           2606    65689    chefs chefs_pk_files_id_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.chefs
    ADD CONSTRAINT chefs_pk_files_id_fkey FOREIGN KEY (pk_files_id) REFERENCES public.files(id);
 F   ALTER TABLE ONLY public.chefs DROP CONSTRAINT chefs_pk_files_id_fkey;
       public          postgres    false    2717    205    207            �
           2606    65679 &   recipe_files recipe_files_file_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.recipe_files
    ADD CONSTRAINT recipe_files_file_id_fkey FOREIGN KEY (file_id) REFERENCES public.files(id);
 P   ALTER TABLE ONLY public.recipe_files DROP CONSTRAINT recipe_files_file_id_fkey;
       public          postgres    false    2717    209    207            �
           2606    65674 (   recipe_files recipe_files_recipe_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.recipe_files
    ADD CONSTRAINT recipe_files_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(id);
 R   ALTER TABLE ONLY public.recipe_files DROP CONSTRAINT recipe_files_recipe_id_fkey;
       public          postgres    false    203    2713    209            $   (   21	Jorge Relato	2020-06-24 00:00:00	191
 (   22	Fabiana Melo	2020-06-24 00:00:00	192
 *   24	Juliano Vieira	2020-06-24 00:00:00	194
 )   25	Júlia Kinoto	2020-06-24 00:00:00	195
 *   26	Ricardo Golvea	2020-06-24 00:00:00	196
 *   27	Vania Steroski	2020-06-25 00:00:00	256
    \.


      &   K   240	1593099304534-candy.jfif	public\\_img\\files\\1593099304534-candy.jfif
 M   241	1593099304545-candy3.jfif	public\\_img\\files\\1593099304545-candy3.jfif
 M   242	1593099304538-candy2.jfif	public\\_img\\files\\1593099304538-candy2.jfif
 ]   253	1593104083799-vania-steroski.jfif	public\\_img\\files\\1593104083799-vania-steroski.jfif
 ]   256	1593104666425-vania-steroski.jfif	public\\_img\\files\\1593104666425-vania-steroski.jfif
 Y   191	1593012717302-jorge-relato.jfif	public\\_img\\files\\1593012717302-jorge-relato.jfif
 Y   192	1593012736014-fabiana-melo.jfif	public\\_img\\files\\1593012736014-fabiana-melo.jfif
 ]   193	1593012750149-vania-steroski.jfif	public\\_img\\files\\1593012750149-vania-steroski.jfif
 ]   194	1593012767158-juliano-vieira.jfif	public\\_img\\files\\1593012767158-juliano-vieira.jfif
 Y   195	1593012796069-julia-kinoto.jfif	public\\_img\\files\\1593012796069-julia-kinoto.jfif
 ]   196	1593012810681-ricardo-golvea.jfif	public\\_img\\files\\1593012810681-ricardo-golvea.jfif
 k   197	1593014141312-triplo-bacon-burguer1.jfif	public\\_img\\files\\1593014141312-triplo-bacon-burguer1.jfif
 k   198	1593014141314-triplo-bacon-burguer2.jfif	public\\_img\\files\\1593014141314-triplo-bacon-burguer2.jfif
 k   199	1593014141316-triplo-bacon-burguer3.jfif	public\\_img\\files\\1593014141316-triplo-bacon-burguer3.jfif
 c   200	1593014337262-asa-frango-frito2.jfif	public\\_img\\files\\1593014337262-asa-frango-frito2.jfif
 c   202	1593014337271-asa-frango-frito4.jfif	public\\_img\\files\\1593014337271-asa-frango-frito4.jfif
 c   203	1593014337265-asa-frango-frito3.jfif	public\\_img\\files\\1593014337265-asa-frango-frito3.jfif
 Q   204	1593014391024-lasanha2.jfif	public\\_img\\files\\1593014391024-lasanha2.jfif
 Q   205	1593014391021-lasanha1.jfif	public\\_img\\files\\1593014391021-lasanha1.jfif
 S   206	1593014472788-spaghetti.jfif	public\\_img\\files\\1593014472788-spaghetti.jfif
 Q   269	1593105182812-lasanha1.jfif	public\\_img\\files\\1593105182812-lasanha1.jfif
 Q   270	1593105182817-lasanha2.jfif	public\\_img\\files\\1593105182817-lasanha2.jfif
 �   271	1593105182820-photo-1574071318508-1cdbab80d002 - Copia.jfif	public\\_img\\files\\1593105182820-photo-1574071318508-1cdbab80d002 - Copia.jfif
    \.


      (   	   59	4	197
 	   60	4	198
 	   61	4	199
 	   62	6	200
 	   64	6	202
 	   65	6	203
 	   66	7	204
 	   67	7	205
 	   68	8	206
    102	106	240
    103	106	241
    104	106	242
    \.


      "   �  106	26	Docinhos pão-do-céu	{"1 kg de batata - doce","100g de manteiga","3 ovos","1 pacote de coco seco ralado (100g)","3 colheres (sopa) de açucar","1 lata de Leite Moça","1 colher (sopa) de fermento em pó","manteiga para untar","açúcar de confeitero"}	{"Cozinhe a batata-doce numa panela de pressão, com meio litro de água, por cerca de 20 minutos. Descasque e passe pelo espremedor, ainda quente.","Junte a manteiga,os ovos, o coco ralado,o açúcar, o Leite Moça e o fermento em pó, mexendo bem após cada adição.","Despeje em assadeira retangular média, untada e leve ao forno médio (180°C), por aproximadamente 45 minutos.","Depois de frio, polvilhe, com o,açúcar de confeiteiro e corte em quadrados."}		2020-06-25 00:00:00
 �   6	21	Asinhas de frango ao barbecue	{"12 encontros de asinha de galinha, temperados a gosto"}	{"Em uma tigela coloque o encontro de asinha de galinha e polvilhe a farinha de trigo e misture com as mãos."}		2020-05-26 00:00:00
   7	25	Lasanha mac n' cheese	{"massa pronta de lasanha","400 g de presunto","400 g de mussarela ralada","2 copos de requeijão","150 g de mussarela para gratinar"}	{"Em uma panela, coloque a manteiga para derreter.","Acrescente a farinha de trigo e misture bem com auxílio de um fouet.","Adicione o leite e misture até formar um creme homogêneo.","Tempere com sal, pimenta e noz-moscada a gosto.","Desligue o fogo e acrescente o creme de leite; misture bem e reserve."}	Recheie a lasanha com o que preferir.	2020-05-26 00:00:00
 �  8	24	Espaguete ao alho	{"1 pacote de macarrão 500 g (tipo do macarrão a gosto)","1 saquinho de alho granulado","1/2 tablete de manteiga (não use margarina)","1 colher (sopa) de azeite extra virgem","ervas (manjericão, orégano, salsa, cebolinha, tomilho, a gosto)",sal,"1 dente de alho","gengibre em pó a gosto","1 folha de louro"}	{"Quando faltar mais ou menos 5 minutos para ficar no ponto de escorrer o macarrão, comece o preparo da receita.","Na frigideira quente coloque a manteiga, o azeite, a folha de louro, e o alho granulado.","Nesta hora um pouco de agilidade, pois o macarrão escorrido vai para a frigideira, sendo mexido e dosado com sal a gosto, as ervas, o gengibre em pó a gosto também.","O dente de alho, serve para você untar os pratos onde serão servidos o macarrão.","Coloque as porções nos pratos já com o cheiro do alho, e enfeite com algumas ervas."}	Não lave o macarrão nem passe óleo ou gordura nele depois de escorrê-lo. Coloque direto na frigideira.	2020-05-26 00:00:00
 �  4	22	Triplo bacon burger	{"3 kg de carne moída (escolha uma carne magra e macia)","300 g de bacon moído","1 ovo","3 colheres (sopa) de farinha de trigo","3 colheres (sopa) de tempero caseiro: feito com alho, sal, cebola, pimenta e cheiro verde processados no liquidificador","30 ml de água gelada","",""}	{"Misture todos os ingredientes muito bem e amasse para que fique tudo muito bem misturado.","Faça porções de 90 g a 100 g.","Forre um plástico molhado em uma bancada e modele os hambúrgueres utilizando um aro como base.","Faça um de cada vez e retire o aro logo em seguida.","Forre uma assadeira de metal com plástico, coloque os hambúrgueres e intercale camadas de carne e plásticos (sem apertar).","Faça no máximo 4 camadas por forma e leve para congelar.","Retire do congelador, frite ou asse e está pronto.","",""}	Preaqueça a chapa, frigideira ou grelha por 10 minutos antes de levar os hambúrgueres. Adicione um pouquinho de óleo ou manteiga e não amasse os hambúrgueres.~n~nVocê sabia que a receita que precede o hambúrguer surgiu no século XIII, na Europa? A ideia de moer a carne chegou em Hamburgo no século XVII, onde um açougueiro resolveu também temperá-la. Assim, a receita foi disseminada nos Estados Unidos por alemães da região. Lá surgiu a ideia de colocar hambúrguer no meio do pão e adicionar outros ingredientes, como queijo, tomates e alfaces.	2020-05-26 00:00:00
    \.


     