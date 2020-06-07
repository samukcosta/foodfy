/* CÓDIGO PARA BD POSTGRESQL */
CREATE TABLE "chefs" (
  "id" SERIAL PRIMARY KEY,
  "avatar_url" text NOT NULL,
  "name" text NOT NULL,
  "created_at" timestamp
);

CREATE TABLE "recipes" (
  "id" SERIAL PRIMARY KEY,
  "pk_chef_id" int NOT NULL,
  "image" text,
  "title" text NOT NULL,
  "ingredients" text NOT NULL,
  "preparation" text NOT NULL,
  "information" text,
  "created_at" timestamp
);

ALTER TABLE "recipes" ADD FOREIGN KEY ("pk_chef_id") REFERENCES "chefs" ("id");