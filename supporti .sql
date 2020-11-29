-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  Dim 29 nov. 2020 à 17:48
-- Version du serveur :  5.7.24
-- Version de PHP :  7.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `supporti`
--

-- --------------------------------------------------------

--
-- Structure de la table `accessoire`
--

DROP TABLE IF EXISTS `accessoire`;
CREATE TABLE IF NOT EXISTS `accessoire` (
  `id_acc` int(11) NOT NULL,
  `nom_acc` varchar(255) NOT NULL,
  `desc_acc` varchar(255) NOT NULL,
  `prix_acc` int(11) NOT NULL,
  `image_acc` varchar(255) NOT NULL,
  PRIMARY KEY (`id_acc`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `actualite`
--

DROP TABLE IF EXISTS `actualite`;
CREATE TABLE IF NOT EXISTS `actualite` (
  `id_act` int(11) NOT NULL,
  `titre_act` varchar(255) NOT NULL,
  `contenu_act` varchar(255) NOT NULL,
  `date_act` date NOT NULL,
  `id_equipe` int(255) NOT NULL,
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id_act`),
  KEY `id_equipe` (`id_equipe`),
  KEY `id_user` (`id_user`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `id_admin` int(11) NOT NULL,
  `nom_admin` varchar(255) NOT NULL,
  `prenom_admin` varchar(255) NOT NULL,
  `email_admin` varchar(255) NOT NULL,
  `password_admin` varchar(255) NOT NULL,
  `tel_admin` int(8) NOT NULL,
  PRIMARY KEY (`id_admin`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `billet`
--

DROP TABLE IF EXISTS `billet`;
CREATE TABLE IF NOT EXISTS `billet` (
  `id_billet` int(11) NOT NULL,
  `prix_billet` int(11) NOT NULL,
  `matchs` int(11) NOT NULL,
  PRIMARY KEY (`id_billet`),
  KEY `matchs` (`matchs`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `equipe`
--

DROP TABLE IF EXISTS `equipe`;
CREATE TABLE IF NOT EXISTS `equipe` (
  `id_eq` int(11) NOT NULL,
  `nom_eq` varchar(255) NOT NULL,
  `logo_eq` varchar(255) NOT NULL,
  PRIMARY KEY (`id_eq`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `matchs`
--

DROP TABLE IF EXISTS `matchs`;
CREATE TABLE IF NOT EXISTS `matchs` (
  `id_matchs` int(11) NOT NULL,
  `equipe1` varchar(255) NOT NULL,
  `equipe2` varchar(255) NOT NULL,
  `date_matchs` date NOT NULL,
  `billets_restants` int(11) NOT NULL,
  PRIMARY KEY (`id_matchs`),
  KEY `equipe1` (`equipe1`),
  KEY `equipe2` (`equipe2`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `panier`
--

DROP TABLE IF EXISTS `panier`;
CREATE TABLE IF NOT EXISTS `panier` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_accessoire` int(11) NOT NULL,
  `id_billet` int(11) NOT NULL,
  `validation_accessoire` varchar(255) NOT NULL,
  `validation_billet` varchar(255) NOT NULL,
  `prix_billet` int(11) NOT NULL,
  `prix_accessoire` int(11) NOT NULL,
  `id_store` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  KEY `id_billet` (`id_billet`),
  KEY `id_accessoire` (`id_accessoire`),
  KEY `id_store` (`id_store`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `responsable`
--

DROP TABLE IF EXISTS `responsable`;
CREATE TABLE IF NOT EXISTS `responsable` (
  `id_resp` int(11) NOT NULL,
  `nom_resp` varchar(255) NOT NULL,
  `prenom_resp` varchar(255) NOT NULL,
  `email_resp` varchar(255) NOT NULL,
  `password_resp` varchar(255) NOT NULL,
  `tel_resp` int(8) NOT NULL,
  PRIMARY KEY (`id_resp`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `store`
--

DROP TABLE IF EXISTS `store`;
CREATE TABLE IF NOT EXISTS `store` (
  `id_store` int(11) NOT NULL,
  `id_eq` int(11) NOT NULL,
  `nom_store` varchar(255) NOT NULL,
  PRIMARY KEY (`id_store`),
  KEY `id_eq` (`id_eq`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `nom_user` varchar(255) NOT NULL,
  `prenom_user` varchar(255) NOT NULL,
  `email_user` varchar(255) NOT NULL,
  `password_user` varchar(255) NOT NULL,
  `equipe_favorite` varchar(255) DEFAULT NULL,
  `tel_user` int(8) NOT NULL,
  `salt` varchar(18) NOT NULL,
  PRIMARY KEY (`id_user`),
  KEY `equipe_favorite` (`equipe_favorite`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id_user`, `nom_user`, `prenom_user`, `email_user`, `password_user`, `equipe_favorite`, `tel_user`, `salt`) VALUES
(7, 'nehdi', 'youssef', 'nehdi.youssef@gmail.com', '09b13d28bf3782407e1e4111ff457dacb34808c32a68d482c66fd446815e7445d0431e886b473895e1a706fde2c6842f9c1a0f25e8cdf5e945ee5cccec3dad74', NULL, 12345678, 'a5bea14e9e7ba287');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
