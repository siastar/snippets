-- Adminer 4.6.3 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

CREATE TABLE `addetti` (
  `idAddetto` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificativo Addetti',
  `idUser` int(11) DEFAULT NULL COMMENT 'User associato all''addetto',
  `NomeCognome` varchar(45) NOT NULL COMMENT 'Nominativo',
  `Mansione` varchar(45) DEFAULT NULL COMMENT 'Attività',
  PRIMARY KEY (`idAddetto`),
  KEY `idUser` (`idUser`),
  CONSTRAINT `addetti_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `arrangiamenti` (
  `idArrangiamento` int(11) NOT NULL AUTO_INCREMENT,
  `idStruttura` int(11) NOT NULL,
  `dtInizioPrenotazione` datetime NOT NULL,
  `dtFinePrenotazione` datetime NOT NULL,
  `dtCheckIn` datetime DEFAULT NULL,
  `dtCheckOut` datetime DEFAULT NULL,
  PRIMARY KEY (`idArrangiamento`),
  KEY `idStrutture` (`idStruttura`),
  CONSTRAINT `arrangiamenti_ibfk_1` FOREIGN KEY (`idStruttura`) REFERENCES `strutture` (`idStruttura`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `arrangiamenti` (`idArrangiamento`, `idStruttura`, `dtInizioPrenotazione`, `dtFinePrenotazione`, `dtCheckIn`, `dtCheckOut`) VALUES
(1,	1,	'2018-09-01 00:00:00',	'2019-04-30 00:00:00',	'2018-09-01 00:00:00',	NULL),
(2,	1,	'2018-09-01 00:00:00',	'2019-04-30 00:00:00',	'2018-09-01 00:00:00',	NULL),
(3,	1,	'2018-09-01 00:00:00',	'2019-04-30 00:00:00',	'2018-09-01 00:00:00',	NULL),
(4,	1,	'2018-09-01 00:00:00',	'2019-04-30 00:00:00',	'2018-09-01 00:00:00',	NULL),
(5,	1,	'2018-09-01 00:00:00',	'2019-04-30 00:00:00',	'2018-09-01 00:00:00',	NULL),
(6,	1,	'2018-09-01 00:00:00',	'2019-04-30 00:00:00',	'2018-09-01 00:00:00',	NULL);

CREATE TABLE `arrangiamenti_ospiti` (
  `idArrangiamentoOspite` int(11) NOT NULL AUTO_INCREMENT,
  `idArrangiamento` int(11) NOT NULL,
  `idOspite` int(11) NOT NULL,
  `flgAcquirente` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idArrangiamentoOspite`),
  KEY `idArrangiamenti` (`idArrangiamento`),
  KEY `idOspiti` (`idOspite`),
  CONSTRAINT `arrangiamenti_ospiti_ibfk_1` FOREIGN KEY (`idArrangiamento`) REFERENCES `arrangiamenti` (`idArrangiamento`),
  CONSTRAINT `arrangiamenti_ospiti_ibfk_2` FOREIGN KEY (`idOspite`) REFERENCES `ospiti` (`idOspite`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `arrangiamenti_ospiti` (`idArrangiamentoOspite`, `idArrangiamento`, `idOspite`, `flgAcquirente`) VALUES
(1,	1,	1,	1),
(2,	2,	2,	1),
(3,	3,	3,	1),
(4,	4,	4,	1),
(5,	5,	5,	1),
(6,	6,	6,	1);

CREATE TABLE `arrangiamenti_servizi` (
  `idArrangiamentoServizio` int(11) NOT NULL AUTO_INCREMENT,
  `idArrangiamento` int(11) NOT NULL,
  `idServizio` int(11) NOT NULL,
  PRIMARY KEY (`idArrangiamentoServizio`),
  KEY `idArrangiamenti` (`idArrangiamento`),
  KEY `idServizi` (`idServizio`),
  CONSTRAINT `arrangiamenti_servizi_ibfk_1` FOREIGN KEY (`idArrangiamento`) REFERENCES `arrangiamenti` (`idArrangiamento`),
  CONSTRAINT `arrangiamenti_servizi_ibfk_2` FOREIGN KEY (`idServizio`) REFERENCES `servizi` (`idServizio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `arrangiamenti_servizi` (`idArrangiamentoServizio`, `idArrangiamento`, `idServizio`) VALUES
(1,	1,	36),
(2,	2,	36),
(3,	3,	36),
(4,	4,	36),
(5,	5,	36),
(6,	6,	36);

CREATE TABLE `categoriemanutenzioni` (
  `idCategoriaManutenzione` int(11) NOT NULL AUTO_INCREMENT,
  `cdCategoriaManutenzione` varchar(45) NOT NULL,
  `sort` int(11) NOT NULL,
  PRIMARY KEY (`idCategoriaManutenzione`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `categoriemanutenzioni` (`idCategoriaManutenzione`, `cdCategoriaManutenzione`, `sort`) VALUES
(1,	'electricity',	1),
(2,	'heating',	2),
(3,	'hydraulics',	3),
(4,	'brickworks',	4),
(5,	'furniture',	5);

CREATE TABLE `categoriemanutenzioni_lingua` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idCategoriaManutenzione` int(11) NOT NULL,
  `Lingua` varchar(6) NOT NULL,
  `dsCategoriaManutenzione` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idCategoriaManutenzione` (`idCategoriaManutenzione`),
  CONSTRAINT `categoriemanutenzioni_lingua_ibfk_2` FOREIGN KEY (`idCategoriaManutenzione`) REFERENCES `categoriemanutenzioni` (`idCategoriaManutenzione`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `categoriemanutenzioni_lingua` (`id`, `idCategoriaManutenzione`, `Lingua`, `dsCategoriaManutenzione`) VALUES
(1,	1,	'en',	'Electricity'),
(2,	1,	'it',	'Elettricità'),
(3,	2,	'en',	'Heating'),
(4,	2,	'it',	'Riscaldamento'),
(5,	3,	'en',	'Hydraulics'),
(6,	3,	'it',	'Idraulica'),
(7,	4,	'en',	'Brickworks'),
(8,	4,	'it',	'Opere Murarie'),
(9,	5,	'en',	'Furniture'),
(10,	5,	'it',	'Arredamento');

CREATE TABLE `categorieservizi` (
  `idCategoriaServizio` int(11) NOT NULL AUTO_INCREMENT,
  `cdCategoriaServizio` varchar(45) NOT NULL,
  `sort` int(11) NOT NULL,
  PRIMARY KEY (`idCategoriaServizio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `categorieservizi` (`idCategoriaServizio`, `cdCategoriaServizio`, `sort`) VALUES
(1,	'food',	0),
(2,	'transport',	0),
(3,	'laundry',	0),
(4,	'wellness',	0),
(5,	'touring',	0),
(6,	'shopping',	0),
(7,	'parking',	0);

CREATE TABLE `categorieservizi_lingua` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idCategoriaServizio` int(11) NOT NULL,
  `Lingua` varchar(6) NOT NULL,
  `dsCategoriaServizio` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idCategorieServizi` (`idCategoriaServizio`),
  CONSTRAINT `categorieservizi_lingua_ibfk_2` FOREIGN KEY (`idCategoriaServizio`) REFERENCES `categorieservizi` (`idCategoriaServizio`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `categorieservizi_lingua` (`id`, `idCategoriaServizio`, `Lingua`, `dsCategoriaServizio`) VALUES
(1,	1,	'en',	'Food & Beverage'),
(2,	1,	'it',	'Food & Beverage'),
(3,	2,	'en',	'Transport'),
(4,	2,	'it',	'Trasporti'),
(5,	3,	'en',	'Laundry'),
(6,	3,	'it',	'Lavanderia'),
(7,	4,	'en',	'Wellness'),
(8,	4,	'it',	'Benessere'),
(9,	5,	'en',	'Tourism'),
(10,	5,	'it',	'Turismo'),
(11,	6,	'en',	'Shopping'),
(12,	6,	'it',	'Shopping'),
(13,	7,	'en',	'Parking and ZTL'),
(14,	7,	'it',	'Soste e ZTL');

CREATE TABLE `contenuti` (
  `idContenuto` int(11) NOT NULL AUTO_INCREMENT,
  `cdContenuto` varchar(50) NOT NULL,
  `dsContenuto` varchar(100) NOT NULL,
  PRIMARY KEY (`idContenuto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `contenuti` (`idContenuto`, `cdContenuto`, `dsContenuto`) VALUES
(1,	'FRM000',	'Home'),
(2,	'FRM001',	'Servizi'),
(3,	'FRM002',	'Comunicazione'),
(4,	'FRM003',	'Memo');

CREATE TABLE `contenuti_lingua` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idContenuto` int(11) NOT NULL,
  `Lingua` varchar(6) NOT NULL,
  `Titolo` varchar(255) DEFAULT NULL,
  `Testo` text NOT NULL,
  `jsonExtra` text,
  PRIMARY KEY (`id`),
  KEY `idContenuti` (`idContenuto`),
  CONSTRAINT `contenuti_lingua_ibfk_2` FOREIGN KEY (`idContenuto`) REFERENCES `contenuti` (`idContenuto`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `contenuti_lingua` (`id`, `idContenuto`, `Lingua`, `Titolo`, `Testo`, `jsonExtra`) VALUES
(1,	1,	'en',	'Home',	'<p>Pressing buttons you can:</p>\r\n<p>Roller - Discover and manage your services.</p>\r\n<p>Message - Interact with the building people.</p>\r\n<p>Position - Save and return to locations.</p>\r\n<p>Key - Open the door of your accomodation.</p>',	NULL),
(2,	1,	'it',	'Casa',	'<p>Premendo i vari pulsanti potrete:</p>\r\n<p>Rotella - Scoprire e gestire i vostri servizi.</p>\r\n<p>Messaggio - Interagire con le persone preposte al vostro alloggio.</p>\r\n<p>Posizione - Salvare e ritornare ad una locazione.</p>',	NULL),
(3,	2,	'en',	'Services',	'<p>Interacting with your services...</p>\r\n<p>...</p>',	NULL),
(4,	2,	'it',	'Servizi',	'<p>Interagire con i tuoi servizi...</p>\r\n<p>...</p>',	NULL),
(5,	3,	'en',	'Communication',	'<p>You can communicate with operators through chat.</p>\r\n<p>...</p>',	NULL),
(6,	3,	'it',	'Comunicazione',	'<p>Puoi comunicare con gli operatori tramite chat.</p>\r\n<p>Un operatore ti risponder&agrave; in tempi rapidi (una notifica ti arriver&agrave; sul telefono per avvisarti della risposta).</p>',	NULL),
(7,	4,	'en',	'Memo',	'<p>Save your current position and return when you want.</p>\r\n<p>Useful in unknown places to find car in parking, your accomodation ....</p>',	NULL),
(8,	4,	'it',	'Memo',	'<p>Salva la tua posizione corrente e ritornaci quando vuoi.</p>\r\n<p>Utile in locazioni sconosciute per trovare la macchina al parcheggio / il tuo alloggio.</p>',	NULL);

CREATE TABLE `dispositivi` (
  `idDispositivo` int(11) NOT NULL AUTO_INCREMENT,
  `IMEI` varchar(45) NOT NULL,
  PRIMARY KEY (`idDispositivo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `fornitori` (
  `idFornitore` int(11) NOT NULL AUTO_INCREMENT,
  `cdFornitore` varchar(45) DEFAULT NULL,
  `dsFornitore` varchar(100) NOT NULL,
  PRIMARY KEY (`idFornitore`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `guastimanutenzioni` (
  `idGuastoManutenzione` int(11) NOT NULL AUTO_INCREMENT COMMENT 'identificativo PK',
  `idStruttura` int(11) DEFAULT NULL COMMENT 'Identificativo Struttura oggetto dell''''intervento',
  `idCategoriaManutenzione` int(11) DEFAULT NULL COMMENT 'categorizzazione intervento',
  `idCliente` int(11) DEFAULT NULL COMMENT 'cliente che inserisce la richiesta',
  `idAddetto` int(11) DEFAULT NULL COMMENT 'operatore che riceve e gestisce la richiesta',
  `idFornitore` int(11) DEFAULT NULL COMMENT 'identificativo incaricato all''''intervento',
  `idVerificatore` int(11) DEFAULT NULL COMMENT 'Identificazione del Verificatore incaricato',
  `idAssegnatario` int(11) DEFAULT NULL COMMENT 'identificativo del Verificatore incaricato e destinatario delle verifica',
  `OggettoSegnalazione` varchar(100) DEFAULT NULL COMMENT 'titolo della segnalazione',
  `dsSegnalazione` text NOT NULL COMMENT 'descrizione della segnalazione per la richiesta',
  `UbicazioneGuasto` varchar(100) NOT NULL COMMENT 'codice di ubicazione guasto',
  `EsitoVerifica` tinyint(4) DEFAULT NULL COMMENT 'Esito della verifica',
  `ntEsecuzioneVerifica` text COMMENT 'diagnosi della verifica ed annotazioni',
  `dsDescrizioneIntervento` text,
  `dsMotivoAnnullo` text,
  `dtRicezioneRichiesta` datetime DEFAULT NULL COMMENT 'date time di ricevimento della segnalazione',
  `dtRichiestaVerifica` datetime DEFAULT NULL COMMENT 'date time di inoltro della richiesta di verifica della segnalazione',
  `dtPianificazioneVerifica` datetime DEFAULT NULL COMMENT 'date time di pianificazione della verifica',
  `dtEsecuzioneVerifica` datetime DEFAULT NULL COMMENT 'date time di esecuzione della verifica della segnalazione',
  `dtRichiestaIntervento` datetime DEFAULT NULL COMMENT 'data time di inoltro della richiesta di intervento',
  `dtAccettazioneFornitore` datetime DEFAULT NULL COMMENT 'data time in cui il fornitore ha accettato la richiesta',
  `dtPianificazioneIntervento` datetime DEFAULT NULL,
  `dtEsecuzioneIntervento` datetime DEFAULT NULL,
  `dtAnnullo` datetime DEFAULT NULL,
  `dtAccettazioneAnnullo` datetime DEFAULT NULL COMMENT 'accettazione annullo intervento dal Fornitore',
  `dtAggiornamento` datetime NOT NULL COMMENT 'date time ultimo aggiornamento',
  `cdStato` varchar(3) NOT NULL COMMENT 'codice stato richiesta',
  `fileImmagine` varchar(255) DEFAULT NULL COMMENT 'Allegato immagine',
  PRIMARY KEY (`idGuastoManutenzione`),
  KEY `fk_GuastiManutenzioni_Addetto_idx` (`idAddetto`),
  KEY `fk_GuastiManutenzioni_Fornitore_idx` (`idFornitore`),
  KEY `fk_GuastiManutenzioni_Strutture_idx` (`idStruttura`),
  KEY `fk_GuastiManutenzioni_Cliente` (`idCliente`),
  KEY `idCategoriaManutenzione` (`idCategoriaManutenzione`),
  CONSTRAINT `fk_GuastiManutenzioni_Addetto` FOREIGN KEY (`idAddetto`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_GuastiManutenzioni_Cliente` FOREIGN KEY (`idCliente`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_GuastiManutenzioni_Fornitore` FOREIGN KEY (`idFornitore`) REFERENCES `fornitori` (`idFornitore`),
  CONSTRAINT `fk_GuastiManutenzioni_Strutture` FOREIGN KEY (`idStruttura`) REFERENCES `strutture` (`idStruttura`),
  CONSTRAINT `guastimanutenzioni_ibfk_1` FOREIGN KEY (`idCategoriaManutenzione`) REFERENCES `categoriemanutenzioni` (`idCategoriaManutenzione`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `guastimanutenzioni` (`idGuastoManutenzione`, `idStruttura`, `idCategoriaManutenzione`, `idCliente`, `idAddetto`, `idFornitore`, `idVerificatore`, `idAssegnatario`, `OggettoSegnalazione`, `dsSegnalazione`, `UbicazioneGuasto`, `EsitoVerifica`, `ntEsecuzioneVerifica`, `dsDescrizioneIntervento`, `dsMotivoAnnullo`, `dtRicezioneRichiesta`, `dtRichiestaVerifica`, `dtPianificazioneVerifica`, `dtEsecuzioneVerifica`, `dtRichiestaIntervento`, `dtAccettazioneFornitore`, `dtPianificazioneIntervento`, `dtEsecuzioneIntervento`, `dtAnnullo`, `dtAccettazioneAnnullo`, `dtAggiornamento`, `cdStato`, `fileImmagine`) VALUES
(1,	NULL,	1,	6,	2,	NULL,	NULL,	NULL,	'prova',	'frigorifero guasto',	'cucina',	NULL,	NULL,	NULL,	NULL,	'2018-10-23 16:00:47',	NULL,	'2018-10-31 18:10:00',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'2018-10-31 13:08:01',	'cp',	NULL),
(2,	NULL,	1,	6,	2,	NULL,	NULL,	NULL,	'prova',	'frigorifero guasto',	'cucina',	NULL,	NULL,	NULL,	NULL,	'2018-10-23 16:01:43',	NULL,	'2018-10-31 00:00:00',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'2018-10-31 11:10:29',	'cp',	NULL),
(3,	NULL,	4,	8,	8,	NULL,	NULL,	NULL,	'Maurizio test',	'Si sono verificate crepe nella parete\r\n',	'Sala riunioni',	NULL,	'ribadisco le note di esecuzione',	NULL,	NULL,	'2018-10-25 16:10:14',	NULL,	'2018-10-31 17:00:00',	'2018-11-07 15:50:00',	NULL,	NULL,	'2018-10-30 00:00:00',	NULL,	NULL,	NULL,	'2018-10-31 13:53:23',	'cd',	NULL),
(4,	NULL,	1,	6,	2,	NULL,	NULL,	NULL,	'prova',	'asd',	'cucina',	NULL,	NULL,	NULL,	NULL,	'2018-10-31 13:46:36',	NULL,	'2018-11-13 18:00:00',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'2018-11-12 22:11:06',	'cp',	NULL),
(5,	NULL,	2,	6,	NULL,	NULL,	NULL,	NULL,	'test',	'test test test',	'tes',	NULL,	NULL,	NULL,	NULL,	'2018-11-12 22:58:20',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'2018-11-12 22:58:20',	'rr',	NULL),
(6,	NULL,	1,	6,	NULL,	NULL,	NULL,	NULL,	'asd',	'asd',	'asd',	NULL,	NULL,	NULL,	NULL,	'2018-11-14 13:32:21',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'2018-11-14 13:32:21',	'rr',	NULL),
(7,	NULL,	3,	6,	NULL,	NULL,	NULL,	NULL,	'rubinetto perde',	'ciao',	'bagno',	NULL,	NULL,	NULL,	NULL,	'2018-11-16 11:25:18',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'2018-11-16 11:25:18',	'rr',	'5beea91e0c63d.jpg'),
(8,	NULL,	3,	6,	NULL,	NULL,	NULL,	NULL,	'rubinetto perde ancora',	'ciao',	'bagno',	NULL,	NULL,	NULL,	NULL,	'2018-11-16 11:29:35',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'2018-11-16 11:29:35',	'rr',	'5beeaa1f5a774.jpg'),
(9,	NULL,	4,	8,	NULL,	NULL,	NULL,	NULL,	'Test due',	'Segnalazione guasto',	'Corso buenos aires',	NULL,	NULL,	NULL,	NULL,	'2018-11-16 14:25:46',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'2018-11-16 14:25:46',	'rr',	'5beed36a686b2.png'),
(10,	NULL,	4,	8,	NULL,	NULL,	NULL,	NULL,	'Segnalazione ',	'Descrizione della segnalazione del giorno 21.11\r\n',	'Corso buenos aires',	NULL,	NULL,	NULL,	NULL,	'2018-11-21 09:39:51',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'2018-11-21 09:39:51',	'rr',	'5bf527e750e07.png'),
(11,	NULL,	1,	8,	2,	NULL,	NULL,	NULL,	'Perdita acqua',	'Il rubinetto perde es hizza',	'Nel bagno',	NULL,	NULL,	NULL,	NULL,	'2018-11-21 15:01:00',	NULL,	'2018-12-20 10:00:00',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'2018-12-18 14:48:11',	'cp',	NULL),
(12,	NULL,	3,	6,	NULL,	NULL,	NULL,	NULL,	'test immagine',	'test',	'bagno',	NULL,	NULL,	NULL,	NULL,	'2018-12-18 14:51:09',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'2018-12-18 14:51:09',	'rr',	'5c19095d676cd.jpg'),
(13,	NULL,	1,	8,	NULL,	NULL,	NULL,	NULL,	'Its an test',	'Its a test try',	'Test',	NULL,	NULL,	NULL,	NULL,	'2019-01-19 22:09:21',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'2019-01-19 22:09:21',	'rr',	'5c43a0118e563.jpg'),
(14,	NULL,	3,	6,	NULL,	NULL,	NULL,	NULL,	'altro test',	'a',	'bagno',	NULL,	NULL,	NULL,	NULL,	'2019-01-28 10:13:04',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'2019-01-28 10:13:04',	'rr',	'5c4ed5b016dc9.jpg');

CREATE TABLE `menu` (
  `idMenu` int(11) NOT NULL AUTO_INCREMENT,
  `cdMenu` varchar(20) NOT NULL,
  `idPadre` int(11) DEFAULT NULL COMMENT 'livello padre',
  `flgAttivo` tinyint(4) NOT NULL,
  `flgAutenticazione` tinyint(4) NOT NULL,
  `dtAttivazione` datetime DEFAULT NULL,
  `dtUltModifica` datetime DEFAULT NULL,
  `IdAddetto` int(11) DEFAULT NULL,
  `sort` int(11) NOT NULL,
  PRIMARY KEY (`idMenu`),
  KEY `fkMenu_idx` (`idPadre`),
  KEY `fkAddetti_idx` (`IdAddetto`),
  CONSTRAINT `fkAddetti` FOREIGN KEY (`IdAddetto`) REFERENCES `addetti` (`idAddetto`),
  CONSTRAINT `fkMenu` FOREIGN KEY (`idPadre`) REFERENCES `menu` (`idMenu`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `menu` (`idMenu`, `cdMenu`, `idPadre`, `flgAttivo`, `flgAutenticazione`, `dtAttivazione`, `dtUltModifica`, `IdAddetto`, `sort`) VALUES
(1,	'MENU001',	NULL,	1,	1,	NULL,	NULL,	NULL,	1),
(2,	'MENU002',	NULL,	1,	1,	NULL,	NULL,	NULL,	2),
(3,	'MENU003',	NULL,	1,	0,	NULL,	NULL,	NULL,	3),
(4,	'test_login',	3,	1,	1,	NULL,	NULL,	NULL,	4),
(6,	'SERVICE_1',	1,	1,	0,	NULL,	NULL,	NULL,	6),
(7,	'food',	1,	1,	0,	NULL,	NULL,	NULL,	5),
(8,	'foodora',	1,	1,	0,	NULL,	NULL,	NULL,	7),
(9,	'transports',	1,	1,	0,	NULL,	NULL,	NULL,	11),
(10,	'uber',	1,	1,	0,	NULL,	NULL,	NULL,	12),
(11,	'Deliveroo',	1,	1,	0,	NULL,	NULL,	NULL,	8),
(12,	'BacchetteForchette',	1,	1,	0,	NULL,	NULL,	NULL,	9),
(13,	'Uber Eats',	1,	1,	0,	NULL,	NULL,	NULL,	10),
(14,	'NCC Milano',	1,	1,	0,	NULL,	NULL,	NULL,	13),
(15,	'Vip Car',	1,	1,	0,	NULL,	NULL,	NULL,	14),
(16,	'ShopperLux',	1,	1,	0,	NULL,	NULL,	NULL,	16),
(17,	'Personal Shopper',	1,	1,	0,	NULL,	NULL,	NULL,	15),
(18,	'CosaMiMettoOggi',	1,	1,	0,	NULL,	NULL,	NULL,	17),
(19,	'IlariaConversano',	1,	1,	0,	NULL,	NULL,	NULL,	18),
(20,	'Benessere',	1,	1,	0,	NULL,	NULL,	NULL,	19),
(21,	'Chateau Monfort',	1,	1,	0,	NULL,	NULL,	NULL,	20),
(22,	'HammamDellaRosa',	1,	1,	0,	NULL,	NULL,	NULL,	21),
(23,	'PalazzoParigi',	1,	1,	0,	NULL,	NULL,	NULL,	22),
(24,	'Manutenzioni',	2,	1,	1,	NULL,	NULL,	NULL,	23),
(25,	'Elettrica',	2,	1,	1,	NULL,	NULL,	NULL,	25),
(26,	'Heating',	2,	1,	1,	NULL,	NULL,	NULL,	26),
(27,	'Hydraulics',	2,	1,	1,	NULL,	NULL,	NULL,	27),
(28,	'Brickworks',	2,	1,	1,	NULL,	NULL,	NULL,	28),
(29,	'Furniture',	2,	1,	1,	NULL,	NULL,	NULL,	29),
(30,	'Doors',	24,	1,	0,	NULL,	NULL,	NULL,	31),
(31,	'maintenance-new',	2,	1,	1,	NULL,	NULL,	NULL,	30),
(32,	'maintenance-index',	2,	1,	1,	NULL,	NULL,	NULL,	24);

CREATE TABLE `menu_lingua` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idMenu` int(11) NOT NULL,
  `Lingua` varchar(6) NOT NULL,
  `Titolo` varchar(45) NOT NULL,
  `PageURL` varchar(200) DEFAULT NULL,
  `ImageURL` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fkMenuLinguaMenu_idx` (`idMenu`),
  CONSTRAINT `menu_lingua_ibfk_1` FOREIGN KEY (`idMenu`) REFERENCES `menu` (`idMenu`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `menu_lingua` (`id`, `idMenu`, `Lingua`, `Titolo`, `PageURL`, `ImageURL`) VALUES
(1,	1,	'en',	'Services',	'service',	''),
(2,	1,	'it',	'Servizi',	'service',	''),
(3,	2,	'en',	'Contact us',	'site/contact',	''),
(4,	2,	'it',	'Contattaci',	'site/contact',	''),
(5,	3,	'en',	'Utilities',	'',	''),
(6,	3,	'it',	'Utilità',	'',	''),
(7,	4,	'en',	'Test page for login',	'site/test',	'https://testcreative.co.uk/wp-content/uploads/2017/10/Test-Logo-Circle-black-transparent.png'),
(8,	4,	'it',	'Pagina di test per il login',	'site/test',	'https://testcreative.co.uk/wp-content/uploads/2017/10/Test-Logo-Circle-black-transparent.png'),
(11,	6,	'en',	'     Just Eat',	'https://www.justeat.it/',	'http://www.streatart.it/images/streatartimages/JustEat-LOGO.png'),
(12,	6,	'it',	'     Just Eat',	'https://www.justeat.it/',	'http://www.streatart.it/images/streatartimages/JustEat-LOGO.png'),
(13,	7,	'en',	'Food',	'',	''),
(14,	7,	'it',	'Cibo',	'',	''),
(15,	8,	'en',	'     Foodora',	'https://www.foodora.it/en/',	'https://media-cdn.tripadvisor.com/media/photo-s/0b/b3/4e/92/polentone.jpg'),
(16,	8,	'it',	'     Foodora',	'https://www.foodora.it',	'https://media-cdn.tripadvisor.com/media/photo-s/0b/b3/4e/92/polentone.jpg'),
(17,	9,	'en',	'Transports',	'',	''),
(18,	9,	'it',	'Trasporti',	'',	''),
(19,	10,	'en',	'     Uber',	'https://www.uber.com',	'http://www.radiosapienza.net/2015/wp-content/uploads/2017/05/uber-logo.png'),
(20,	10,	'it',	'     Uber',	'https://www.uber.com/it/it/',	'http://www.radiosapienza.net/2015/wp-content/uploads/2017/05/uber-logo.png'),
(21,	11,	'en',	'     Deliveroo',	'https://deliveroo.it/en/',	'https://www.qualescegliere.it/wp-content/uploads/2017/12/deliveroo.png'),
(22,	11,	'it',	'     Deliveroo',	'https://deliveroo.it/it/',	'https://www.qualescegliere.it/wp-content/uploads/2017/12/deliveroo.png'),
(23,	12,	'en',	'     Bacchette Forchette',	'https://www.bacchetteforchette.it/milano',	'https://www.qualescegliere.it/wp-content/uploads/2017/12/bacchette-e-forchette.png'),
(24,	12,	'it',	'     Bacchette Forchette',	'https://www.bacchetteforchette.it/milano',	'https://www.qualescegliere.it/wp-content/uploads/2017/12/bacchette-e-forchette.png'),
(25,	13,	'en',	'     Uber Eats',	'https://www.ubereats.com/en-EN/',	'https://www.qualescegliere.it/wp-content/uploads/2017/12/uber-eats.png'),
(26,	13,	'it',	'     Uber Eats',	'https://www.ubereats.com/it-IT/',	'https://www.qualescegliere.it/wp-content/uploads/2017/12/uber-eats.png'),
(27,	14,	'en',	'     NCC Milano',	'https://www.ncc.milano.it/',	'http://taxiseveso.it/wp-content/uploads/2016/10/cartello-driver-taxi-seveso-colonna-300x234.jpg?x29199'),
(28,	14,	'it',	'     NCC Milano',	'https://www.ncc.milano.it/',	'http://taxiseveso.it/wp-content/uploads/2016/10/cartello-driver-taxi-seveso-colonna-300x234.jpg?x29199'),
(29,	15,	'en',	'     Vip Car Service',	'https://www.autonoleggioconducentemilano.it/',	'https://www.autonoleggioconducentemilano.it/images/nccmilano.png'),
(30,	15,	'it',	'     Vip Car Service',	'https://www.autonoleggioconducentemilano.it/',	'https://www.autonoleggioconducentemilano.it/images/nccmilano.png'),
(31,	16,	'en',	'     Shopper Lux',	'http://www.personalshopperluxury.com/eng/personalshoppermilan-contacts.html',	'http://www.modadivas.com/Public/WwContentPro/WwAdv_Img/WwArticoliImg/1626/logo-ai-ps_.jpg'),
(32,	16,	'it',	'     Shopper Lux',	'http://www.personalshopperluxury.com/personalshoppermilano-contatti.html',	'http://www.modadivas.com/Public/WwContentPro/WwAdv_Img/WwArticoliImg/1626/logo-ai-ps_.jpg'),
(33,	17,	'en',	'Personal Shopper',	'',	''),
(34,	17,	'it',	'Personal Shopper',	'',	''),
(35,	18,	'en',	'     Cosa mi metto oggi',	'http://www.cosamimettooggi.com/en/personal-shopper-in-rome/',	'http://www.cosamimettooggi.com/wp-content/themes/cosami/img/logo.png'),
(36,	18,	'it',	'     Cosa mi metto oggi',	'http://www.cosamimettooggi.com/it/personal-shopper-roma/',	'http://www.cosamimettooggi.com/wp-content/themes/cosami/img/logo.png'),
(37,	19,	'en',	'     Ilaria Conversano',	'https://www.ilariaconversano.com/personal-shopper-1',	'https://static.wixstatic.com/media/a99b82_698231fe67a94c749963d74aa5e8e737.jpg/v1/fill/w_135,h_129,al_c,q_80,usm_0.66_1.00_0.01/a99b82_698231fe67a94c749963d74aa5e8e737.webp'),
(38,	19,	'it',	'     Ilaria Conversano',	'https://www.ilariaconversano.com/personal-shopper-1',	'https://static.wixstatic.com/media/a99b82_698231fe67a94c749963d74aa5e8e737.jpg/v1/fill/w_135,h_129,al_c,q_80,usm_0.66_1.00_0.01/a99b82_698231fe67a94c749963d74aa5e8e737.webp'),
(39,	20,	'en',	'Beauty Farm',	'',	''),
(40,	20,	'it',	'Benessere',	'',	''),
(41,	21,	'en',	'     Chateau Monfort',	'http://www.hotelchateaumonfort.com/en/index.html',	'http://www.hotelchateaumonfort.com/images/logo1.png'),
(42,	21,	'it',	'     Chateau Monfort',	'http://www.hotelchateaumonfort.com/spa-benessere-hotel-milano.html',	'http://www.hotelchateaumonfort.com/images/logo1.png'),
(43,	22,	'en',	'     Hammam Della Rosa',	'https://www.hammamdellarosa.com/',	'https://www.hammamdellarosa.com/wp-content/uploads/2016/10/hammam_100.png'),
(44,	22,	'it',	'     Hammam Della Rosa',	'https://www.hammamdellarosa.com/',	'https://www.hammamdellarosa.com/wp-content/uploads/2016/10/hammam_100.png'),
(45,	23,	'en',	'     Palazzo Parigi',	'http://www.palazzoparigi.com/en/palazzo-parigi-wellness-and-spa-in-milan.html',	'http://www.palazzoparigi.com/templates/main/images/Virtuoso-logo.png?5ba88d45e1f85'),
(46,	23,	'it',	'     Palazzo Parigi',	'http://www.palazzoparigi.com/it/benessere-spa-milano.html',	'http://www.palazzoparigi.com/templates/main/images/Virtuoso-logo.png?5ba88d45e1f85'),
(47,	24,	'en',	'Maintenance',	'',	''),
(48,	24,	'it',	'Manutenzioni',	'',	''),
(49,	25,	'en',	'     Electricity',	'/maintenance/create?category=electricity',	'http://electric.com.au/wp-content/uploads/2015/08/eletricity-icon2.png'),
(50,	25,	'it',	'     Elettricità',	'/maintenance/create?category=electricity',	'http://electric.com.au/wp-content/uploads/2015/08/eletricity-icon2.png'),
(51,	26,	'en',	'     Heating maintenance',	'/maintenance/create?category=heating',	'http://0404016.netsolhost.com/assets/logo_icon-300x300.png'),
(52,	26,	'it',	'     Riscaldamento',	'/maintenance/create?category=heating',	'http://0404016.netsolhost.com/assets/logo_icon-300x300.png'),
(53,	27,	'en',	'     Hydraulics maintenance',	'/maintenance/create?category=hydraulics',	'/img/services/hydraulics.png'),
(54,	27,	'it',	'     Idraulica',	'/maintenance/create?category=hydraulics',	'/img/services/hydraulics.png'),
(55,	28,	'en',	'     Brickworks',	'/maintenance/create?category=brickworks',	'https://previews.123rf.com/images/john79/john791802/john79180200176/96522285-repair-and-maintenance-of-buildings-with-tool-symbol-.jpg'),
(56,	28,	'it',	'     Opere murarie',	'/maintenance/create?category=brickworks',	'https://previews.123rf.com/images/john79/john791802/john79180200176/96522285-repair-and-maintenance-of-buildings-with-tool-symbol-.jpg'),
(57,	29,	'en',	'     Furniture maintenance',	'/maintenance/create?category=furniture',	'https://www.cookesfurniture.co.uk/images/pages/267-upholsteryicon.png'),
(58,	29,	'it',	'     Arredamento',	'/maintenance/create?category=furniture',	'https://www.cookesfurniture.co.uk/images/pages/267-upholsteryicon.png'),
(59,	30,	'en',	'Doors Key',	'http://www.iseo.it/iseoserrature/eng/cilindri.html',	''),
(60,	30,	'it',	'Chiavi Appartamenti',	'http://www.iseo.it/iseoserrature/cilindri.html',	''),
(61,	31,	'en',	'     Report a problem',	'/maintenance/create',	''),
(62,	31,	'it',	'     Segnala un guasto',	'/maintenance/create',	''),
(63,	32,	'en',	'     Reports List',	'/maintenance',	''),
(64,	32,	'it',	'     Elenco Segnalazioni',	'/maintenance',	'');

CREATE TABLE `migration` (
  `version` varchar(180) NOT NULL,
  `apply_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `migration` (`version`, `apply_time`) VALUES
('m000000_000000_base',	1535050906),
('m130524_201442_init',	1535050908);

CREATE TABLE `note` (
  `idNota` int(11) NOT NULL AUTO_INCREMENT,
  `Tabella` varchar(30) NOT NULL,
  `idTabella` int(11) NOT NULL,
  `idUtente` int(11) NOT NULL,
  `dtInserimento` datetime NOT NULL,
  `Testo` text NOT NULL,
  PRIMARY KEY (`idNota`),
  KEY `idUtente` (`idUtente`),
  CONSTRAINT `note_ibfk_1` FOREIGN KEY (`idUtente`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `opzioniservizi` (
  `idOpzioneServizio` int(11) NOT NULL AUTO_INCREMENT,
  `idServizio` int(11) NOT NULL,
  `cdOpzioneServizio` varchar(45) NOT NULL,
  `Prezzo` decimal(8,2) DEFAULT NULL,
  `sort` int(11) NOT NULL,
  PRIMARY KEY (`idOpzioneServizio`),
  KEY `idServizio` (`idServizio`),
  CONSTRAINT `opzioniservizi_ibfk_2` FOREIGN KEY (`idServizio`) REFERENCES `servizi` (`idServizio`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `opzioniservizi` (`idOpzioneServizio`, `idServizio`, `cdOpzioneServizio`, `Prezzo`, `sort`) VALUES
(1,	35,	'small',	NULL,	1),
(2,	35,	'medium',	NULL,	2),
(3,	35,	'large',	NULL,	3),
(4,	35,	'sw',	NULL,	4);

CREATE TABLE `opzioniservizi_lingua` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idOpzioneServizio` int(11) NOT NULL,
  `Lingua` varchar(6) NOT NULL,
  `dsOpzioneServizio` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idOpzioneServizio` (`idOpzioneServizio`),
  CONSTRAINT `opzioniservizi_lingua_ibfk_2` FOREIGN KEY (`idOpzioneServizio`) REFERENCES `opzioniservizi` (`idOpzioneServizio`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `opzioniservizi_lingua` (`id`, `idOpzioneServizio`, `Lingua`, `dsOpzioneServizio`) VALUES
(1,	2,	'en',	'Medium'),
(2,	2,	'it',	'Media'),
(3,	1,	'en',	'Small'),
(4,	1,	'it',	'Piccola'),
(5,	3,	'en',	'Large'),
(6,	3,	'it',	'Grande'),
(7,	4,	'en',	'Station Wagon'),
(8,	4,	'it',	'Station Wagon');

CREATE TABLE `ospiti` (
  `idOspite` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificativo Allineato col PMS',
  `idUser` int(11) DEFAULT NULL COMMENT 'User associato all''ospite',
  `Nome` varchar(45) NOT NULL,
  `Cognome` varchar(45) NOT NULL,
  `Email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idOspite`),
  KEY `idUser` (`idUser`),
  CONSTRAINT `ospiti_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `ospiti` (`idOspite`, `idUser`, `Nome`, `Cognome`, `Email`) VALUES
(1,	2,	'Test',	'Test',	'test@test.it'),
(2,	4,	'Maurizio',	'Moretti',	'm.moretti@palmosoft.com'),
(3,	5,	'Fabio',	'Ceccatelli',	'f.ceccatelli@palmosoft.com'),
(4,	6,	'phiurs',	'phiurs',	'francesco.fiore@gmail.com'),
(5,	8,	'Maurizio',	'Biffi',	'maurizio.biffi@sinergidea.it'),
(6,	9,	'saqlan',	'saqlan',	'saqygee@gmail.com');

CREATE TABLE `richiesteservizi` (
  `idRichiesta` int(11) NOT NULL AUTO_INCREMENT COMMENT 'identificativo PK',
  `idArrangiamento` int(11) DEFAULT NULL COMMENT 'arrangiamento per cui si richiede il servizio',
  `idServizio` int(11) NOT NULL COMMENT 'codice del servizio richiesto',
  `idCliente` int(11) NOT NULL COMMENT 'cliente che richiede il servizio',
  `idAddetto` int(11) DEFAULT NULL COMMENT 'operatore che riceve e gestisce la richiesta',
  `idOpzione` int(11) DEFAULT NULL COMMENT 'opzione associata al servizio',
  `Oggetto` varchar(100) DEFAULT NULL COMMENT 'oggetto della richiesta',
  `Classe` varchar(20) NOT NULL COMMENT 'classe che implementa la gestione',
  `dsRichiesta` text COMMENT 'descrizione della richiesta ',
  `Valore` decimal(8,2) DEFAULT NULL COMMENT 'Valore del servizio',
  `ntRichiesta` text COMMENT 'Note del servizio richiesto',
  `dtInizio` datetime DEFAULT NULL COMMENT 'Data di inizio esecuzione servizio',
  `dtFine` datetime DEFAULT NULL COMMENT 'Data di fine esecuzione servizio',
  `Quantita` smallint(6) DEFAULT NULL COMMENT 'Quantità acquistata',
  `idFornitore` int(11) DEFAULT NULL COMMENT 'Identificativo del Fornitore ',
  `dtRicezioneRichiesta` datetime NOT NULL COMMENT 'date time di ricezione dal dispositivo',
  `dtRicezioneFornitore` datetime DEFAULT NULL COMMENT 'date time in cui il fornitore ha ricevuto la richiesta',
  `dtRispostaFornitore` datetime DEFAULT NULL COMMENT 'date time in cui il Fornitore ha riposto alla richiesta',
  `dtEsecuzioneFornitore` datetime DEFAULT NULL COMMENT 'Date time di controposta esecuzione prestazione dal Fornitore',
  `dtAnnulloCliente` datetime DEFAULT NULL COMMENT 'date time non accettazione del cliente ed annullo richiesta',
  `dtRifiutoFornitore` datetime DEFAULT NULL COMMENT 'date tme di accettazione annulle del Fornitore',
  `ntRifiutoFornitore` text COMMENT 'Note Fornitore su accettazione annulo ',
  `cdRifiutoMotivo` varchar(45) DEFAULT NULL,
  `jsonRichiesta` text COMMENT 'Parametri associati alla richiesta in formato JSON',
  `jsonRisposta` text COMMENT 'Parametri associati alla risposta in formato JSON',
  `dtAggiornamento` datetime DEFAULT NULL COMMENT 'date time ultimo aggiornamento',
  `cdStato` varchar(3) DEFAULT NULL COMMENT 'codice stato richiesta',
  PRIMARY KEY (`idRichiesta`),
  UNIQUE KEY `richiesteservizi_UNIQUE` (`idRichiesta`),
  KEY `fk_richiesteservizi_Fornitore_idx` (`idFornitore`),
  KEY `fk_richiesteservizi_Servizio_idx` (`idServizio`),
  KEY `fk_richiesteservizi_Opzione_idx` (`idOpzione`),
  KEY `fk_richiesteservizi_Cliente_idx` (`idCliente`),
  KEY `idArrangiamento` (`idArrangiamento`),
  CONSTRAINT `fk_richiesteservizi_Cliente` FOREIGN KEY (`idCliente`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_richiesteservizi_Fornitore` FOREIGN KEY (`idFornitore`) REFERENCES `fornitori` (`idFornitore`),
  CONSTRAINT `fk_richiesteservizi_Opzione` FOREIGN KEY (`idOpzione`) REFERENCES `opzioniservizi` (`idOpzioneServizio`),
  CONSTRAINT `fk_richiesteservizi_Servizio` FOREIGN KEY (`idServizio`) REFERENCES `servizi` (`idServizio`),
  CONSTRAINT `richiesteservizi_ibfk_1` FOREIGN KEY (`idArrangiamento`) REFERENCES `arrangiamenti` (`idArrangiamento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='	';

INSERT INTO `richiesteservizi` (`idRichiesta`, `idArrangiamento`, `idServizio`, `idCliente`, `idAddetto`, `idOpzione`, `Oggetto`, `Classe`, `dsRichiesta`, `Valore`, `ntRichiesta`, `dtInizio`, `dtFine`, `Quantita`, `idFornitore`, `dtRicezioneRichiesta`, `dtRicezioneFornitore`, `dtRispostaFornitore`, `dtEsecuzioneFornitore`, `dtAnnulloCliente`, `dtRifiutoFornitore`, `ntRifiutoFornitore`, `cdRifiutoMotivo`, `jsonRichiesta`, `jsonRisposta`, `dtAggiornamento`, `cdStato`) VALUES
(1,	NULL,	35,	6,	NULL,	2,	NULL,	'auto',	NULL,	NULL,	'',	'2018-11-22 14:50:00',	'2018-11-23 18:00:00',	NULL,	NULL,	'2018-11-21 12:54:34',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'2018-11-21 12:54:34',	'co'),
(2,	NULL,	36,	6,	NULL,	2,	NULL,	'laundry',	NULL,	NULL,	'',	'2018-11-22 14:30:00',	'2018-11-23 15:30:00',	10,	NULL,	'2018-11-23 13:43:01',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'2018-11-21 13:43:01',	'rr'),
(3,	NULL,	35,	6,	NULL,	2,	NULL,	'auto',	NULL,	NULL,	'test datetime',	'2019-01-14 18:00:00',	'2019-01-14 18:15:00',	NULL,	NULL,	'2019-01-13 17:13:51',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'2019-01-13 17:13:51',	'rr'),
(4,	NULL,	35,	6,	NULL,	1,	NULL,	'auto',	NULL,	NULL,	'',	'2019-01-17 11:29:00',	'2019-01-17 12:30:00',	NULL,	NULL,	'2019-01-17 10:29:51',	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	NULL,	'2019-01-17 10:29:51',	'rr');

CREATE TABLE `servizi` (
  `idServizio` int(11) NOT NULL AUTO_INCREMENT,
  `cdServizio` varchar(50) NOT NULL COMMENT 'codice servizio',
  `idCategoriaServizio` int(11) NOT NULL,
  `idFornitore` int(11) DEFAULT NULL,
  `Classe` varchar(20) DEFAULT NULL COMMENT 'Classe che implementa la gestione',
  `Prezzo` decimal(9,2) DEFAULT NULL COMMENT 'Prezzo unitario',
  `Unita` varchar(3) DEFAULT NULL COMMENT 'Codice tipo di unità (es. persone, tempo...)',
  `jsonDati` text,
  `sort` int(11) NOT NULL,
  PRIMARY KEY (`idServizio`),
  KEY `fk_CategoriaServizi_idx` (`idCategoriaServizio`),
  KEY `idFornitori` (`idFornitore`),
  CONSTRAINT `fk_CategoriaServizi` FOREIGN KEY (`idCategoriaServizio`) REFERENCES `categorieservizi` (`idCategoriaServizio`),
  CONSTRAINT `servizi_ibfk_1` FOREIGN KEY (`idFornitore`) REFERENCES `fornitori` (`idFornitore`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `servizi` (`idServizio`, `cdServizio`, `idCategoriaServizio`, `idFornitore`, `Classe`, `Prezzo`, `Unita`, `jsonDati`, `sort`) VALUES
(2,	'just-eat',	1,	NULL,	NULL,	NULL,	NULL,	NULL,	8),
(4,	'foodora',	1,	NULL,	NULL,	NULL,	NULL,	NULL,	7),
(6,	'uber',	2,	NULL,	NULL,	NULL,	NULL,	NULL,	14),
(7,	'Deliveroo',	1,	NULL,	NULL,	NULL,	NULL,	NULL,	6),
(8,	'BacchetteForchette',	1,	NULL,	NULL,	NULL,	NULL,	NULL,	9),
(9,	'Uber Eats',	1,	NULL,	NULL,	NULL,	NULL,	NULL,	10),
(10,	'NCC Milano',	2,	NULL,	NULL,	NULL,	NULL,	NULL,	15),
(11,	'Vip Car',	2,	NULL,	NULL,	NULL,	NULL,	NULL,	16),
(12,	'ShopperLux',	6,	NULL,	NULL,	NULL,	NULL,	NULL,	19),
(14,	'CosaMiMettoOggi',	6,	NULL,	NULL,	NULL,	NULL,	NULL,	20),
(15,	'IlariaConversano',	6,	NULL,	NULL,	NULL,	NULL,	NULL,	21),
(17,	'chateau-monfort',	4,	NULL,	NULL,	NULL,	NULL,	NULL,	23),
(18,	'HammamDellaRosa',	4,	NULL,	NULL,	NULL,	NULL,	NULL,	24),
(19,	'PalazzoParigi',	4,	NULL,	NULL,	NULL,	NULL,	NULL,	25),
(33,	'navetta',	2,	NULL,	NULL,	20.00,	NULL,	NULL,	11),
(34,	'mamaclean',	3,	NULL,	NULL,	NULL,	NULL,	NULL,	17),
(35,	'noleggio-auto',	2,	NULL,	'auto',	NULL,	NULL,	NULL,	12),
(36,	'laundry',	3,	NULL,	'laundry',	NULL,	NULL,	NULL,	13);

CREATE TABLE `servizi_lingua` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idServizio` int(11) NOT NULL,
  `Lingua` varchar(6) NOT NULL,
  `dsServizio` varchar(100) NOT NULL,
  `ntServizio` text,
  `PageURL` varchar(200) DEFAULT NULL,
  `ImageURL` varchar(200) DEFAULT NULL,
  `HeaderImageURL` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idServizi` (`idServizio`),
  CONSTRAINT `servizi_lingua_ibfk_2` FOREIGN KEY (`idServizio`) REFERENCES `servizi` (`idServizio`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `servizi_lingua` (`id`, `idServizio`, `Lingua`, `dsServizio`, `ntServizio`, `PageURL`, `ImageURL`, `HeaderImageURL`) VALUES
(1,	2,	'en',	'     Just Eat',	'<p>Lorem ipsum <strong>     Just Eat</strong> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',	'https://www.justeat.it/',	'/img/services/justeat.png',	NULL),
(2,	2,	'it',	'     Just Eat',	'<p>Lorem ipsum <strong>     Just Eat</strong> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',	'https://www.justeat.it/',	'/img/services/justeat.png',	NULL),
(5,	4,	'en',	'     Foodora',	'<p>Lorem ipsum <strong>     Foodora</strong> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',	'https://www.foodora.it/en/',	'https://media-cdn.tripadvisor.com/media/photo-s/0b/b3/4e/92/polentone.jpg',	NULL),
(6,	4,	'it',	'     Foodora',	'<p>Lorem ipsum <strong>     Foodora</strong> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',	'https://www.foodora.it',	'https://media-cdn.tripadvisor.com/media/photo-s/0b/b3/4e/92/polentone.jpg',	NULL),
(9,	6,	'en',	'     Uber',	'<p>Lorem ipsum <strong>     Uber</strong> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',	'https://www.uber.com',	'http://www.radiosapienza.net/2015/wp-content/uploads/2017/05/uber-logo.png',	NULL),
(10,	6,	'it',	'     Uber',	'<p>Lorem ipsum <strong>     Uber</strong> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',	'https://www.uber.com/it/it/',	'http://www.radiosapienza.net/2015/wp-content/uploads/2017/05/uber-logo.png',	NULL),
(11,	7,	'en',	'     Deliveroo',	'<p>Lorem ipsum <strong>     Deliveroo</strong> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',	'https://deliveroo.it/en/',	'https://www.qualescegliere.it/wp-content/uploads/2017/12/deliveroo.png',	NULL),
(12,	7,	'it',	'     Deliveroo',	'<p>Lorem ipsum <strong>     Deliveroo</strong> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',	'https://deliveroo.it/it/',	'https://www.qualescegliere.it/wp-content/uploads/2017/12/deliveroo.png',	NULL),
(13,	8,	'en',	'     Bacchette Forchette',	'<p>Lorem ipsum <strong>     Bacchette Forchette</strong> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',	'https://www.bacchetteforchette.it/milano',	'https://www.qualescegliere.it/wp-content/uploads/2017/12/bacchette-e-forchette.png',	NULL),
(14,	8,	'it',	'     Bacchette Forchette',	'<p>Lorem ipsum <strong>     Bacchette Forchette</strong> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',	'https://www.bacchetteforchette.it/milano',	'https://www.qualescegliere.it/wp-content/uploads/2017/12/bacchette-e-forchette.png',	NULL),
(15,	9,	'en',	'     Uber Eats',	'<p>Lorem ipsum <strong>     Uber Eats</strong> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',	'https://www.ubereats.com/en-EN/',	'https://www.qualescegliere.it/wp-content/uploads/2017/12/uber-eats.png',	NULL),
(16,	9,	'it',	'     Uber Eats',	'<p>Lorem ipsum <strong>     Uber Eats</strong> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',	'https://www.ubereats.com/it-IT/',	'https://www.qualescegliere.it/wp-content/uploads/2017/12/uber-eats.png',	NULL),
(17,	10,	'en',	'     NCC Milano',	'<p>Lorem ipsum <strong>     NCC Milano</strong> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',	'https://www.ncc.milano.it/',	'http://taxiseveso.it/wp-content/uploads/2016/10/cartello-driver-taxi-seveso-colonna-300x234.jpg?x29199',	NULL),
(18,	10,	'it',	'     NCC Milano',	'<p>Lorem ipsum <strong>     NCC Milano</strong> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',	'https://www.ncc.milano.it/',	'http://taxiseveso.it/wp-content/uploads/2016/10/cartello-driver-taxi-seveso-colonna-300x234.jpg?x29199',	NULL),
(19,	11,	'en',	'     Vip Car Service',	'<p>Lorem ipsum <strong>     Vip Car Service</strong> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',	'https://www.autonoleggioconducentemilano.it/',	'https://www.autonoleggioconducentemilano.it/images/nccmilano.png',	NULL),
(20,	11,	'it',	'     Vip Car Service',	'<p>Lorem ipsum <strong>     Vip Car Service</strong> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',	'https://www.autonoleggioconducentemilano.it/',	'https://www.autonoleggioconducentemilano.it/images/nccmilano.png',	NULL),
(21,	12,	'en',	'     Shopper Lux',	'<p>Lorem ipsum <strong>     Shopper Lux</strong> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',	'http://www.personalshopperluxury.com/eng/personalshoppermilan-contacts.html',	'http://www.modadivas.com/Public/WwContentPro/WwAdv_Img/WwArticoliImg/1626/logo-ai-ps_.jpg',	NULL),
(22,	12,	'it',	'     Shopper Lux',	'<p>Lorem ipsum <strong>     Shopper Lux</strong> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',	'http://www.personalshopperluxury.com/personalshoppermilano-contatti.html',	'http://www.modadivas.com/Public/WwContentPro/WwAdv_Img/WwArticoliImg/1626/logo-ai-ps_.jpg',	NULL),
(25,	14,	'en',	'     Cosa mi metto oggi',	'<p>Lorem ipsum <strong>     Cosa mi metto oggi</strong> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',	'http://www.cosamimettooggi.com/en/personal-shopper-in-rome/',	'/img/services/cmmo.png',	NULL),
(26,	14,	'it',	'     Cosa mi metto oggi',	'<p>Lorem ipsum <strong>     Cosa mi metto oggi</strong> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',	'http://www.cosamimettooggi.com/it/personal-shopper-roma/',	'/img/services/cmmo.png',	NULL),
(27,	15,	'en',	'     Ilaria Conversano',	'<p>Lorem ipsum <strong>     Ilaria Conversano</strong> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',	'https://www.ilariaconversano.com/personal-shopper-1',	'https://static.wixstatic.com/media/a99b82_698231fe67a94c749963d74aa5e8e737.jpg/v1/fill/w_135,h_129,al_c,q_80,usm_0.66_1.00_0.01/a99b82_698231fe67a94c749963d74aa5e8e737.webp',	NULL),
(28,	15,	'it',	'     Ilaria Conversano',	'<p>Lorem ipsum <strong>     Ilaria Conversano</strong> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',	'https://www.ilariaconversano.com/personal-shopper-1',	'https://static.wixstatic.com/media/a99b82_698231fe67a94c749963d74aa5e8e737.jpg/v1/fill/w_135,h_129,al_c,q_80,usm_0.66_1.00_0.01/a99b82_698231fe67a94c749963d74aa5e8e737.webp',	NULL),
(31,	17,	'en',	'     Chateau Monfort',	'<p>Lorem ipsum <strong>     Chateau Monfort</strong> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',	'http://www.hotelchateaumonfort.com/en/index.html',	'http://www.hotelchateaumonfort.com/images/logo1.png',	NULL),
(32,	17,	'it',	'     Chateau Monfort',	'<p>Lorem ipsum <strong>     Chateau Monfort</strong> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',	'http://www.hotelchateaumonfort.com/spa-benessere-hotel-milano.html',	'http://www.hotelchateaumonfort.com/images/logo1.png',	NULL),
(33,	18,	'en',	'     Hammam Della Rosa',	'<p>Lorem ipsum <strong>     Hammam Della Rosa</strong> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',	'https://www.hammamdellarosa.com/',	'/img/services/hammam.png',	NULL),
(34,	18,	'it',	'     Hammam Della Rosa',	'<p>Lorem ipsum <strong>     Hammam Della Rosa</strong> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',	'https://www.hammamdellarosa.com/',	'/img/services/hammam.png',	NULL),
(35,	19,	'en',	'     Palazzo Parigi',	'<p>Lorem ipsum <strong>     Palazzo Parigi</strong> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',	'http://www.palazzoparigi.com/en/palazzo-parigi-wellness-and-spa-in-milan.html',	'http://www.palazzoparigi.com/templates/main/images/Virtuoso-logo.png?5ba88d45e1f85',	NULL),
(36,	19,	'it',	'     Palazzo Parigi',	'<p>Lorem ipsum <strong>     Palazzo Parigi</strong> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',	'http://www.palazzoparigi.com/it/benessere-spa-milano.html',	'http://www.palazzoparigi.com/templates/main/images/Virtuoso-logo.png?5ba88d45e1f85',	NULL),
(64,	33,	'en',	'Airport shuttle',	'<p>Lorem ipsum <strong>Airport shuttle</strong> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',	'',	'/img/services/navetta.jpg',	NULL),
(65,	33,	'it',	'Navetta aeroporto',	'<p>Lorem ipsum <strong>Navetta aeroporto</strong> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',	'',	'/img/services/navetta.jpg',	NULL),
(66,	34,	'en',	'MamaClean',	'<p>Lorem ipsum <strong>MamaClean</strong> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',	'http://www.mamaclean.it',	'/img/services/mamaclean2.png',	NULL),
(67,	34,	'it',	'MamaClean',	'<p>Lorem ipsum <strong>MamaClean</strong> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',	'http://www.mamaclean.it',	'/img/services/mamaclean2.png',	NULL),
(68,	35,	'en',	'Car Rental',	'<p>Lorem ipsum <strong>Car Rental</strong> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',	'',	'/img/services/auto.jpg',	NULL),
(69,	35,	'it',	'Noleggio Auto',	'<p>Lorem ipsum <strong>Noleggio Auto</strong> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',	'',	'/img/services/auto.jpg',	NULL),
(70,	36,	'en',	'Laundry Service',	'<p>Lorem ipsum <strong>Laundry Service</strong> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',	'',	'/img/services/laundry.jpg',	'/img/services/laundry.jpg'),
(71,	36,	'it',	'Servizio Lavanderia',	'<p>Lorem ipsum <strong>Servizio Lavanderia</strong> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',	'',	'/img/services/laundry.jpg',	'/img/services/laundry.jpg');

CREATE TABLE `strutture` (
  `idStruttura` int(11) NOT NULL AUTO_INCREMENT,
  `cdStruttura` varchar(45) NOT NULL,
  `dsStruttura` varchar(100) NOT NULL,
  PRIMARY KEY (`idStruttura`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='		';

INSERT INTO `strutture` (`idStruttura`, `cdStruttura`, `dsStruttura`) VALUES
(1,	'esth',	'ESTH');

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `auth_key` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password_reset_token` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` smallint(6) NOT NULL DEFAULT '10',
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL,
  `access_token` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `language` varchar(10) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'en',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `password_reset_token` (`password_reset_token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `user` (`id`, `username`, `auth_key`, `password_hash`, `password_reset_token`, `email`, `status`, `created_at`, `updated_at`, `access_token`, `language`) VALUES
(1,	'admin',	'B2ScZytXIewQaVly9DzJtGkoAgMXUJPr',	'*ADA837FCDF0A4CC1C15D02F3087132ADC55B235B',	NULL,	'francesco.fiore@phproject.it',	10,	1535049916,	1537370198,	'aBp1Uqc9kGrw7gjV4mfClaVWTZcoVhIs',	'en'),
(2,	'test',	'G3osKy8i6D5f9jJqcjLtfMH3p78V3VaH',	'$2y$13$Widr6lsrOv/3vOFUS4VTE.AhFdl3XglAuGp/EZsD4k.NLOYPP1rzK',	NULL,	'test@test.it',	10,	1535446522,	1548408859,	'T3OGdmsKN5MzkhabqWDaGNKytnys4giQ',	'en'),
(4,	'Moretti',	'q6f2Kz40Mqfr413m0Ilaym4mNdR8QGnn',	'$2y$13$P0hnHxsX8pgL2yzZPSoHXONi0iN0y32Z5H.vcwbQVTHWphfSQ.fGW',	NULL,	'm.moretti@palmosoft.com',	10,	1537806353,	1539332420,	'dy9ic8-mmFVBXyJc0E4RbfIp2GfK67mo',	'it'),
(5,	'fabio',	'ABRqRPFmZGGXTy7JODr8B5IFDhuDPKgN',	'$2y$13$dvy0mGYKpWRlTxjTBm79tuTV2OliBxKu/chyw5zY1DSSh0rq9/WXG',	NULL,	'f.ceccatelli@palmosoft.com',	10,	1537806494,	1543587026,	'wXT5u54-MHYHuU2f9EggHiXnh4XQ-wFC',	'en'),
(6,	'phiurs',	'RD9dRS1kkroqoAwzW1fHnDMMRRy8FmxJ',	'$2y$13$sU.2am16kpLNJ2XFi4OhR.xdRCNX0GyniTio6OGwyZooJpBegfepO',	NULL,	'francesco.fiore@gmail.com',	10,	1537819986,	1548706931,	'3lYrXlnRGo8RU-5Lawn6ByLxWIdocW21',	'en'),
(8,	'biffi',	'lm124mbzFg_SXPVB6vfYi489w-1kgpA6',	'$2y$13$3xTg/TjfofGWnuWkSkVNz.DI6WZWPgwzy59NITuCUvUvFzB5cJ.zW',	NULL,	'maurizio.biffi@sinergidea.it',	10,	1538035866,	1548403237,	'zfo4biWDPXEZSHcJYyHORObdv3AI2A-I',	'en'),
(9,	'saqlan',	'hm_qWTNrWtMerPQy13MX4bAe9VLMVxFA',	'$2y$13$2xdlIS4E5LDmti7apQG22uEPQslgYPmSWJsAwaj6XQ7HQidO5nwPC',	NULL,	'saqygee@gmail.com',	10,	1547821293,	1547936015,	'YVb0vAyluMcCSr6gpbRoRRbOFZuCfVyN',	'en');

-- 2019-01-28 20:27:14