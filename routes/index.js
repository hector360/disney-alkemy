import express from "express";
import { characters, createCharacter, updateCharacter, deleteCharacter, characterDetails } from "../controllers/PersonajeController.js";
import { createPeliculaSerie, updatePeliculaSerie, deletePeliculaSerie, movies, movieDetails } from "../controllers/PeliculaSerieController.js";
import { createGenero } from "../controllers/GeneroController.js";
import { register, login } from "../controllers/UsuarioController.js";

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);

router.get("/characters", characters);
router.get("/character-details/:id_character", characterDetails);

router.get("/movies", movies);
router.get("/movie-details/:id_movie", movieDetails);

router.post("/create-character", createCharacter);
router.put("/update-character", updateCharacter);
router.delete("/delete-character/:id_character", deleteCharacter);

router.post("/create-pelicula-serie", createPeliculaSerie);
router.put("/update-pelicula-serie", updatePeliculaSerie);
router.delete("/delete-pelicula-serie/:id_pelicula_serie", deletePeliculaSerie);


router.post("/create-genero", createGenero);

export default router;